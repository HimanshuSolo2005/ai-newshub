"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface RouteGuardProps {
  children: React.ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  
  // Protected routes that require authentication
  const protectedRoutes = ['/news'];
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname?.startsWith(`${route}/`)
  );

  useEffect(() => {
    // Don't do anything if we're still loading the session
    if (status === "loading") {
      return;
    }
    
    if (isProtectedRoute && status === "unauthenticated") {
      // Redirect to signin page if user is not authenticated
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname || '/')}`);
    } else {
      // User is either authenticated or route doesn't need protection
      setLoading(false);
    }
  }, [status, router, pathname, isProtectedRoute]);

  // Show loading spinner while checking authentication
  if ((status === "loading" || loading) && isProtectedRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If we're on a protected route and the user is authenticated, or if the route doesn't need protection
  return <>{children}</>;
} 