import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const COOKIE_NAME = 'auth-token';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function generateToken(user) {
  const payload = {
    userId: typeof user._id === 'string' ? user._id : user._id.toString(),
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function setAuthCookie(res, token) {
  const cookie = serialize(COOKIE_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}

export function removeAuthCookie(res) {
  const cookie = serialize(COOKIE_NAME, '', {
    maxAge: -1,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}

export function getTokenFromRequest(req) {
  // First try to get from cookies
  const cookieToken = req.cookies[COOKIE_NAME];
  if (cookieToken) return cookieToken;

  // Fallback to Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
}

export async function getCurrentUser(req) {
  const token = getTokenFromRequest(req);
  if (!token) return null;

  return verifyToken(token);
}

