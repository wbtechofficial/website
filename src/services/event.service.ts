import type { Types } from 'mongoose';
import { Event } from '../models/Event.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS, type EventStatus } from '../utils/constants.js';

interface ListEventsOptions {
  page: number;
  limit: number;
  status?: EventStatus;
}

export interface PublicEvent {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status: EventStatus;
  startDate?: Date;
  endDate?: Date;
}

interface EventFields {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description?: string | null;
  status: EventStatus;
  startDate?: Date | null;
  endDate?: Date | null;
}

function toPublicEvent(event: EventFields): PublicEvent {
  return {
    id: event._id.toString(),
    name: event.name,
    slug: event.slug,
    description: event.description ?? undefined,
    status: event.status,
    startDate: event.startDate ?? undefined,
    endDate: event.endDate ?? undefined,
  };
}

export async function getActiveEvents(): Promise<PublicEvent[]> {
  const events = await Event.find({ status: 'active' }).sort({ startDate: 1 }).lean();
  return events.map((event) => ({
    id: event._id.toString(),
    name: event.name,
    slug: event.slug,
    description: event.description ?? undefined,
    status: event.status,
    startDate: event.startDate ?? undefined,
    endDate: event.endDate ?? undefined,
  }));
}

export async function getEventOrThrow(eventId: string, requireActive = false): Promise<EventFields> {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Event not found');
  }
  if (requireActive && event.status !== 'active') {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Event is not accepting submissions');
  }
  return event;
}

export async function createEvent(input: {
  name: string;
  slug: string;
  description?: string;
  status?: EventStatus;
  startDate?: Date;
  endDate?: Date;
}): Promise<PublicEvent> {
  const existing = await Event.findOne({ slug: input.slug });
  if (existing) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'An event with this slug already exists');
  }
  const event = await Event.create(input);
  return toPublicEvent(event);
}

export async function updateEvent(
  eventId: string,
  input: {
    name?: string;
    slug?: string;
    description?: string;
    status?: EventStatus;
    startDate?: Date;
    endDate?: Date;
  },
): Promise<PublicEvent> {
  if (input.slug) {
    const existing = await Event.findOne({ slug: input.slug, _id: { $ne: eventId } });
    if (existing) {
      throw new ApiError(HTTP_STATUS.CONFLICT, 'An event with this slug already exists');
    }
  }
  const event = await Event.findByIdAndUpdate(eventId, input, { new: true, runValidators: true });
  if (!event) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Event not found');
  }
  return toPublicEvent(event);
}

export async function listEvents(options: ListEventsOptions): Promise<{ items: PublicEvent[]; page: number; limit: number; total: number }> {
  const filter = options.status ? { status: options.status } : {};
  const [items, total] = await Promise.all([
    Event.find(filter)
      .sort({ startDate: 1 })
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .lean(),
    Event.countDocuments(filter),
  ]);

  return {
    items: items.map((event) => ({
      id: event._id.toString(),
      name: event.name,
      slug: event.slug,
      description: event.description ?? undefined,
      status: event.status,
      startDate: event.startDate ?? undefined,
      endDate: event.endDate ?? undefined,
    })),
    page: options.page,
    limit: options.limit,
    total,
  };
}
