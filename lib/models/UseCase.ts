import mongoose, { Schema, model, models } from 'mongoose';

export interface IUseCase {
  _id: string;
  title: string;
  slug: string;
  industry: string;
  description: string;
  content: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  tags: string[];
  published: boolean;
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UseCaseSchema = new Schema<IUseCase>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    industry: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    results: [{
      metric: { type: String },
      value: { type: String }
    }],
    tags: [{ type: String }],
    published: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  {
    timestamps: true,
  }
);

UseCaseSchema.index({ slug: 1 });
UseCaseSchema.index({ published: 1 });

export default models.UseCase || model<IUseCase>('UseCase', UseCaseSchema);
