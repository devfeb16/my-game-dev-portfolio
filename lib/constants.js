// Constants that can be safely imported in client components
// These don't import Mongoose or any server-only dependencies

export const BlogStatus = {
  DRAFT: 'draft',
  PENDING_REVIEW: 'pending_review',
  PUBLISHED: 'published',
  REJECTED: 'rejected',
};

export const UserRole = {
  ADMIN: 'admin',
  MARKETING: 'marketing',
  BLOGGER: 'blogger',
  USER: 'user',
};

