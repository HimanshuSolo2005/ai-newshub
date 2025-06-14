import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";

// Import the authOptions directly from the route file
export const getAuthOptions = async (): Promise<NextAuthOptions> => {
  const { authOptions } = await import("@/app/api/auth/[...nextauth]/route");
  return authOptions;
}

// Helper function to get the auth session
export async function getAuthSession() {
  const authOptions = await getAuthOptions();
  return getServerSession(authOptions);
} 