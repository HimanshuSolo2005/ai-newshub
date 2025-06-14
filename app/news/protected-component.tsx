"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

interface ProtectedComponentProps {
  children: React.ReactNode;
}

export function ProtectedComponent({ children }: ProtectedComponentProps) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null; // RouteGuard will handle loading state
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card border border-border rounded-lg shadow-sm p-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <h2 className="text-2xl font-semibold">Authentication Required</h2>
            <p className="text-muted-foreground">
              You need to be signed in to access the news section.
            </p>
            <div className="flex space-x-4 mt-4">
              <Button 
                variant="default" 
                onClick={() => router.push("/auth/signin?callbackUrl=/news")}
              >
                Sign In
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push("/")}
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated, render the children
  return <>{children}</>;
} 