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
            <div className="max-w-6xl mx-auto py-12">
              {/* Hero Section */}
              <div className="text-center mb-16">
                <div className="mb-6">
                  <div className="inline-block p-4 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl border border-purple-500/30">
                    <svg
                      className="w-20 h-20 mx-auto text-purple-400"
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
                </div>
                <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Our Development Blog
                </h2>
                <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
                  Read our latest updates, insights, and stories from our developer teams
                </p>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  Stay updated with the latest in game development, Unity programming, AI/ML, and technology trends
                </p>
              </div>

              {/* Main CTA Card */}
              <div className="bg-gradient-to-br from-[#1a1b2e] to-[#0f1015] border-2 border-purple-500/30 rounded-2xl p-10 mb-12 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-purple-600/5"></div>
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {user && (user.role === 'admin' || user.role === 'blogger')
                        ? 'Start Writing for Our Platform'
                        : 'Interested in Writing Development Blogs?'}
                    </h3>
                    <p className="text-lg text-gray-300 mb-2 max-w-3xl mx-auto">
                      {user && (user.role === 'admin' || user.role === 'blogger')
                        ? 'Share your expertise and help grow our developer community'
                        : 'Are you a content writer or developer who wants to collaborate with us?'}
                    </p>
                    <p className="text-base text-gray-400 max-w-2xl mx-auto">
                      {user && (user.role === 'admin' || user.role === 'blogger')
                        ? 'Create engaging content about game development, Unity, programming, and technology.'
                        : 'If you\'re interested in writing development-related blogs and content, we\'d love to collaborate with you! Share your knowledge about game development, Unity, programming, AI/ML, and technology with our community.'}
                    </p>
                  </div>
                  
                  {user && (user.role === 'admin' || user.role === 'blogger') ? (
                    <div className="text-center">
                      <button
                        onClick={() => router.push(`/dashboard/${user.role}?view=create-blog`)}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition shadow-lg hover:shadow-purple-500/50 text-lg"
                      >
                        Create Your First Blog
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <button
                        onClick={() => router.push('/login')}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition shadow-lg hover:shadow-purple-500/50 text-lg"
                      >
                        Login to Write Blogs
                      </button>
                      <span className="text-gray-500 text-lg">or</span>
                      <button
                        onClick={() => router.push('/login')}
                        className="px-8 py-4 bg-[#2a2b3e] text-white font-semibold rounded-lg hover:bg-[#3a3b4e] transition border-2 border-[#3a3b4e] hover:border-purple-500/50 text-lg"
                      >
                        Sign Up as Content Writer
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* What We're About Section */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">What We're About</h3>
                <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-8">
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-4xl mx-auto text-center">
                    This blog section is dedicated to sharing knowledge, insights, and stories from our development team. 
                    We focus on game development using Unity, programming best practices, AI and machine learning applications, 
                    and the latest technology trends that shape our industry.
                  </p>
                  <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto text-center">
                    Whether you're a developer, designer, or tech enthusiast, our blogs aim to educate, inspire, 
                    and connect our community through valuable content and real-world experiences.
                  </p>
                </div>
              </div>

              {/* Topic Categories Grid */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Topics We Cover</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-8 hover:border-purple-500/50 transition group">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition">🎮</div>
                    <h4 className="text-xl font-semibold text-white mb-3">Game Development</h4>
                    <p className="text-gray-400 leading-relaxed">
                      Unity game development journeys, tips, tricks, best practices, and industry insights 
                      from our experienced developers.
                    </p>
                  </div>
                  <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-8 hover:border-blue-500/50 transition group">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition">💻</div>
                    <h4 className="text-xl font-semibold text-white mb-3">Programming & Tech</h4>
                    <p className="text-gray-400 leading-relaxed">
                      Programming languages, frameworks, tools, software development methodologies, 
                      and technical deep-dives from our engineering team.
                    </p>
                  </div>
                  <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-8 hover:border-green-500/50 transition group">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition">🤖</div>
                    <h4 className="text-xl font-semibold text-white mb-3">AI & Machine Learning</h4>
                    <p className="text-gray-400 leading-relaxed">
                      AI, ML, LLMs, and how they're transforming game development and technology. 
                      Explore the future of intelligent systems.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Write for Us */}
              <div className="bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-10 mb-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Why Write for Us?</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 text-xl">✓</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Reach Our Developer Community</h4>
                      <p className="text-gray-400">
                        Share your expertise with an engaged audience of developers, game creators, and tech enthusiasts.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 text-xl">✓</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Easy Content Management</h4>
                      <p className="text-gray-400">
                        Use our intuitive dashboard to create, edit, and manage your blog posts with ease.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 text-xl">✓</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Collaborate with Our Team</h4>
                      <p className="text-gray-400">
                        Work alongside our development team to create valuable, technical content for our community.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-green-400 text-xl">✓</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Showcase Your Expertise</h4>
                      <p className="text-gray-400">
                        Build your reputation and portfolio while contributing to the developer community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Start Writing?
                </h3>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                  Join us as a content writer and help build a vibrant community of developers sharing knowledge and insights.
                </p>
                <button
                  onClick={() => router.push('/login')}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
                >
                  Get Started - Sign Up Now
                </button>
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

