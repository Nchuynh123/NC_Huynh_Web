import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { contactSchema } from '@band/shared';
import { prisma } from '../lib/prisma';
import { serializeSettings } from '../lib/serialize';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.' },
});

router.get('/settings', async (_req, res, next) => {
  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: 'default' } });
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { id: 'default', bandName: 'NC Huynh' },
      });
    }
    res.json(serializeSettings(settings));
  } catch (e) {
    next(e);
  }
});

router.get('/members', async (_req, res, next) => {
  try {
    const members = await prisma.member.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(
      members.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() }))
    );
  } catch (e) {
    next(e);
  }
});

router.get('/albums', async (_req, res, next) => {
  try {
    const albums = await prisma.album.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: 'asc' }, { releaseDate: 'desc' }],
      include: { tracks: { orderBy: { trackNo: 'asc' } } },
    });
    res.json(
      albums.map((a) => ({
        ...a,
        releaseDate: a.releaseDate?.toISOString() ?? null,
        tracks: a.tracks,
      }))
    );
  } catch (e) {
    next(e);
  }
});

router.get('/albums/:slug', async (req, res, next) => {
  try {
    const album = await prisma.album.findFirst({
      where: { slug: req.params.slug, isPublished: true },
      include: { tracks: { orderBy: { trackNo: 'asc' } } },
    });
    if (!album) {
      res.status(404).json({ error: 'Album không tìm thấy' });
      return;
    }
    res.json({
      ...album,
      releaseDate: album.releaseDate?.toISOString() ?? null,
    });
  } catch (e) {
    next(e);
  }
});

router.get('/events', async (req, res, next) => {
  try {
    const filter = req.query.filter as string | undefined;
    const now = new Date();
    const where: { isPublished: boolean; isPast?: boolean; eventDate?: object } = {
      isPublished: true,
    };

    if (filter === 'upcoming') {
      where.isPast = false;
    } else if (filter === 'past') {
      where.isPast = true;
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { eventDate: filter === 'past' ? 'desc' : 'asc' },
    });
    res.json(events.map((e) => ({ ...e, eventDate: e.eventDate.toISOString() })));
  } catch (e) {
    next(e);
  }
});

router.get('/gallery', async (_req, res, next) => {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    res.json(items);
  } catch (e) {
    next(e);
  }
});

router.post('/contact', contactLimiter, async (req, res, next) => {
  try {
    const data = contactSchema.parse(req.body);
    const msg = await prisma.contactMessage.create({ data });
    res.status(201).json({
      id: msg.id,
      message: 'Cảm ơn bạn! Tin nhắn đã được gửi.',
    });
  } catch (e) {
    next(e);
  }
});

export default router;
