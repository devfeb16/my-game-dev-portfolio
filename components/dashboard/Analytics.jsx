import { UserRole } from '@/models/User';
import { useAuth } from '@/contexts/AuthContext';

export default function Analytics() {
  const { user } = useAuth();

  if (user?.role !== UserRole.ADMIN && user?.role !== UserRole.MARKETING) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-400">You don't have permission to view analytics.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">Track your blog performance and user engagement</p>
      </div>

      <div className="grid grid-cols-1 md-cols-2 lg-cols-4 gap-4">
        <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-6">
          <h3 className="text-sm text-gray-400 mb-2">Total Views</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-6">
          <h3 className="text-sm text-gray-400 mb-2">Published Posts</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-6">
          <h3 className="text-sm text-gray-400 mb-2">Avg. Views</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-6">
          <h3 className="text-sm text-gray-400 mb-2">Growth</h3>
          <p className="text-3xl font-bold text-white">0%</p>
        </div>
      </div>

      <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Analytics Chart</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          Chart visualization will be implemented here
        </div>
      </div>
    </div>
  );
}

