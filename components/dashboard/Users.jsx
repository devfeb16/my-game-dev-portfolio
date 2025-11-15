import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/models/User';

export default function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only admins can access this
    if (user?.role === UserRole.ADMIN) {
      // Fetch users API endpoint would go here
      setLoading(false);
    }
  }, [user]);

  if (user?.role !== UserRole.ADMIN) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-400">You don't have permission to view users.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
        <p className="text-gray-400">Manage all platform users</p>
      </div>

      <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl overflow-hidden">
        <div className="p-6">
          {loading ? (
            <p className="text-gray-400">Loading users...</p>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400">User management interface will be implemented here.</p>
              <p className="text-sm text-gray-500">
                API endpoint for fetching users needs to be created.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

