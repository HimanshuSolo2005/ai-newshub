import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const searchParams = request.nextUrl.searchParams;
  const provider = searchParams.get("provider");
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // If user is authenticated, add success parameter
  if (session) {
    const url = new URL(callbackUrl, request.url);
    url.searchParams.set("status", "login_success");
    url.searchParams.set("provider", provider || "");
    return NextResponse.redirect(url);
  }

  // If authentication failed, redirect to homepage
  return NextResponse.redirect(new URL("/", request.url));
} 