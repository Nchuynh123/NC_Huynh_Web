import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    create: {
      id: 'default',
      bandName: 'NC Huynh',
      tagline: 'Âm nhạc từ trái tim',
      about:
        'NC Huynh là ban nhạc độc lập, mang đến những giai điệu đầy cảm xúc. Chúng tôi kết hợp rock, indie và acoustic để tạo nên âm thanh riêng biệt.',
      socialLinks: {
        spotify: 'https://open.spotify.com',
        youtube: 'https://youtube.com',
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com',
      },
    },
    update: {},
  });

  const memberCount = await prisma.member.count();
  if (memberCount === 0) {
    await prisma.member.createMany({
      data: [
        {
          name: 'Nguyễn Văn A',
          role: 'Vocal / Guitar',
          bio: 'Frontman và nhạc sĩ chính của band.',
          sortOrder: 0,
        },
        {
          name: 'Trần Thị B',
          role: 'Bass',
          bio: 'Nền tảng groove vững chắc cho mọi bản nhạc.',
          sortOrder: 1,
        },
        {
          name: 'Lê Văn C',
          role: 'Drums',
          bio: 'Nhịp trống mạnh mẽ, đầy năng lượng.',
          sortOrder: 2,
        },
      ],
    });
  }

  const albumCount = await prisma.album.count();
  if (albumCount === 0) {
    const album = await prisma.album.create({
      data: {
        title: 'Khởi Đầu',
        slug: 'khoi-dau',
        type: 'EP',
        releaseDate: new Date('2024-06-01'),
        description: 'EP đầu tay ghi dấu hành trình âm nhạc của band.',
        isPublished: true,
        sortOrder: 0,
        spotifyUrl: 'https://open.spotify.com',
        tracks: {
          create: [
            { title: 'Bình Minh', trackNo: 1, duration: '4:12' },
            { title: 'Đêm Khuya', trackNo: 2, duration: '3:45' },
            { title: 'Về Nhà', trackNo: 3, duration: '5:01' },
          ],
        },
      },
    });
    await prisma.album.create({
      data: {
        title: 'Tia Sáng',
        slug: 'tia-sang',
        type: 'SINGLE',
        releaseDate: new Date('2025-01-15'),
        description: 'Single mới nhất.',
        isPublished: true,
        sortOrder: 1,
        tracks: {
          create: [{ title: 'Tia Sáng', trackNo: 1, duration: '3:30' }],
        },
      },
    });
    console.log('Created albums including:', album.title);
  }

  const eventCount = await prisma.event.count();
  if (eventCount === 0) {
    const future = new Date();
    future.setMonth(future.getMonth() + 2);
    await prisma.event.createMany({
      data: [
        {
          title: 'Live Night — TP.HCM',
          venue: 'Cafe Acoustic',
          city: 'TP. Hồ Chí Minh',
          eventDate: future,
          ticketUrl: 'https://example.com/tickets',
          isPublished: true,
        },
        {
          title: 'Summer Fest',
          venue: 'Công viên Âm nhạc',
          city: 'Hà Nội',
          eventDate: new Date('2024-08-20'),
          isPast: true,
          isPublished: true,
        },
      ],
    });
  }

  const galleryCount = await prisma.galleryItem.count();
  if (galleryCount === 0) {
    await prisma.galleryItem.createMany({
      data: [
        {
          type: 'IMAGE',
          url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
          caption: 'Live performance',
          sortOrder: 0,
        },
        {
          type: 'IMAGE',
          url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
          caption: 'Studio session',
          sortOrder: 1,
        },
        {
          type: 'VIDEO',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
          caption: 'Music video',
          sortOrder: 2,
        },
      ],
    });
  }

  console.log('Seed completed.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
