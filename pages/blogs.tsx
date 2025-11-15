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
              <h1 className="text-3xl font-bold text-white mb-2">Our Blogs</h1>
              <p className="text-gray-400">
                Read our latest updates, insights, and stories from our developer teams. 
                Stay updated with the latest in game development, Unity, programming, and technology.
              </p>
            </div>
            {user && (user.role === 'admin' || user.role === 'blogger') && (
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
            <div className="max-w-4xl mx-auto py-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Welcome to Our Blog Section
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Explore insights, tutorials, and stories about game development, Unity, and technology
                </p>
              </div>

              <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-8 mb-8">
                <div className="text-center">
                  <div className="mb-6">
                    <svg
                      className="w-24 h-24 mx-auto text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {user && (user.role === 'admin' || user.role === 'blogger')
                      ? 'Start Writing Your First Blog'
                      : 'Be a Content Writer for Us!'}
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                    {user && (user.role === 'admin' || user.role === 'blogger')
                      ? 'Share your knowledge and expertise with our community. Create engaging content about game development, Unity, programming, and more.'
                      : 'Are you a content writer or blogger? Join our platform and share your insights about game development, Unity programming, AI/ML, and technology trends. Help us build a community of knowledge and creativity.'}
                  </p>
                  
                  {user && (user.role === 'admin' || user.role === 'blogger') ? (
                    <button
                      onClick={() => router.push(`/dashboard/${user.role}?view=create-blog`)}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
                    >
                      Create Your First Blog
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <button
                        onClick={() => router.push('/login')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
                      >
                        Login to Write Blogs
                      </button>
                      <span className="text-gray-500">or</span>
                      <button
                        onClick={() => router.push('/login')}
                        className="px-6 py-3 bg-[#2a2b3e] text-white font-semibold rounded-lg hover:bg-[#3a3b4e] transition"
                      >
                        Sign Up as Content Writer
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-6">
                  <div className="text-purple-400 text-3xl mb-4">🎮</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Game Development</h4>
                  <p className="text-gray-400 text-sm">
                    Share your Unity game development journey, tips, tricks, and best practices.
                  </p>
                </div>
                <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-6">
                  <div className="text-blue-400 text-3xl mb-4">💻</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Programming & Tech</h4>
                  <p className="text-gray-400 text-sm">
                    Write about programming languages, frameworks, tools, and software development.
                  </p>
                </div>
                <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-6">
                  <div className="text-green-400 text-3xl mb-4">🤖</div>
                  <h4 className="text-lg font-semibold text-white mb-2">AI & Machine Learning</h4>
                  <p className="text-gray-400 text-sm">
                    Explore AI, ML, LLMs, and how they're transforming game development and technology.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-8 text-center">
                <h4 className="text-xl font-semibold text-white mb-3">What We Offer</h4>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Our platform provides a space for content creators to share their expertise. 
                  Whether you're writing about Unity game development, programming tutorials, 
                  AI/ML insights, or technology trends, we welcome your contributions.
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Easy Content Management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Engage with Our Community</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Share Your Expertise</span>
                  </div>
                </div>
              </div>
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

          {/* Content Writer CTA Section - Above Footer */}
          <div className="mt-16 mb-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 border border-purple-500/30 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <div className="mb-6">
                  <svg
                    className="w-16 h-16 mx-auto text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Are You a Content Writer or Developer?
                </h2>
                
                <p className="text-lg text-gray-300 mb-2 max-w-3xl mx-auto">
                  Want to write for us? Collaborate with us? Share your expertise?
                </p>
                
                <p className="text-base text-gray-400 mb-8 max-w-2xl mx-auto">
                  Join our platform and contribute blogs about game development, Unity, programming, 
                  AI/ML, and technology. Connect with our developer community and showcase your knowledge.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => router.push('/login')}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition shadow-lg hover:shadow-purple-500/50 flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Login to Dashboard
                  </button>
                  
                  <button
                    onClick={() => router.push('/contact')}
                    className="px-8 py-3 bg-[#2a2b3e] text-white font-semibold rounded-lg hover:bg-[#3a3b4e] transition border border-[#3a3b4e] hover:border-purple-500/50 flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Contact Us
                  </button>
                </div>

                <div className="mt-8 pt-8 border-t border-purple-500/20">
                  <p className="text-sm text-gray-400">
                    Already have an account?{' '}
                    <button
                      onClick={() => router.push('/login')}
                      className="text-purple-400 hover:text-purple-300 underline transition"
                    >
                      Login here
                    </button>
                    {' '}or{' '}
                    <button
                      onClick={() => router.push('/login')}
                      className="text-purple-400 hover:text-purple-300 underline transition"
                    >
                      Sign up as a content writer
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

