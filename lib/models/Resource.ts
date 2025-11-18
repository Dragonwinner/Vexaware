import mongoose, { Schema, model, models } from 'mongoose';

export interface IResource {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  resourceType: string;
  downloadUrl?: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    resourceType: { type: String, required: true },
    downloadUrl: { type: String },
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

ResourceSchema.index({ slug: 1 });
ResourceSchema.index({ category: 1 });
ResourceSchema.index({ published: 1 });

export default models.Resource || model<IResource>('Resource', ResourceSchema);
