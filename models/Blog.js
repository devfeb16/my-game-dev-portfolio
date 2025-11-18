import mongoose, { Schema } from 'mongoose';
import { BlogStatus } from '@/lib/constants';

// Re-export for backward compatibility
export { BlogStatus };

const BlogSchema = new Schema(
  {
    // Basic Content Fields
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    // URL & Slug
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    canonicalUrl: {
      type: String,
      trim: true,
    },
    
    // Status & Publishing
    status: {
      type: String,
      enum: Object.values(BlogStatus),
      default: BlogStatus.DRAFT,
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    lastUpdatedAt: {
      type: Date,
      default: Date.now,
    },
    
    // Images
    featuredImage: {
      type: String,
      trim: true,
    },
    featuredImageAlt: {
      type: String,
      trim: true,
      maxlength: [125, 'Alt text cannot exceed 125 characters'],
    },
    ogImage: {
      type: String,
      trim: true,
    },
    ogImageAlt: {
      type: String,
      trim: true,
      maxlength: [125, 'Alt text cannot exceed 125 characters'],
    },
    
    // SEO Meta Tags
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'Meta title should not exceed 60 characters for optimal SEO'],
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description should not exceed 160 characters for optimal SEO'],
    },
    metaKeywords: {
      type: [String],
      default: [],
    },
    focusKeyword: {
      type: String,
      trim: true,
      lowercase: true,
    },
    
    // Open Graph Tags
    ogTitle: {
      type: String,
      trim: true,
      maxlength: [95, 'OG title should not exceed 95 characters'],
    },
    ogDescription: {
      type: String,
      trim: true,
      maxlength: [200, 'OG description should not exceed 200 characters'],
    },
    ogType: {
      type: String,
      default: 'article',
      enum: ['article', 'website', 'blog'],
    },
    
    // Twitter Card Tags
    twitterCard: {
      type: String,
      default: 'summary_large_image',
      enum: ['summary', 'summary_large_image', 'app', 'player'],
    },
    twitterTitle: {
      type: String,
      trim: true,
      maxlength: [70, 'Twitter title should not exceed 70 characters'],
    },
    twitterDescription: {
      type: String,
      trim: true,
      maxlength: [200, 'Twitter description should not exceed 200 characters'],
    },
    twitterImage: {
      type: String,
      trim: true,
    },
    
    // Categories & Tags
    category: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    
    // Content Analysis
    readingTime: {
      type: Number, // in minutes
      default: 0,
    },
    wordCount: {
      type: Number,
      default: 0,
    },
    
    // Engagement Metrics
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    
    // Related Content
    relatedPosts: [{
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    }],
    
    // Structured Data (JSON-LD)
    structuredData: {
      type: Schema.Types.Mixed,
      default: {},
    },
    
    // SEO Score (0-100)
    seoScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    
    // Admin Notes
    adminNotes: {
      type: String,
      trim: true,
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    
    // Schema Markup
    schemaType: {
      type: String,
      default: 'Article',
      enum: ['Article', 'BlogPosting', 'NewsArticle', 'TechArticle'],
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from title before saving
BlogSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = String(this.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Auto-generate meta title if not provided
  if (!this.metaTitle && this.title) {
    this.metaTitle = this.title.substring(0, 60);
  }
  
  // Auto-generate meta description from excerpt if not provided
  if (!this.metaDescription && this.excerpt) {
    this.metaDescription = this.excerpt.substring(0, 160);
  }
  
  // Auto-generate OG fields if not provided
  if (!this.ogTitle && this.title) {
    this.ogTitle = this.title.substring(0, 95);
  }
  if (!this.ogDescription && this.excerpt) {
    this.ogDescription = this.excerpt.substring(0, 200);
  }
  if (!this.ogImage && this.featuredImage) {
    this.ogImage = this.featuredImage;
  }
  
  // Auto-generate Twitter fields if not provided
  if (!this.twitterTitle && this.title) {
    this.twitterTitle = this.title.substring(0, 70);
  }
  if (!this.twitterDescription && this.excerpt) {
    this.twitterDescription = this.excerpt.substring(0, 200);
  }
  if (!this.twitterImage && this.featuredImage) {
    this.twitterImage = this.featuredImage;
  }
  
  // Calculate reading time (average reading speed: 200 words per minute)
  if (this.isModified('content')) {
    const words = this.content.trim().split(/\s+/).length;
    this.wordCount = words;
    this.readingTime = Math.ceil(words / 200);
  }
  
  // Update status based on published field
  if (this.isModified('published')) {
    if (this.published) {
      this.status = BlogStatus.PUBLISHED;
      if (!this.publishedAt) {
        this.publishedAt = new Date();
      }
    } else if (this.status === BlogStatus.PUBLISHED) {
      // If unpublishing, set back to draft
      this.status = BlogStatus.DRAFT;
    }
  }
  
  // Update lastUpdatedAt
  if (this.isModified() && !this.isNew) {
    this.lastUpdatedAt = new Date();
  }
  
  // Calculate basic SEO score
  let score = 0;
  if (this.title && this.title.length >= 30 && this.title.length <= 60) score += 20;
  if (this.metaDescription && this.metaDescription.length >= 120 && this.metaDescription.length <= 160) score += 20;
  if (this.focusKeyword) score += 10;
  if (this.featuredImage) score += 10;
  if (this.featuredImageAlt) score += 5;
  if (this.excerpt) score += 10;
  if (this.tags && this.tags.length >= 3) score += 10;
  if (this.category) score += 5;
  if (this.wordCount >= 300) score += 10;
  this.seoScore = Math.min(score, 100);
  
  next();
});

// Indexes for faster queries and SEO
BlogSchema.index({ slug: 1 });
BlogSchema.index({ author: 1 });
BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ published: 1, publishedAt: -1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ createdAt: -1 });
BlogSchema.index({ views: -1 });
BlogSchema.index({ status: 1, createdAt: -1 }); // For admin dashboard

const Blog = mongoose.models?.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;

