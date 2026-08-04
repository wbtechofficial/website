import { model, Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';

const upvoteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type UpvoteSchema = InferSchemaType<typeof upvoteSchema>;
export type UpvoteDocument = HydratedDocument<UpvoteSchema>;

upvoteSchema.index({ user: 1, project: 1 }, { unique: true });
upvoteSchema.index({ project: 1, createdAt: 1 });

export const Upvote = model('Upvote', upvoteSchema);
