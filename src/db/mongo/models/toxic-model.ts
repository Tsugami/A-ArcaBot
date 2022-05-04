import { model, Schema, Document } from 'mongoose';

interface ToxicSchema extends Document {
  viewerId: string;
  toxicUserId: string;
}

const toxicSchema = new Schema<ToxicSchema>(
  {
    viewerId: {
      type: String,
      required: true,
    },
    toxicUserId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const toxicModel = model<ToxicSchema>('Toxic', toxicSchema);
