import { getCurrentUser } from '@/lib/auth';
import { UserRole } from '@/models/User';

export function requireAuth(handler, allowedRoles) {
  return async (req, res) => {
    try {
      const user = await getCurrentUser(req);

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized - Please login' });
      }

      if (allowedRoles && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
      }

      return handler(req, res, user);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}

