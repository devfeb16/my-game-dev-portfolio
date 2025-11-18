import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FiCalendar, FiUser, FiEye, FiClock, FiArrowLeft } from 'react-icons/fi';

export default function BlogDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/blogs/public?slug=${slug}`);
      const data = await res.json();

      if (data.success && data.blog) {
        setBlog(data.blog);
      } else {
        setError(data.error || 'Blog not found');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading... | Game Dev Portfolio</title>
        </Head>
        <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center">
          <div className="text-white">Loading blog...</div>
        </div>
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Head>
          <title>Blog Not Found | Game Dev Portfolio</title>
        </Head>
        <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Blog Not Found</h1>
            <p className="text-gray-400 mb-6">{error || 'The blog you are looking for does not exist.'}</p>
            <button
              onClick={() => router.push('/blogs')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </>
    );
  }

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': blog.schemaType || 'Article',
    headline: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    image: blog.featuredImage || blog.ogImage,
    datePublished: blog.publishedAt,
    dateModified: blog.lastUpdatedAt || blog.updatedAt,
    author: {
      '@type': 'Person',
      name: typeof blog.author === 'object' ? blog.author?.name : 'Unknown',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Game Dev Portfolio',
    },
  };

  return (
    <>
      <Head>
        <title>{blog.metaTitle || blog.title} | Game Dev Portfolio</title>
        <meta name="description" content={blog.metaDescription || blog.excerpt} />
        {blog.metaKeywords && blog.metaKeywords.length > 0 && (
          <meta name="keywords" content={Array.isArray(blog.metaKeywords) ? blog.metaKeywords.join(', ') : blog.metaKeywords} />
        )}
        {blog.canonicalUrl && <link rel="canonical" href={blog.canonicalUrl} />}

        {/* Open Graph */}
        <meta property="og:title" content={blog.ogTitle || blog.title} />
        <meta property="og:description" content={blog.ogDescription || blog.excerpt} />
        <meta property="og:image" content={blog.ogImage || blog.featuredImage} />
        <meta property="og:type" content={blog.ogType || 'article'} />
        <meta property="og:url" content={`${typeof window !== 'undefined' ? window.location.href : ''}`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={blog.twitterCard || 'summary_large_image'} />
        <meta name="twitter:title" content={blog.twitterTitle || blog.title} />
        <meta name="twitter:description" content={blog.twitterDescription || blog.excerpt} />
        {blog.twitterImage && <meta name="twitter:image" content={blog.twitterImage} />}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-[#0a0b0f]">
        {/* Header */}
        <div className="bg-[#1a1b2e] border-b border-[#2a2b3e] sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <button
              onClick={() => router.push('/blogs')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Back to Blogs</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={blog.featuredImage}
                alt={blog.featuredImageAlt || blog.title}
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8 pb-8 border-b border-[#2a2b3e]">
            {blog.author && (
              <div className="flex items-center gap-2">
                <FiUser className="w-5 h-5" />
                <span>{typeof blog.author === 'object' ? blog.author?.name : 'Unknown'}</span>
              </div>
            )}
            {blog.publishedAt && (
              <div className="flex items-center gap-2">
                <FiCalendar className="w-5 h-5" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
            )}
            {blog.readingTime > 0 && (
              <div className="flex items-center gap-2">
                <FiClock className="w-5 h-5" />
                <span>{blog.readingTime} min read</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <FiEye className="w-5 h-5" />
              <span>{blog.views || 0} views</span>
            </div>
          </div>

          {/* Excerpt */}
          {blog.excerpt && (
            <div className="mb-8 p-6 bg-[#1a1b2e] border border-[#2a2b3e] rounded-lg">
              <p className="text-xl text-gray-300 leading-relaxed">{blog.excerpt}</p>
            </div>
          )}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-purple-500/20 text-purple-400 rounded-lg border border-purple-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {blog.content?.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph || '\u00A0'}
                </p>
              ))}
            </div>
          </div>

          {/* Category */}
          {blog.category && (
            <div className="mt-8 pt-8 border-t border-[#2a2b3e]">
              <span className="text-sm text-gray-500">Category: </span>
              <span className="text-sm text-purple-400 font-medium">{blog.category}</span>
            </div>
          )}
        </article>
      </div>
    </>
  );
}

