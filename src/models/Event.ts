import { model, Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';
import { EVENT_STATUS } from '../utils/constants.js';

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: Object.values(EVENT_STATUS),
      default: EVENT_STATUS.ACTIVE,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type EventSchema = InferSchemaType<typeof eventSchema>;
export type EventDocument = HydratedDocument<EventSchema>;

eventSchema.index({ status: 1, startDate: -1 });

export const Event = model('Event', eventSchema);
