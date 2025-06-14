"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function UserAuthToast() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const provider = searchParams.get("provider");
  const router = useRouter();

  useEffect(() => {
    // Handle success scenarios
    if (status === "login_success") {
      toast.success("Successfully signed in!", {
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      });
      
      // Remove query parameters from URL after showing toast
      const newUrl = window.location.pathname;
      router.replace(newUrl);
    }
    
    // Handle error scenarios
    if (status === "duplicate_email") {
      toast.error(
        `This email is already registered with another provider. Please use your original provider or a different email.`,
        {
          duration: 6000,
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        }
      );
      
      // Remove query parameters from URL after showing toast
      const newUrl = window.location.pathname;
      router.replace(newUrl);
    }
  }, [status, router, provider]);

  // This component doesn't render anything
  return null;
} 