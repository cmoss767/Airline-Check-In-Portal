import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/unauthorized') {
    return NextResponse.next();
  }

  // This is a simplified check as requested.
  // It verifies that the secret key is defined in the server's environment.
  if (process.env.ADMIN_SECRET_KEY) {
    // If the key exists on the server, allow access to the admin route.
    return NextResponse.next();
  }

  // If the key is not configured on the server, redirect to an
  // informational page explaining that admin functionality is disabled.
  const unauthorizedUrl = request.nextUrl.clone();
  unauthorizedUrl.pathname = '/admin/unauthorized';
  return NextResponse.redirect(unauthorizedUrl);
}

export const config = {
  // This matcher ensures the middleware runs on all requests to /admin or any of its sub-paths
  matcher: '/admin/:path*',
};
