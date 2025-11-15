import { removeAuthCookie } from '@/lib/auth';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  removeAuthCookie(res);

  return res.status(200).json({ success: true, message: 'Logged out successfully' });
}

