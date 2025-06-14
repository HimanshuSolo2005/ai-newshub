"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { useState } from "react";

interface AuthProvidersProps {
  callbackUrl?: string;
}

export function AuthProviders({ callbackUrl = "/" }: AuthProvidersProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: string) => {
    try {
      setIsLoading(provider);      await signIn(provider, { 
        callbackUrl
      });
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <Button
        className="w-full relative"
        onClick={() => handleSignIn("github")}
        disabled={isLoading !== null}
      >
        <Github className="mr-2 h-4 w-4" />
        {isLoading === "github" ? "Signing in..." : "Sign in with GitHub"}
      </Button>
      <Button
        className="w-full relative"
        onClick={() => handleSignIn("google")}
        disabled={isLoading !== null}
      >
        <Mail className="mr-2 h-4 w-4" />
        {isLoading === "google" ? "Signing in..." : "Sign in with Google"}
      </Button>
    </div>
  );
} 