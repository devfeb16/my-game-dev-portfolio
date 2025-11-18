import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, BlogStatus } from '@/lib/constants';
import {
  FiEdit3,
  FiTrash2,
  FiEye,
  FiCheck,
  FiX,
  FiPlus,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiSave,
  FiXCircle,
} from 'react-icons/fi';

export default function BlogManagement() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    featuredImage: '',
    featuredImageAlt: '',
    ogImage: '',
    ogImageAlt: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    focusKeyword: '',
    ogTitle: '',
    ogDescription: '',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    category: '',
    tags: '',
    canonicalUrl: '',
    schemaType: 'Article',
    status: BlogStatus.DRAFT,
    published: false,
  });

  const isAdmin = user?.role === UserRole.ADMIN;
  const isHR = user?.role === UserRole.MARKETING;
  const canApprove = isAdmin || isHR;
  const canSeeAll = isAdmin || isHR;

  useEffect(() => {
    fetchBlogs();
  }, [filterStatus, currentPage, searchQuery]);

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });

      if (filterStatus !== 'all') {
        params.append('status', filterStatus);
      }

      const res = await fetch(`/api/blogs?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        let filteredBlogs = data.blogs;

        // Filter by search query (client-side for better UX)
        if (searchQuery) {
          filteredBlogs = filteredBlogs.filter(
            (blog) =>
              blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              blog.content?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Additional client-side status filter for non-admin users
        // (API already filters by author, but we need to respect status filter)
        if (!canSeeAll && filterStatus !== 'all') {
          filteredBlogs = filteredBlogs.filter((blog) => {
            const isOwnBlog = blog.author?._id === user?.userId || blog.author === user?.userId;
            // Show own blogs matching the status, or published blogs
            return (isOwnBlog && blog.status === filterStatus) || (blog.status === BlogStatus.PUBLISHED && filterStatus === BlogStatus.PUBLISHED);
          });
        }

        setBlogs(filteredBlogs);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        setError(data.error || 'Failed to fetch blogs');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Auto-generate slug from title
    if (name === 'title' && !editingBlog) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
      const metaKeywords = formData.metaKeywords
        .split(',')
        .map((kw) => kw.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        tags,
        metaKeywords,
        // Non-admin users can't directly publish
        status: canApprove ? formData.status : (formData.published ? BlogStatus.PENDING_REVIEW : BlogStatus.DRAFT),
        published: canApprove ? formData.published : false,
      };

      const url = editingBlog ? `/api/blogs/${editingBlog._id}` : '/api/blogs';
      const method = editingBlog ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.message || (editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!'));
        setShowForm(false);
        setEditingBlog(null);
        resetForm();
        setTimeout(() => {
          fetchBlogs();
          setSuccess('');
        }, 1500);
      } else {
        setError(data.error || 'Failed to save blog');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      slug: blog.slug || '',
      featuredImage: blog.featuredImage || '',
      featuredImageAlt: blog.featuredImageAlt || '',
      ogImage: blog.ogImage || '',
      ogImageAlt: blog.ogImageAlt || '',
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      metaKeywords: (blog.metaKeywords || []).join(', '),
      focusKeyword: blog.focusKeyword || '',
      ogTitle: blog.ogTitle || '',
      ogDescription: blog.ogDescription || '',
      ogType: blog.ogType || 'article',
      twitterCard: blog.twitterCard || 'summary_large_image',
      twitterTitle: blog.twitterTitle || '',
      twitterDescription: blog.twitterDescription || '',
      twitterImage: blog.twitterImage || '',
      category: blog.category || '',
      tags: (blog.tags || []).join(', '),
      canonicalUrl: blog.canonicalUrl || '',
      schemaType: blog.schemaType || 'Article',
      status: blog.status || BlogStatus.DRAFT,
      published: blog.published || false,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setSuccess('Blog deleted successfully!');
        fetchBlogs();
        setTimeout(() => setSuccess(''), 2000);
      } else {
        setError(data.error || 'Failed to delete blog');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, action, rejectionReason = '', adminNotes = '') => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/blogs/approve/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, rejectionReason, adminNotes }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.message);
        fetchBlogs();
        setTimeout(() => setSuccess(''), 2000);
      } else {
        setError(data.error || 'Failed to update blog status');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      slug: '',
      featuredImage: '',
      featuredImageAlt: '',
      ogImage: '',
      ogImageAlt: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      focusKeyword: '',
      ogTitle: '',
      ogDescription: '',
      ogType: 'article',
      twitterCard: 'summary_large_image',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: '',
      category: '',
      tags: '',
      canonicalUrl: '',
      schemaType: 'Article',
      status: BlogStatus.DRAFT,
      published: false,
    });
    setEditingBlog(null);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      [BlogStatus.DRAFT]: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', label: 'Draft' },
      [BlogStatus.PENDING_REVIEW]: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Pending Review' },
      [BlogStatus.PUBLISHED]: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Published' },
      [BlogStatus.REJECTED]: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Rejected' },
    };

    const config = statusConfig[status] || statusConfig[BlogStatus.DRAFT];
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {editingBlog ? 'Edit Blog' : 'Create New Blog'}
            </h1>
            <p className="text-gray-400">Write and manage your blog post</p>
          </div>
          <button
            onClick={() => {
              setShowForm(false);
              resetForm();
            }}
            className="p-2 text-gray-400 hover:text-white transition"
          >
            <FiXCircle className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                required
                maxLength={200}
                className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-2">
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="auto-generated-from-title"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-2">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                maxLength={500}
                className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                placeholder="Brief description of your blog"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={15}
                className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none font-mono text-sm"
                placeholder="Write your blog content here..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  placeholder="e.g., Technology, Gaming"
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Images</h2>

            <div>
              <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-300 mb-2">
                Featured Image URL
              </label>
              <input
                id="featuredImage"
                name="featuredImage"
                type="url"
                value={formData.featuredImage}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label htmlFor="featuredImageAlt" className="block text-sm font-medium text-gray-300 mb-2">
                Featured Image Alt Text
              </label>
              <input
                id="featuredImageAlt"
                name="featuredImageAlt"
                type="text"
                value={formData.featuredImageAlt}
                onChange={handleInputChange}
                maxLength={125}
                className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Description of the featured image"
              />
            </div>

            <div>
              <label htmlFor="ogImage" className="block text-sm font-medium text-gray-300 mb-2">
                Open Graph Image URL
              </label>
              <input
                id="ogImage"
                name="ogImage"
                type="url"
                value={formData.ogImage}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="https://example.com/og-image.jpg"
              />
            </div>

            <div>
              <label htmlFor="ogImageAlt" className="block text-sm font-medium text-gray-300 mb-2">
                Open Graph Image Alt Text
              </label>
              <input
                id="ogImageAlt"
                name="ogImageAlt"
                type="text"
                value={formData.ogImageAlt}
                onChange={handleInputChange}
                maxLength={125}
                className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Description of the OG image"
              />
            </div>

            <div>
              <label htmlFor="twitterImage" className="block text-sm font-medium text-gray-300 mb-2">
                Twitter Image URL
              </label>
              <input
                id="twitterImage"
                name="twitterImage"
                type="url"
                value={formData.twitterImage}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="https://example.com/twitter-image.jpg"
              />
            </div>
          </div>

          {/* Advanced Options */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between p-4 bg-[#1a1b2e] border border-[#2a2b3e] rounded-lg text-white hover:bg-[#2a2b3e] transition"
          >
            <span className="font-medium">Advanced Options (SEO & Meta Tags)</span>
            <span className="text-gray-400">{showAdvanced ? 'Hide' : 'Show'}</span>
          </button>

          {showAdvanced && (
            <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-lg p-6 space-y-4">
              {/* SEO Meta Tags */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">SEO Meta Tags</h3>

                <div>
                  <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-300 mb-2">
                    Meta Title
                  </label>
                  <input
                    id="metaTitle"
                    name="metaTitle"
                    type="text"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    maxLength={60}
                    className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    placeholder="SEO optimized title (max 60 characters)"
                  />
                </div>

                <div>
                  <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-300 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    rows={2}
                    maxLength={160}
                    className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                    placeholder="SEO description (max 160 characters)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-300 mb-2">
                      Meta Keywords (comma-separated)
                    </label>
                    <input
                      id="metaKeywords"
                      name="metaKeywords"
                      type="text"
                      value={formData.metaKeywords}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                      placeholder="keyword1, keyword2"
                    />
                  </div>

                  <div>
                    <label htmlFor="focusKeyword" className="block text-sm font-medium text-gray-300 mb-2">
                      Focus Keyword
                    </label>
                    <input
                      id="focusKeyword"
                      name="focusKeyword"
                      type="text"
                      value={formData.focusKeyword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                      placeholder="Primary keyword"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-300 mb-2">
                    Canonical URL
                  </label>
                  <input
                    id="canonicalUrl"
                    name="canonicalUrl"
                    type="url"
                    value={formData.canonicalUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    placeholder="https://example.com/canonical-url"
                  />
                </div>
              </div>

              {/* Open Graph Tags */}
              <div className="space-y-4 pt-4 border-t border-[#2a2b3e]">
                <h3 className="text-lg font-semibold text-white">Open Graph Tags</h3>

                <div>
                  <label htmlFor="ogTitle" className="block text-sm font-medium text-gray-300 mb-2">
                    OG Title
                  </label>
                  <input
                    id="ogTitle"
                    name="ogTitle"
                    type="text"
                    value={formData.ogTitle}
                    onChange={handleInputChange}
                    maxLength={95}
                    className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    placeholder="Open Graph title (max 95 characters)"
                  />
                </div>

                <div>
                  <label htmlFor="ogDescription" className="block text-sm font-medium text-gray-300 mb-2">
                    OG Description
                  </label>
                  <textarea
                    id="ogDescription"
                    name="ogDescription"
                    value={formData.ogDescription}
                    onChange={handleInputChange}
                    rows={2}
                    maxLength={200}
                    className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                    placeholder="Open Graph description (max 200 characters)"
                  />
                </div>

                <div>
                  <label htmlFor="ogType" className="block text-sm font-medium text-gray-300 mb-2">
                    OG Type
                  </label>
                  <select
                    id="ogType"
                    name="ogType"
                    value={formData.ogType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  >
                    <option value="article">Article</option>
                    <option value="website">Website</option>
                    <option value="blog">Blog</option>
                  </select>
                </div>
              </div>

              {/* Twitter Card Tags */}
              <div className="space-y-4 pt-4 border-t border-[#2a2b3e]">
                <h3 className="text-lg font-semibold text-white">Twitter Card Tags</h3>

                <div>
                  <label htmlFor="twitterCard" className="block text-sm font-medium text-gray-300 mb-2">
                    Twitter Card Type
                  </label>
                  <select
                    id="twitterCard"
                    name="twitterCard"
                    value={formData.twitterCard}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary Large Image</option>
                    <option value="app">App</option>
                    <option value="player">Player</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="twitterTitle" className="block text-sm font-medium text-gray-300 mb-2">
                    Twitter Title
                  </label>
                  <input
                    id="twitterTitle"
                    name="twitterTitle"
                    type="text"
                    value={formData.twitterTitle}
                    onChange={handleInputChange}
                    maxLength={70}
                    className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    placeholder="Twitter title (max 70 characters)"
                  />
                </div>

                <div>
                  <label htmlFor="twitterDescription" className="block text-sm font-medium text-gray-300 mb-2">
                    Twitter Description
                  </label>
                  <textarea
                    id="twitterDescription"
                    name="twitterDescription"
                    value={formData.twitterDescription}
                    onChange={handleInputChange}
                    rows={2}
                    maxLength={200}
                    className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                    placeholder="Twitter description (max 200 characters)"
                  />
                </div>
              </div>

              {/* Schema Type */}
              <div className="pt-4 border-t border-[#2a2b3e]">
                <label htmlFor="schemaType" className="block text-sm font-medium text-gray-300 mb-2">
                  Schema Type
                </label>
                <select
                  id="schemaType"
                  name="schemaType"
                  value={formData.schemaType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                >
                  <option value="Article">Article</option>
                  <option value="BlogPosting">Blog Posting</option>
                  <option value="NewsArticle">News Article</option>
                  <option value="TechArticle">Tech Article</option>
                </select>
              </div>
            </div>
          )}

          {/* Publishing Options */}
          <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Publishing Options</h2>

            {canApprove ? (
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                >
                  <option value={BlogStatus.DRAFT}>Draft</option>
                  <option value={BlogStatus.PENDING_REVIEW}>Pending Review</option>
                  <option value={BlogStatus.PUBLISHED}>Published</option>
                  <option value={BlogStatus.REJECTED}>Rejected</option>
                </select>
              </div>
            ) : (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  Your blogs will be submitted for review. They will be published after admin approval.
                </p>
              </div>
            )}

            {canApprove && (
              <div className="flex items-center">
                <input
                  id="published"
                  name="published"
                  type="checkbox"
                  checked={formData.published}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 bg-[#0a0b0f] border-[#2a2b3e] rounded focus:ring-purple-500"
                />
                <label htmlFor="published" className="ml-2 text-sm font-medium text-gray-300">
                  Publish immediately
                </label>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave className="w-5 h-5" />
              {loading ? 'Saving...' : editingBlog ? 'Update Blog' : 'Create Blog'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="px-6 py-3 bg-[#2a2b3e] text-white font-semibold rounded-lg hover:bg-[#3a3b4e] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blog Management</h1>
          <p className="text-gray-400">Create, edit, and manage your blog posts</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
        >
          <FiPlus className="w-5 h-5" />
          Create Blog
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
          {success}
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              <option value="all">All Status</option>
              <option value={BlogStatus.DRAFT}>Draft</option>
              <option value={BlogStatus.PENDING_REVIEW}>Pending Review</option>
              <option value={BlogStatus.PUBLISHED}>Published</option>
              <option value={BlogStatus.REJECTED}>Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blog List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-gray-400">Loading blogs...</div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12 bg-[#1a1b2e] border border-[#2a2b3e] rounded-lg">
          <p className="text-gray-400">No blogs found. Create your first blog!</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {blogs.map((blog) => {
              const isAuthor = blog.author?._id === user?.userId || blog.author === user?.userId;
              const canEdit = isAuthor || canApprove;
              const canDelete = isAuthor || canApprove;

              return (
                <div
                  key={blog._id}
                  className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-lg p-6 hover:border-purple-500/50 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{blog.title}</h3>
                        {getStatusBadge(blog.status)}
                      </div>
                      {blog.excerpt && (
                        <p className="text-gray-400 mb-3 line-clamp-2">{blog.excerpt}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span>
                          Author: {typeof blog.author === 'object' ? blog.author?.name : 'Unknown'}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        {blog.publishedAt && (
                          <>
                            <span>•</span>
                            <span>
                              Published: {new Date(blog.publishedAt).toLocaleDateString()}
                            </span>
                          </>
                        )}
                        <span>•</span>
                        <span>{blog.views || 0} views</span>
                        {blog.readingTime > 0 && (
                          <>
                            <span>•</span>
                            <span>{blog.readingTime} min read</span>
                          </>
                        )}
                      </div>
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {blog.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {blog.rejectionReason && (
                        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
                          <strong>Rejection Reason:</strong> {blog.rejectionReason}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {canEdit && (
                        <button
                          onClick={() => handleEdit(blog)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition"
                          title="Edit"
                        >
                          <FiEdit3 className="w-5 h-5" />
                        </button>
                      )}
                      {canApprove && blog.status === BlogStatus.PENDING_REVIEW && (
                        <>
                          <button
                            onClick={() => handleApprove(blog._id, 'approve')}
                            className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded transition"
                            title="Approve"
                          >
                            <FiCheck className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt('Rejection reason:');
                              if (reason) {
                                handleApprove(blog._id, 'reject', reason);
                              }
                            }}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition"
                            title="Reject"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition"
                          title="Delete"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-[#1a1b2e] border border-[#2a2b3e] rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2b3e] transition"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 bg-[#1a1b2e] border border-[#2a2b3e] rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2b3e] transition"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

