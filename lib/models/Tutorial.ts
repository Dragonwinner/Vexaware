import mongoose, { Schema, model, models } from 'mongoose';

export interface ITutorial {
  _id: string;
  title: string;
  slug: string;
  category: string;
  subcategory?: string;
  description: string;
  content: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  readingTime?: number;
  author?: string;
  tags: string[];
  keywords: string[];
  published: boolean;
  featured: boolean;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TutorialSchema = new Schema<ITutorial>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    description: { type: String, required: true },
    content: { type: String, required: true },
    difficulty: { 
      type: String, 
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner'
    },
    duration: { type: String, required: true },
    readingTime: { type: Number },
    author: { type: String, default: 'VEX Aware Team' },
    tags: [{ type: String }],
    keywords: [{ type: String }],
    published: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create indexes
TutorialSchema.index({ slug: 1 });
TutorialSchema.index({ category: 1, order: 1 });
TutorialSchema.index({ published: 1 });

export default models.Tutorial || model<ITutorial>('Tutorial', TutorialSchema);
