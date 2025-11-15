import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import CreateBlog from '@/components/dashboard/CreateBlog';
import Analytics from '@/components/dashboard/Analytics';
import Users from '@/components/dashboard/Users';
import Settings from '@/components/dashboard/Settings';

export default function Dashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [currentView, setCurrentView] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user && router.query.role) {
      // Redirect to correct role dashboard if needed
      if (router.query.role !== user.role) {
        router.push(`/dashboard/${user.role}`);
      }
    }

    // Handle query parameter for view
    if (router.query.view) {
      setCurrentView(String(router.query.view));
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return <DashboardOverview />;
      case 'create-blog':
        return <CreateBlog />;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return <Users />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard - {user.role} | Game Dev Portfolio</title>
      </Head>
      <div className="min-h-screen bg-[#0a0b0f] flex">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar activeView={currentView} onViewChange={setCurrentView} />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-[#1a1b2e] border border-[#2a2b3e] rounded-lg text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="fixed left-0 top-0 bottom-0 w-64 bg-[#1a1b2e] z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar activeView={currentView} onViewChange={setCurrentView} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </>
  );
}

