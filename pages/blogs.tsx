import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '@/contexts/AuthContext';
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiCalendar, FiUser } from 'react-icons/fi';

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  featuredImage?: string;
  tags: string[];
  published: boolean;
  publishedAt?: string;
  views: number;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function BlogsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, [user]); // Refetch when user state changes

  const fetchBlogs = async () => {
    try {
      // Use public endpoint for non-authenticated users, or authenticated endpoint for logged-in users
      const endpoint = user ? '/api/blogs' : '/api/blogs/public';
      const res = await fetch(endpoint);
      const data = await res.json();

      if (data.success) {
        setBlogs(data.blogs);
      } else {
        setError(data.error || 'Failed to fetch blogs');
        setBlogs([]);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) {
      alert('Please login to delete blogs');
      router.push('/login');
      return;
    }

    if (!confirm('Are you sure you want to delete this blog?')) return;

    setDeleteLoading(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else {
        alert(data.error || 'Failed to delete blog');
      }
    } catch (err: any) {
      alert(err.message || 'An error occurred');
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Blogs | Game Dev Portfolio</title>
      </Head>
      <div className="min-h-screen bg-[#0a0b0f] p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Blogs</h1>
              <p className="text-gray-400">Manage and view all blog posts</p>
            </div>
            {(user.role === 'admin' || user.role === 'blogger') && (
              <button
                onClick={() => router.push(`/dashboard/${user.role}?view=create-blog`)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
              >
                <FiPlus className="w-5 h-5" />
                Create Blog
              </button>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No blogs found.</p>
              {(user.role === 'admin' || user.role === 'blogger') && (
                <button
                  onClick={() => router.push(`/dashboard/${user.role}?view=create-blog`)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Create Your First Blog
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl overflow-hidden hover:border-purple-500/50 transition"
                >
                  {blog.featuredImage && (
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          blog.published
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <FiEye className="w-3 h-3" />
                        {blog.views}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {blog.title}
                    </h2>

                    {blog.excerpt && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                    )}

                    {blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-[#0a0b0f] text-gray-300 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <FiUser className="w-3 h-3" />
                        {blog.author.name}
                      </span>
                      {blog.publishedAt && (
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" />
                          {formatDate(blog.publishedAt)}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-[#2a2b3e]">
                      <button
                        onClick={() => router.push(`/blogs/${blog.slug}`)}
                        className="flex-1 px-3 py-2 bg-[#0a0b0f] text-white text-sm rounded-lg hover:bg-[#2a2b3e] transition"
                      >
                        View
                      </button>
                      {user && (blog.author._id === user.id || user.role === 'admin') && (
                        <>
                          <button
                            onClick={() =>
                              router.push(`/dashboard/${user.role}?view=edit-blog&id=${blog._id}`)
                            }
                            className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            disabled={deleteLoading === blog._id}
                            className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

