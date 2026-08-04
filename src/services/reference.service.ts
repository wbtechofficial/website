import { createHmac, randomBytes } from 'node:crypto';
import { env } from '../config/env.js';

const REFERENCE_LENGTH = 12;

export function createTrackingReference(eventId: string | null, speakerEmail: string, title: string): string {
  const payload = [eventId ?? '', speakerEmail.toLowerCase().trim(), title.toLowerCase().trim()].join('|');
  return createHmac('sha256', env.REFERENCE_SECRET)
    .update(payload)
    .digest('hex')
    .slice(0, REFERENCE_LENGTH)
    .toUpperCase();
}

export function createRandomReference(): string {
  return randomBytes(REFERENCE_LENGTH / 2).toString('hex').toUpperCase();
}
