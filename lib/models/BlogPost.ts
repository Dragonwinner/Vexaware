import mongoose, { Schema, model, models } from 'mongoose';

export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  tags: string[];
  keywords: string[];
  published: boolean;
  featured: boolean;
  readingTime: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: 'VEX Aware Team' },
    tags: [{ type: String }],
    keywords: [{ type: String }],
    published: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    readingTime: { type: Number },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  {
    timestamps: true,
  }
);

BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ published: 1 });

export default models.BlogPost || model<IBlogPost>('BlogPost', BlogPostSchema);
