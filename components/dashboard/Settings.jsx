import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setLoading(true);
    // Settings save logic would go here
    setTimeout(() => {
      setMessage('Settings saved successfully!');
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account settings</p>
      </div>

      <div className="bg-[#1a1b2e] border border-[#2a2b3e] rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white focus-none focus-2 focus-purple-500 transition"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white focus-none focus-2 focus-purple-500 transition"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <input
                type="text"
                defaultValue={user?.role}
                className="w-full px-4 py-3 bg-[#0a0b0f] border border-[#2a2b3e] rounded-lg text-white capitalize focus-none focus-2 focus-purple-500 transition"
                disabled
              />
            </div>
          </div>
        </div>

        {message && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
            {message}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover-purple-700 hover-blue-700 transition disabled-50"
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}

