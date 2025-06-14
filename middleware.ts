import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// List of protected routes that require authentication
const protectedRoutes = ['/news'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the current path is in the protected routes
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  if (isProtectedRoute) {
    // Get the user token from the session
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    // If the user is not authenticated, redirect to the sign-in page
    if (!token) {
      const url = new URL('/auth/signin', request.url);
      // Add the original URL as callbackUrl to redirect after login
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    // Apply to all paths except static files, api routes, and auth routes
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}; 