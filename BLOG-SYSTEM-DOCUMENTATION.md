# Blog System Documentation

## Overview
A comprehensive, SEO-optimized blog system with admin approval workflow, built for maximum search engine visibility and content management.

## Features

### SEO Optimization
- **Meta Tags**: Title, description, keywords
- **Open Graph Tags**: For social media sharing (Facebook, LinkedIn)
- **Twitter Card Tags**: Optimized Twitter sharing
- **Structured Data**: JSON-LD schema markup support
- **Canonical URLs**: Prevent duplicate content issues
- **Focus Keywords**: Primary keyword tracking
- **SEO Score**: Automatic calculation (0-100)
- **Image Alt Text**: For featured and OG images
- **Reading Time**: Auto-calculated based on word count
- **Word Count**: Automatic tracking

### Content Management
- **Status Workflow**: Draft → Pending Review → Published/Rejected
- **Admin Approval**: All non-admin blogs require approval
- **Role-Based Access**: Different permissions for admin, authors
- **CRUD Operations**: Full create, read, update, delete support
- **Categories & Tags**: Organize content
- **Related Posts**: Link related articles
- **View Tracking**: Automatic view counter
- **Last Updated**: Track content freshness

## Blog Schema Fields

### Basic Content
- `title` (required): Blog title (max 200 chars)
- `content` (required): Full blog content
- `excerpt`: Short summary (max 500 chars)
- `slug` (required, unique): URL-friendly identifier
- `author` (required): Reference to User model

### SEO Fields
- `metaTitle`: SEO title (optimal: 30-60 chars)
- `metaDescription`: SEO description (optimal: 120-160 chars)
- `metaKeywords`: Array of keywords
- `focusKeyword`: Primary keyword for SEO
- `canonicalUrl`: Canonical URL for duplicate content prevention
- `seoScore`: Auto-calculated SEO score (0-100)

### Open Graph (Social Media)
- `ogTitle`: OG title (optimal: max 95 chars)
- `ogDescription`: OG description (optimal: max 200 chars)
- `ogImage`: OG image URL
- `ogImageAlt`: Alt text for OG image
- `ogType`: Type (article, website, blog)

### Twitter Cards
- `twitterCard`: Card type (summary, summary_large_image, app, player)
- `twitterTitle`: Twitter title (optimal: max 70 chars)
- `twitterDescription`: Twitter description (optimal: max 200 chars)
- `twitterImage`: Twitter image URL

### Images
- `featuredImage`: Main blog image URL (Google Drive link supported)
- `featuredImageAlt`: Alt text for featured image

### Organization
- `category`: Blog category
- `tags`: Array of tags
- `relatedPosts`: Array of related blog IDs

### Status & Publishing
- `status`: Enum (draft, pending_review, published, rejected)
- `published`: Boolean flag
- `publishedAt`: Publication timestamp
- `lastUpdatedAt`: Last update timestamp

### Analytics
- `views`: View count
- `likes`: Like count
- `shares`: Share count
- `readingTime`: Reading time in minutes
- `wordCount`: Total word count

### Admin Fields
- `adminNotes`: Internal admin notes
- `rejectionReason`: Reason for rejection (if rejected)
- `schemaType`: Schema.org type (Article, BlogPosting, NewsArticle, TechArticle)
- `structuredData`: Custom JSON-LD structured data

## API Endpoints

### Public Endpoints (No Auth Required)

#### GET `/api/blogs/public`
Get published blogs (public access)

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `tag`: Filter by tag
- `category`: Filter by category
- `slug`: Get single blog by slug

**Response:**
```json
{
  "success": true,
  "blogs": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### Authenticated Endpoints (Login Required)

#### GET `/api/blogs`
Get blogs (role-based filtering)

**Query Parameters:**
- `status`: Filter by status (admin only)
- `published`: Filter by published status
- `page`: Page number
- `limit`: Items per page
- `author`: Filter by author ID
- `tag`: Filter by tag
- `category`: Filter by category

**Permissions:**
- **Admin**: Can see all blogs, filter by status
- **Authors**: Can see published blogs + their own blogs

#### POST `/api/blogs`
Create a new blog

**Request Body:**
```json
{
  "title": "Blog Title",
  "content": "Full blog content...",
  "excerpt": "Short excerpt",
  "slug": "blog-slug",
  "featuredImage": "https://drive.google.com/...",
  "featuredImageAlt": "Image description",
  "metaTitle": "SEO Title",
  "metaDescription": "SEO Description",
  "metaKeywords": ["keyword1", "keyword2"],
  "focusKeyword": "primary keyword",
  "category": "Technology",
  "tags": ["tag1", "tag2"],
  "status": "draft" // or "pending_review"
}
```

**Behavior:**
- **Admin**: Can directly publish (status: "published")
- **Authors**: Can create drafts or submit for review (status: "pending_review")
- Authors cannot directly publish

#### GET `/api/blogs/[id]`
Get single blog by ID

**Permissions:**
- Published blogs: Public to authenticated users
- Unpublished blogs: Only visible to author or admin

#### PUT/PATCH `/api/blogs/[id]`
Update blog

**Permissions:**
- **Admin**: Can update any blog, change status, publish/unpublish
- **Authors**: Can update their own blogs, submit for review

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "status": "pending_review", // Authors can submit for review
  // ... other fields
}
```

#### DELETE `/api/blogs/[id]`
Delete blog

**Permissions:**
- **Admin**: Can delete any blog
- **Authors**: Can only delete their own blogs

### Admin-Only Endpoints

#### POST `/api/blogs/[id]/approve`
Approve or reject a blog (Admin only)

**Request Body:**
```json
{
  "action": "approve", // or "reject"
  "rejectionReason": "Reason for rejection (if rejecting)",
  "adminNotes": "Internal notes"
}
```

**Response:**
```json
{
  "success": true,
  "blog": {...},
  "message": "Blog approved and published successfully."
}
```

## Status Workflow

1. **DRAFT**: Initial state when blog is created
   - Visible only to author and admin
   - Can be edited freely

2. **PENDING_REVIEW**: Submitted for admin approval
   - Author submits blog for review
   - Visible to author and admin
   - Admin can approve or reject

3. **PUBLISHED**: Approved and live
   - Visible to public (via public API)
   - Can be viewed by anyone
   - Views are tracked

4. **REJECTED**: Rejected by admin
   - Visible only to author and admin
   - Includes rejection reason
   - Can be resubmitted after edits

## Permissions Matrix

| Action | Admin | Author (Own) | Author (Others) |
|--------|-------|--------------|-----------------|
| Create Blog | ✅ | ✅ | ❌ |
| View Published | ✅ | ✅ | ✅ |
| View Own Drafts | ✅ | ✅ | ❌ |
| View Others' Drafts | ✅ | ❌ | ❌ |
| Edit Own Blog | ✅ | ✅ | ❌ |
| Edit Others' Blog | ✅ | ❌ | ❌ |
| Delete Own Blog | ✅ | ✅ | ❌ |
| Delete Others' Blog | ✅ | ❌ | ❌ |
| Publish Directly | ✅ | ❌ | ❌ |
| Submit for Review | ✅ | ✅ | ❌ |
| Approve/Reject | ✅ | ❌ | ❌ |

## SEO Best Practices

### Auto-Generated Fields
The system automatically generates:
- `metaTitle` from `title` (if not provided)
- `metaDescription` from `excerpt` (if not provided)
- `ogTitle` from `title` (if not provided)
- `ogDescription` from `excerpt` (if not provided)
- `ogImage` from `featuredImage` (if not provided)
- `twitterTitle` from `title` (if not provided)
- `twitterDescription` from `excerpt` (if not provided)
- `twitterImage` from `featuredImage` (if not provided)
- `readingTime` from `content` word count
- `wordCount` from `content`
- `seoScore` based on completeness

### SEO Score Calculation
The SEO score (0-100) is calculated based on:
- Title length (30-60 chars): 20 points
- Meta description length (120-160 chars): 20 points
- Focus keyword present: 10 points
- Featured image present: 10 points
- Featured image alt text: 5 points
- Excerpt present: 10 points
- Tags (3+ tags): 10 points
- Category present: 5 points
- Word count (300+ words): 10 points

### Recommended Practices
1. **Title**: 30-60 characters, include focus keyword
2. **Meta Description**: 120-160 characters, compelling and keyword-rich
3. **Content**: Minimum 300 words for better SEO
4. **Images**: Always include alt text
5. **Tags**: Use 3-5 relevant tags
6. **Category**: Assign appropriate category
7. **Slug**: Use descriptive, keyword-rich slugs
8. **Canonical URL**: Set if content is republished

## Usage Examples

### Creating a Blog (Author)
```javascript
const response = await fetch('/api/blogs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My Blog Post',
    content: 'Full content here...',
    excerpt: 'Short description',
    featuredImage: 'https://drive.google.com/file/d/...',
    featuredImageAlt: 'Description of image',
    metaTitle: 'SEO Optimized Title',
    metaDescription: 'SEO description for search engines',
    focusKeyword: 'blog seo',
    category: 'Technology',
    tags: ['seo', 'blogging', 'web'],
    status: 'pending_review' // Submit for admin approval
  })
});
```

### Approving a Blog (Admin)
```javascript
const response = await fetch(`/api/blogs/${blogId}/approve`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    action: 'approve',
    adminNotes: 'Looks good!'
  })
});
```

### Getting Published Blogs (Public)
```javascript
const response = await fetch('/api/blogs/public?page=1&limit=10');
const data = await response.json();
```

## Database Indexes

The following indexes are created for optimal performance:
- `slug`: Unique index for fast lookups
- `author`: For filtering by author
- `status`: For status-based queries
- `published`: For published/unpublished filtering
- `publishedAt`: For sorting by publication date
- `tags`: For tag-based filtering
- `category`: For category filtering
- `createdAt`: For chronological sorting
- `views`: For popular content queries
- `status + createdAt`: For admin dashboard queries

## Notes

- All image URLs can be Google Drive links (or any URL)
- The system automatically handles slug generation from title
- SEO fields are auto-populated if not provided
- Reading time is calculated at 200 words per minute
- Views are only incremented for published blogs
- The system prevents authors from directly publishing

