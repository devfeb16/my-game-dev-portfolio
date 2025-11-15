import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/models/User';
import { FiFileText, FiEye, FiEdit3, FiUsers } from 'react-icons/fi';

export default function DashboardOverview() {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total Blogs',
      value: '0',
      icon: <FiFileText className="w-6 h-6" />,
      color: 'bg-blue-500',
      roles: [UserRole.ADMIN, UserRole.BLOGGER, UserRole.MARKETING],
    },
    {
      label: 'Published',
      value: '0',
      icon: <FiEye className="w-6 h-6" />,
      color: 'bg-green-500',
      roles: [UserRole.ADMIN, UserRole.BLOGGER, UserRole.MARKETING],
    },
    {
      label: 'Drafts',
      value: '0',
      icon: <FiEdit3 className="w-6 h-6" />,
      color: 'bg-yellow-500',
      roles: [UserRole.ADMIN, UserRole.BLOGGER],
    },
    {
      label: 'Total Users',
      value: '0',
      icon: <FiUsers className="w-6 h-6" />,
      color: 'bg-purple-500',
      roles: [UserRole.ADMIN],
    },
  ];

  const visibleStats = stats.filter(
    (stat) => user?.role && stat.roles.includes(user.role as UserRole)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-400">
          Here's an overview of your {user?.role === UserRole.ADMIN ? 'platform' : 'account'}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleStats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-6 hover:border-purple-500/50 transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-white`}>{stat.icon}</div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="space-y-3">
          {(user?.role === UserRole.ADMIN || user?.role === UserRole.BLOGGER) && (
            <button className="w-full text-left px-4 py-3 bg-[#0a0b0f] rounded-lg hover:bg-[#2a2b3e] transition text-white">
              Create New Blog Post
            </button>
          )}
          {user?.role === UserRole.ADMIN && (
            <button className="w-full text-left px-4 py-3 bg-[#0a0b0f] rounded-lg hover:bg-[#2a2b3e] transition text-white">
              Manage Users
            </button>
          )}
          {user?.role === UserRole.MARKETING && (
            <button className="w-full text-left px-4 py-3 bg-[#0a0b0f] rounded-lg hover:bg-[#2a2b3e] transition text-white">
              View Analytics
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

