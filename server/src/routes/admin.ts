import { Router } from 'express';
import multer from 'multer';
import {
  siteSettingsSchema,
  memberSchema,
  albumSchema,
  eventSchema,
  galleryItemSchema,
  loginSchema,
  slugify,
} from '@band/shared';
import { prisma } from '../lib/prisma';
import { serializeSettings, stringifySocialLinks } from '../lib/serialize';
import { loginWithPassword } from '../lib/auth';
import { uploadFile } from '../lib/storage';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // Tăng lên 20MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Chỉ chấp nhận file ảnh JPEG, PNG, WebP, GIF'));
  },
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const result = await loginWithPassword(email, password);
    if ('error' in result) {
      res.status(401).json({ error: result.error });
      return;
    }
    res.json({ token: result.token });
  } catch (e) {
    next(e);
  }
});

router.use(authMiddleware);

router.get('/stats', async (_req, res, next) => {
  try {
    const [albums, members, events, contacts, unread] = await Promise.all([
      prisma.album.count(),
      prisma.member.count({ where: { isActive: true } }),
      prisma.event.count({ where: { isPublished: true, isPast: false } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
    ]);
    res.json({ albums, members, events, contacts, unread });
  } catch (e) {
    next(e);
  }
});

router.put('/settings', async (req, res, next) => {
  try {
    const data = siteSettingsSchema.parse(req.body);
    const settings = await prisma.siteSettings.upsert({
      where: { id: 'default' },
      create: {
        id: 'default',
        ...data,
        socialLinks: stringifySocialLinks(data.socialLinks ?? null),
      },
      update: {
        ...data,
        socialLinks: stringifySocialLinks(data.socialLinks ?? null),
      },
    });
    res.json(serializeSettings(settings));
  } catch (e) {
    next(e);
  }
});

// Members CRUD
router.get('/members', async (_req, res, next) => {
  try {
    const members = await prisma.member.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json(members.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() })));
  } catch (e) {
    next(e);
  }
});

router.post('/members', async (req, res, next) => {
  try {
    const data = memberSchema.parse(req.body);
    const member = await prisma.member.create({ data });
    res.status(201).json({ ...member, createdAt: member.createdAt.toISOString() });
  } catch (e) {
    next(e);
  }
});

router.put('/members/:id', async (req, res, next) => {
  try {
    const data = memberSchema.parse(req.body);
    const member = await prisma.member.update({ where: { id: req.params.id }, data });
    res.json({ ...member, createdAt: member.createdAt.toISOString() });
  } catch (e) {
    next(e);
  }
});

router.delete('/members/:id', async (req, res, next) => {
  try {
    await prisma.member.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

// Albums CRUD
router.get('/albums', async (_req, res, next) => {
  try {
    const albums = await prisma.album.findMany({
      orderBy: [{ sortOrder: 'asc' }, { releaseDate: 'desc' }],
      include: { tracks: { orderBy: { trackNo: 'asc' } } },
    });
    res.json(
      albums.map((a) => ({
        ...a,
        releaseDate: a.releaseDate?.toISOString() ?? null,
      }))
    );
  } catch (e) {
    next(e);
  }
});

router.post('/albums', async (req, res, next) => {
  try {
    const body = albumSchema.parse(req.body);
    const { tracks, ...albumData } = body;
    const slug = body.slug || slugify(body.title);

    const album = await prisma.album.create({
      data: {
        ...albumData,
        slug,
        releaseDate: albumData.releaseDate ? new Date(albumData.releaseDate) : null,
        tracks: tracks?.length
          ? {
              create: tracks.map((t) => ({
                title: t.title,
                duration: t.duration ?? null,
                trackNo: t.trackNo,
                audioUrl: t.audioUrl ?? null,
              })),
            }
          : undefined,
      },
      include: { tracks: { orderBy: { trackNo: 'asc' } } },
    });
    res.status(201).json({
      ...album,
      releaseDate: album.releaseDate?.toISOString() ?? null,
    });
  } catch (e) {
    next(e);
  }
});

router.put('/albums/:id', async (req, res, next) => {
  try {
    const body = albumSchema.parse(req.body);
    const { tracks, ...albumData } = body;
    const slug = body.slug || slugify(body.title);

    await prisma.track.deleteMany({ where: { albumId: req.params.id } });

    const album = await prisma.album.update({
      where: { id: req.params.id },
      data: {
        ...albumData,
        slug,
        releaseDate: albumData.releaseDate ? new Date(albumData.releaseDate) : null,
        tracks: tracks?.length
          ? {
              create: tracks.map((t) => ({
                title: t.title,
                duration: t.duration ?? null,
                trackNo: t.trackNo,
                audioUrl: t.audioUrl ?? null,
              })),
            }
          : undefined,
      },
      include: { tracks: { orderBy: { trackNo: 'asc' } } },
    });
    res.json({
      ...album,
      releaseDate: album.releaseDate?.toISOString() ?? null,
    });
  } catch (e) {
    next(e);
  }
});

router.delete('/albums/:id', async (req, res, next) => {
  try {
    await prisma.album.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

// Events CRUD
router.get('/events', async (_req, res, next) => {
  try {
    const events = await prisma.event.findMany({ orderBy: { eventDate: 'asc' } });
    res.json(events.map((e) => ({ ...e, eventDate: e.eventDate.toISOString() })));
  } catch (e) {
    next(e);
  }
});

router.post('/events', async (req, res, next) => {
  try {
    const data = eventSchema.parse(req.body);
    const event = await prisma.event.create({
      data: { ...data, eventDate: new Date(data.eventDate) },
    });
    res.status(201).json({ ...event, eventDate: event.eventDate.toISOString() });
  } catch (e) {
    next(e);
  }
});

router.put('/events/:id', async (req, res, next) => {
  try {
    const data = eventSchema.parse(req.body);
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: { ...data, eventDate: new Date(data.eventDate) },
    });
    res.json({ ...event, eventDate: event.eventDate.toISOString() });
  } catch (e) {
    next(e);
  }
});

router.delete('/events/:id', async (req, res, next) => {
  try {
    await prisma.event.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

// Gallery CRUD
router.get('/gallery', async (_req, res, next) => {
  try {
    const items = await prisma.galleryItem.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json(items);
  } catch (e) {
    next(e);
  }
});

router.post('/gallery', async (req, res, next) => {
  try {
    const data = galleryItemSchema.parse(req.body);
    const item = await prisma.galleryItem.create({ data });
    res.status(201).json(item);
  } catch (e) {
    next(e);
  }
});

router.put('/gallery/:id', async (req, res, next) => {
  try {
    const data = galleryItemSchema.parse(req.body);
    const item = await prisma.galleryItem.update({
      where: { id: req.params.id },
      data,
    });
    res.json(item);
  } catch (e) {
    next(e);
  }
});

router.delete('/gallery/:id', async (req, res, next) => {
  try {
    await prisma.galleryItem.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

// Contacts
router.get('/contacts', async (_req, res, next) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() })));
  } catch (e) {
    next(e);
  }
});

router.patch('/contacts/:id/read', async (req, res, next) => {
  try {
    const msg = await prisma.contactMessage.update({
      where: { id: req.params.id },
      data: { isRead: true },
    });
    res.json({ ...msg, createdAt: msg.createdAt.toISOString() });
  } catch (e) {
    next(e);
  }
});

// Upload
router.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Không có file' });
      return;
    }
    const url = await uploadFile(req.file);
    res.json({ url });
  } catch (e) {
    next(e);
  }
});

export default router;
