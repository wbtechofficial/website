import bcrypt from 'bcryptjs';
import { connectDatabase, disconnectDatabase } from '../config/db.js';
import { env } from '../config/env.js';
import { Event } from '../models/Event.js';
import { User } from '../models/User.js';
import { USER_ROLE } from '../utils/constants.js';

async function seedAdmin(): Promise<void> {
  const email = env.SEED_ADMIN_EMAIL;
  const password = env.SEED_ADMIN_PASSWORD;
  if (!email || !password) {
    console.log('[seed] SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set, skipping admin');
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`[seed] Admin ${email} already exists`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({
    name: env.SEED_ADMIN_NAME ?? 'Admin',
    email,
    passwordHash,
    role: USER_ROLE.ADMIN,
  });
  console.log(`[seed] Created admin ${email}`);
}

async function seedDemoEvent(): Promise<void> {
  const existing = await Event.findOne({ slug: 'hacktoberfest-demo' });
  if (existing) {
    console.log('[seed] Demo event already exists');
    return;
  }

  await Event.create({
    name: 'Hacktoberfest Demo',
    slug: 'hacktoberfest-demo',
    description: 'A demo event for project submissions',
    status: 'active',
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  console.log('[seed] Created demo event');
}

async function main(): Promise<void> {
  await connectDatabase();
  await seedAdmin();
  await seedDemoEvent();
  await disconnectDatabase();
}

main().catch((error) => {
  console.error('[seed] Failed', error);
  process.exit(1);
});
