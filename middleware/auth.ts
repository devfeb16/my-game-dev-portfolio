import { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentUser } from '@/lib/auth';
import { UserRole } from '@/models/User';

export type AuthMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  user: { userId: string; email: string; role: string }
) => Promise<void> | void;

export function requireAuth(handler: AuthMiddleware, allowedRoles?: UserRole[]) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user = await getCurrentUser(req);

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized - Please login' });
      }

      if (allowedRoles && !allowedRoles.includes(user.role as UserRole)) {
        return res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
      }

      return handler(req, res, user);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}

