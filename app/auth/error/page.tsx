"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const provider = searchParams.get("provider");

  useEffect(() => {
    if (error === "duplicate_email") {
      toast.error(
        `This email is already associated with a different account. Please use a different email or sign in with your original provider.`,
        {
          duration: 6000,
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        }
      );
    }
  }, [error]);

  const getErrorMessage = () => {
    switch (error) {
      case "duplicate_email":
        return `This email is already registered with a different provider. You attempted to sign in with ${provider}, but this email is already linked to another account.`;
      case "Callback":
        return "There was an error during the authentication process. This could be due to denied permissions or a configuration issue.";
      case "OAuthSignin":
        return "Error occurred while attempting to sign in with the OAuth provider.";
      case "OAuthCallback":
        return "Error occurred during OAuth callback.";
      case "OAuthCreateAccount":
        return "Error creating OAuth account.";
      case "EmailCreateAccount":
        return "Error creating email account.";
      case "SessionRequired":
        return "This page requires authentication. Please sign in to access this page.";
      default:
        return "An unexpected authentication error occurred. Please try again later.";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Authentication Error</CardTitle>
          <CardDescription className="text-muted-foreground">
            There was a problem with your sign-in attempt
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-md border border-red-200 dark:border-red-900">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-red-800 dark:text-red-300">{getErrorMessage()}</p>
            </div>
          </div>
          {error === "duplicate_email" && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Options:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 space-y-1">
                <li>Sign in with your original provider</li>
                <li>Use a different email address with this provider</li>
                <li>Contact support if you believe this is an error</li>
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            className="w-full" 
            onClick={() => router.push("/auth/signin")}
          >
            Return to Sign In
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 