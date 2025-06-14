import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Bookmark } from "@/models/bookmark";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/lib/auth";

// Helper function to get user ID from multiple sources
const getUserId = (session: any, request: Request) => {
  // Try to get userId from different locations
  let userId;
  
  // 1. Try from session user.id (NextAuth standard)
  if (session?.user?.id) {
    userId = session.user.id;
  } 
  // 2. Try from JWT sub claim
  else if (session?.user?.sub) {
    userId = session.user.sub;
  }
  // 3. Try from MongoDB _id 
  else if (session?.user?._id) {
    userId = session.user._id;
  }
  // 4. Try headers (backup)
  else if (request.headers.get('X-User-ID')) {
    userId = request.headers.get('X-User-ID');
  }
  // 5. Try from request body (backup)
  else {
    try {
      const contentType = request.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        // This is a clone to avoid consuming the request body that might be needed later
        const clonedRequest = request.clone();
        return clonedRequest.json().then(body => body.userId);
      }
    } catch (error) {
      // Silently fail
    }
  }
  
  // 6. As a last resort, use email as identifier
  if (!userId && session?.user?.email) {
    userId = session.user.email;
  }
  
  return userId;
};

// GET: Retrieve all bookmarks for the current user
export async function GET(request: Request) {
  try {
    // Get user session with dynamic auth options
    const authOptions = await getAuthOptions();
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get userId from session or headers
    const userId = await getUserId(session, request);
    
    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find all bookmarks for this user
    const bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch bookmarks" },
      { status: 500 }
    );
  }
}

// POST: Create a new bookmark
export async function POST(request: Request) {
  try {
    // Get user session with dynamic auth options
    const authOptions = await getAuthOptions();
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { article, category, userId: bodyUserId } = body;

    if (!article || !article.url) {
      return NextResponse.json(
        { message: "Invalid article data" },
        { status: 400 }
      );
    }

    // Get userId from session, headers, or body
    const sessionUserId = await getUserId(session, request);
    const userId = sessionUserId || bodyUserId;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found" },
        { status: 400 }
      );
    }

    // Create a unique article ID from the URL to prevent duplicates
    const articleId = Buffer.from(article.url).toString('base64');

    // Connect to database
    await connectToDatabase();

    // Check if this article is already bookmarked by this user
    const existingBookmark = await Bookmark.findOne({
      userId,
      articleId
    });

    if (existingBookmark) {
      return NextResponse.json(
        { message: "Article already bookmarked", bookmark: existingBookmark },
        { status: 200 }
      );
    }

    // Create new bookmark with explicit userId
    const newBookmark = await Bookmark.create({
      userId,
      articleId,
      title: article.title,
      description: article.description || "",
      url: article.url,
      urlToImage: article.urlToImage || "",
      publishedAt: article.publishedAt,
      source: {
        name: article.source?.name || ""
      },
      category: category || "general"
    });

    return NextResponse.json(
      { message: "Article bookmarked successfully", bookmark: newBookmark },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to bookmark article", error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE: Remove a bookmark
export async function DELETE(request: Request) {
  try {
    // Get user session with dynamic auth options
    const authOptions = await getAuthOptions();
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse URL to get articleId
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get("articleId");

    if (!articleId) {
      return NextResponse.json(
        { message: "Article ID is required" },
        { status: 400 }
      );
    }

    // Get userId from session or headers
    const userId = await getUserId(session, request);
    
    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find and delete the bookmark
    const deletedBookmark = await Bookmark.findOneAndDelete({
      userId,
      articleId
    });

    if (!deletedBookmark) {
      return NextResponse.json(
        { message: "Bookmark not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Bookmark removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to remove bookmark" },
      { status: 500 }
    );
  }
} 