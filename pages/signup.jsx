import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Head from 'next/head';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(`/dashboard/${user.role}`);
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(email, password, name);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up | UnityDevs Portfolio</title>
        <meta name="description" content="Create an account to access the game developer portfolio" />
      </Head>
      <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center p-4 pt-6 pb-8 md:pt-4 md:pb-6 relative overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Header */}
          <div className="text-center mb-4 md:mb-5">
            <Link href="/" className="inline-block mb-2 md:mb-3">
              <span className="font-[var(--font-orbitron)] text-xl md:text-2xl font-bold text-neon-cyan">
                Unity<span className="text-white">Devs</span>
              </span>
            </Link>
            <h1 className="font-[var(--font-orbitron)] text-3xl md:text-4xl font-bold text-white mb-1 md:mb-1.5">
              Create Account
            </h1>
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"></div>
              <p className="text-zinc-400 text-xs md:text-sm">Join the community</p>
              <div className="h-px w-8 md:w-12 bg-gradient-to-r from-neon-cyan via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-[#0e1218]/90 backdrop-blur-xl border border-neon-cyan/20 rounded-2xl p-5 md:p-6 shadow-[0_0_40px_-10px_rgba(34,211,238,0.15)] relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-magenta/5 pointer-events-none"></div>
            
            <div className="relative z-10">
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">⚠</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#0a0b0f] border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#0a0b0f] border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 bg-[#0a0b0f] border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all"
                    placeholder="Minimum 6 characters"
                  />
                  <p className="mt-1 text-xs text-zinc-500">Password must be at least 6 characters</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-neon-cyan to-neon-blue text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-[#0e1218] transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Creating Account...
                      </span>
                    ) : (
                      'Sign Up'
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </form>

              <div className="mt-5 pt-5 border-t border-zinc-800">
                <p className="text-center text-sm text-zinc-400">
                  Already have an account?{' '}
                  <Link 
                    href="/login" 
                    className="text-neon-cyan hover:text-neon-blue font-medium transition-colors inline-flex items-center gap-1 group"
                  >
                    Sign In
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-3 md:mt-4 text-center text-xs text-zinc-500">
            By signing up, you agree to our terms of service and privacy policy
          </p>
        </div>
      </div>
    </>
  );
}

