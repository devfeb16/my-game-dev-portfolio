import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/models/User';
import { FiHome, FiFileText, FiUsers, FiSettings, FiBarChart2, FiEdit3, FiLogOut } from 'react-icons/fi';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[];
  route?: string;
  onClick?: () => void;
}

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const sidebarItems: SidebarItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <FiHome className="w-5 h-5" />,
      roles: [UserRole.ADMIN, UserRole.MARKETING, UserRole.BLOGGER, UserRole.USER],
    },
    {
      id: 'blogs',
      label: 'Blogs',
      icon: <FiFileText className="w-5 h-5" />,
      roles: [UserRole.ADMIN, UserRole.BLOGGER, UserRole.MARKETING],
      route: '/blogs',
    },
    {
      id: 'create-blog',
      label: 'Create Blog',
      icon: <FiEdit3 className="w-5 h-5" />,
      roles: [UserRole.ADMIN, UserRole.BLOGGER],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <FiBarChart2 className="w-5 h-5" />,
      roles: [UserRole.ADMIN, UserRole.MARKETING],
    },
    {
      id: 'users',
      label: 'Users',
      icon: <FiUsers className="w-5 h-5" />,
      roles: [UserRole.ADMIN],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <FiSettings className="w-5 h-5" />,
      roles: [UserRole.ADMIN, UserRole.MARKETING, UserRole.BLOGGER, UserRole.USER],
    },
  ];

  const filteredItems = sidebarItems.filter((item) =>
    user?.role && item.roles.includes(user.role as UserRole)
  );

  const handleItemClick = (item: SidebarItem) => {
    if (item.route) {
      router.push(item.route);
    } else if (item.onClick) {
      item.onClick();
    } else {
      onViewChange(item.id);
      // Update URL without navigating
      router.push({
        pathname: router.pathname,
        query: { ...router.query, view: item.id },
      }, undefined, { shallow: true });
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="w-64 bg-[#1a1b2e] border-r border-[#2a2b3e] flex flex-col h-screen fixed left-0 top-0 z-10">
      <div className="p-6 border-b border-[#2a2b3e]">
        <h2 className="text-xl font-bold text-white">Dashboard</h2>
        <p className="text-sm text-gray-400 mt-1 capitalize">{user?.role}</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive = activeView === item.id || (item.route && router.pathname === item.route);
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-[#2a2b3e] hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#2a2b3e]">
        <div className="mb-3 px-4 py-2 bg-[#0a0b0f] rounded-lg">
          <p className="text-sm font-medium text-white">{user?.name}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

