import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiX, FiEye } from 'react-icons/fi';

export default function CreateBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    featuredImage: '',
    tags: '',
    published: false,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));

    // Auto-generate slug from title
    if (name === 'title' && !formData.slug) {
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
    setLoading(true);

    try {
      const tags = formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean);

      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/blogs');
        }, 2000);
      } else {
        setError(data.error || 'Failed to create blog');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Create New Blog</h1>
          <p className="text-gray-400">Write and publish your blog post</p>
        </div>
        <a
          href="/blogs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#2a2b3e] text-white font-semibold rounded-lg hover:bg-[#3a3b4e] transition border border-[#3a3b3e]"
        >
          <FiEye className="w-5 h-5" />
          View Public Blogs
        </a>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
          Blog created successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            required
            rows={15}
            className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none font-mono text-sm"
            placeholder="Write your blog content here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="tag1, tag2, tag3"
            />
          </div>

          <div>
            <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-300 mb-2">
              Featured Image URL
            </label>
            <input
              id="featuredImage"
              name="featuredImage"
              type="url"
              value={formData.featuredImage}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="published"
            name="published"
            type="checkbox"
            checked={formData.published}
            onChange={handleChange}
            className="w-4 h-4 text-purple-600 bg-[#0a0b0f] border-[#2a2b3e] rounded focus:ring-purple-500"
          />
          <label htmlFor="published" className="ml-2 text-sm font-medium text-gray-300">
            Publish immediately
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Blog'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-[#2a2b3e] text-white font-semibold rounded-lg hover:bg-[#3a3b4e] transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
