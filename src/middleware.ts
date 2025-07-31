import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // This is a simplified check as requested.
  // It verifies that the secret key is defined in the server's environment.
  if (process.env.ADMIN_SECRET_KEY) {
    // If the key exists on the server, allow access to the admin route.
    return NextResponse.next();
  }

  // If the key is not configured on the server at all, block access
  // to prevent running in an insecure state.
  return new NextResponse('Unauthorized: Admin access is not configured on the server.', {
    status: 401,
  });
}

export const config = {
  // This matcher ensures the middleware runs on all requests to /admin or any of its sub-paths
  matcher: '/admin/:path*',
};
