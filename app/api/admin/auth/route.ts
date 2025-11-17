/**
 * Admin Authentication API
 * POST /api/admin/auth - Verify password and set session
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, setAdminSession, clearAdminSession } from '@/lib/admin-auth';

/**
 * POST - Login admin
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      );
    }

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Set session cookie
    await setAdminSession();

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
    });
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Logout admin
 */
export async function DELETE() {
  try {
    await clearAdminSession();

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}
