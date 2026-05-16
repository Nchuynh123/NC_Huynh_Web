import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const url = process.env.DATABASE_URL ?? '';
const host = url.match(/@([^/?:]+)/)?.[1] ?? '(missing)';
console.log('DATABASE_URL host:', host);

const prisma = new PrismaClient();
try {
  const count = await prisma.member.count();
  console.log('OK — connected. Member count:', count);
} catch (e) {
  console.error('FAIL —', e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
