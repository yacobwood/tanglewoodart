/**
 * Admin Authentication Helpers
 * Simple password-based authentication for admin panel
 */

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';
const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key-change-in-production';

/**
 * Verify admin password
 */
export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

/**
 * Create admin session token
 * Simple token: base64 encoded timestamp + secret
 */
export function createSessionToken(): string {
  const timestamp = Date.now();
  const payload = `${timestamp}:${SESSION_SECRET}`;
  return Buffer.from(payload).toString('base64');
}

/**
 * Verify session token
 * Check if token is valid and not expired (24 hours)
 */
export function verifySessionToken(token: string): boolean {
  try {
    const payload = Buffer.from(token, 'base64').toString('utf-8');
    const [timestampStr, secret] = payload.split(':');

    if (secret !== SESSION_SECRET) {
      return false;
    }

    const timestamp = parseInt(timestampStr, 10);
    const now = Date.now();
    const hoursSinceCreation = (now - timestamp) / (1000 * 60 * 60);

    // Token expires after 24 hours
    return hoursSinceCreation < 24;
  } catch {
    return false;
  }
}

/**
 * Set admin session cookie
 */
export async function setAdminSession() {
  const token = createSessionToken();
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });

  return token;
}

/**
 * Clear admin session cookie
 */
export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionToken) {
    return false;
  }

  return verifySessionToken(sessionToken.value);
}

/**
 * Get session token from request
 */
export function getSessionFromRequest(request: NextRequest): string | null {
  return request.cookies.get(SESSION_COOKIE_NAME)?.value || null;
}

/**
 * Verify request is authenticated
 */
export function isRequestAuthenticated(request: NextRequest): boolean {
  const token = getSessionFromRequest(request);
  if (!token) {
    return false;
  }
  return verifySessionToken(token);
}
