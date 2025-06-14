"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { ProtectedComponent } from "../news/protected-component";
import {
  BookmarkIcon,
  ClockIcon,
  ChevronRightIcon,
  TagIcon,
  EyeIcon,
  AlertCircleIcon,
  SearchIcon,
  NewspaperIcon,
  TrashIcon,
  ArrowLeftIcon,
  SparklesIcon
} from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BookmarkedArticle {
  _id: string;
  articleId: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category: string;
  createdAt: string;
}

// Import the category colors from the news page to maintain consistency
const categoryColors: Record<string, { bg: string, text: string, darkBg: string, darkText: string }> = {
  general: { bg: "bg-gray-100", text: "text-gray-800", darkBg: "dark:bg-gray-800", darkText: "dark:text-gray-200" },
  business: { bg: "bg-blue-100", text: "text-blue-800", darkBg: "dark:bg-blue-900", darkText: "dark:text-blue-300" },
  technology: { bg: "bg-purple-100", text: "text-purple-800", darkBg: "dark:bg-purple-900", darkText: "dark:text-purple-300" },
  entertainment: { bg: "bg-pink-100", text: "text-pink-800", darkBg: "dark:bg-pink-900", darkText: "dark:text-pink-300" },
  sports: { bg: "bg-green-100", text: "text-green-800", darkBg: "dark:bg-green-900", darkText: "dark:text-green-300" },
  science: { bg: "bg-indigo-100", text: "text-indigo-800", darkBg: "dark:bg-indigo-900", darkText: "dark:text-indigo-300" },
  health: { bg: "bg-red-100", text: "text-red-800", darkBg: "dark:bg-red-900", darkText: "dark:text-red-300" },
};

// Interface for summary state
interface SummaryState {
  articleIndex: number | null;
  loading: boolean;
  content: string | null;
  error: string | null;
}

export default function SavedArticlesPage() {
  const { data: session } = useSession();
  const [bookmarkedArticles, setBookmarkedArticles] = useState<BookmarkedArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<BookmarkedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  
  // Add summary state
  const [summaryState, setSummaryState] = useState<SummaryState>({
    articleIndex: null,
    loading: false,
    content: null,
    error: null
  });
  
  // Dialog state for summary modal
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/bookmarks');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch bookmarks: ${response.status}`);
        }
        
        const data = await response.json();
        setBookmarkedArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (session?.user) {
      fetchBookmarks();
    }
  }, [session]);

  // Filter articles when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredArticles(bookmarkedArticles);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = bookmarkedArticles.filter(article => 
        article.title.toLowerCase().includes(query) || 
        (article.description && article.description.toLowerCase().includes(query))
      );
      setFilteredArticles(filtered);
    }
  }, [searchQuery, bookmarkedArticles]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const removeBookmark = async (articleId: string) => {
    setDeleteLoading(articleId);
    
    try {
      const response = await fetch(`/api/bookmarks?articleId=${articleId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove bookmark');
      }
      
      setBookmarkedArticles(prev => prev.filter(article => article.articleId !== articleId));
      toast.success('Article removed from bookmarks');
    } catch (error) {
      toast.error('Failed to remove bookmark');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Loading skeletons for articles
  const ArticleSkeleton = () => (
    <Card className="border border-border overflow-hidden transition-all">
      <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-6 w-full mb-1" />
        <Skeleton className="h-6 w-4/5" />
      </CardHeader>
      <CardContent className="pt-2">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <div className="flex justify-between">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );

  // Fix the generateSummary function to use the appropriate API endpoint
  const generateSummary = async (article: BookmarkedArticle, index: number) => {
    setSummaryState({
      articleIndex: index,
      loading: true,
      content: null,
      error: null
    });
    
    setDialogOpen(true);
    
    try {
      const prompt = `
        Generate a concise and informative summary of this news article.
        Title: ${article.title}
        Content: ${article.description || "No description available"}
        Source: ${article.source.name}
        
        Format the summary with these sections:
        # Key Points
        - (bullet points of the most important information)
        
        ## Context
        (brief background context for the news)
        
        ## Impact
        (potential implications or why this matters)
      `;
      
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          maxTokens: 500
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }
      
      const data = await response.json();
      
      setSummaryState({
        articleIndex: index,
        loading: false,
        content: data.summary,
        error: null
      });
    } catch (error) {
      setSummaryState({
        articleIndex: index,
        loading: false,
        content: null,
        error: 'Failed to generate summary. Please try again.'
      });
    }
  };
  
  // Format the summary content with enhanced Markdown styling
  const formatSummaryContent = (content: string) => {
    if (!content) return null;
    
    // Replace Markdown headers and elements with styled components
    const formattedContent = content
      .split('\n')
      .map((line, i) => {
        // Main title
        if (line.startsWith('# ')) {
          return (
            <h2 key={i} className="text-2xl font-bold mt-4 mb-4 text-primary">
              {line.substring(2)}
            </h2>
          );
        } 
        // Section titles
        else if (line.startsWith('## ')) {
          return (
            <div key={i} className="flex items-center mt-6 mb-3">
              <div className="w-1.5 h-6 bg-primary rounded-full mr-2"></div>
              <h3 className="text-xl font-semibold text-foreground">
                {line.substring(3)}
              </h3>
            </div>
          );
        } 
        // Subheadings
        else if (line.startsWith('### ')) {
          return (
            <h4 key={i} className="text-lg font-medium mt-3 mb-2 text-foreground/90">
              {line.substring(4)}
            </h4>
          );
        } 
        // Bullet points
        else if (line.startsWith('- ')) {
          return (
            <div key={i} className="flex items-start my-1">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></div>
              <p>{line.substring(2)}</p>
            </div>
          );
        } else if (line.trim() === '') {
          return <div key={i} className="h-2"></div>;
        } else {
          return <p key={i} className="my-2">{line}</p>;
        }
      });
      
    return <div className="space-y-1">{formattedContent}</div>;
  };
  
  // Loading skeleton for summary
  const SummarySkeleton = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-2/3" />
        <div className="flex gap-2 items-start">
          <Skeleton className="h-2 w-2 rounded-full mt-2" />
          <Skeleton className="h-5 w-full" />
        </div>
        <div className="flex gap-2 items-start">
          <Skeleton className="h-2 w-2 rounded-full mt-2" />
          <Skeleton className="h-5 w-full" />
        </div>
        <div className="flex gap-2 items-start">
          <Skeleton className="h-2 w-2 rounded-full mt-2" />
          <Skeleton className="h-5 w-4/5" />
        </div>
      </div>
      <Skeleton className="h-6 w-1/3 mt-4" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-6 w-1/3 mt-4" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-3/4" />
    </div>
  );

  return (
    <ProtectedComponent>
      <motion.div 
        className="container mx-auto py-8 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex items-center mb-6">
          <Link href="/news">
            <Button variant="ghost" size="sm" className="mr-3">
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              <span>Back to News</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-semibold">Saved Articles</h1>
        </div>
        
        <div className="mb-10 text-center">
          <motion.h2 
            className="text-4xl font-semibold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your Bookmarked News
          </motion.h2>
          <div className="flex flex-wrap justify-center mb-4 space-x-2">
            {!isLoading && !error && (
              <Badge className="bg-primary text-white text-sm px-3 py-1 mb-2 pointer-events-none">
                <BookmarkIcon className="w-4 h-4 mr-1" />
                {filteredArticles.length} Saved Articles
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            Access your collection of saved articles for future reference.
          </p>

          <motion.div 
            className="max-w-md mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search in saved articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border-primary/20 focus:border-primary"
              />
            </div>
          </motion.div>
        </div>

        {error && (
          <motion.div 
            className="text-center p-8 mb-8 bg-red-50 dark:bg-red-900/20 rounded-lg max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AlertCircleIcon className="h-10 w-10 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-red-800 dark:text-red-300 mb-2">Unable to load bookmarks</h3>
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <Button 
              onClick={() => {
                setIsLoading(true);
                setError(null);
                // Retry fetching bookmarks
                fetch('/api/bookmarks')
                  .then(res => res.json())
                  .then(data => {
                    setBookmarkedArticles(data);
                    setFilteredArticles(data);
                    setIsLoading(false);
                  })
                  .catch(err => {
                    console.error(err);
                    setError('Failed to fetch bookmarks');
                    setIsLoading(false);
                  });
              }}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Try Again
            </Button>
          </motion.div>
        )}

        {!error && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              // Show skeletons while loading
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <ArticleSkeleton />
                </motion.div>
              ))
            ) : filteredArticles.length === 0 ? (
              // Show empty state when no bookmarks or no matches for search
              <motion.div 
                className="col-span-full text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <BookmarkIcon className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {searchQuery ? "No matching bookmarks found" : "No saved articles yet"}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {searchQuery 
                    ? "Try adjusting your search query" 
                    : "Bookmark articles from the news page to see them here"}
                </p>
                {searchQuery ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery("")}
                  >
                    Clear Search
                  </Button>
                ) : (
                  <Link href="/news">
                    <Button className="bg-primary hover:bg-primary/90">
                      Browse News
                    </Button>
                  </Link>
                )}
              </motion.div>
            ) : (
              // Show bookmarked articles
              filteredArticles.map((article, index) => (
                <motion.div 
                  key={article._id}
                  variants={fadeIn}
                >
                  <Card className="border border-border overflow-hidden transition-all hover:shadow-md group">
                    {article.urlToImage ? (
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className={`${categoryColors[article.category]?.bg || categoryColors.general.bg} ${categoryColors[article.category]?.text || categoryColors.general.text} ${categoryColors[article.category]?.darkBg || categoryColors.general.darkBg} ${categoryColors[article.category]?.darkText || categoryColors.general.darkText} pointer-events-none`}>
                            {article.category || "general"}
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800 relative">
                        <NewspaperIcon className="h-12 w-12 text-gray-400" />
                        <div className="absolute top-2 right-2">
                          <Badge className={`${categoryColors[article.category]?.bg || categoryColors.general.bg} ${categoryColors[article.category]?.text || categoryColors.general.text} ${categoryColors[article.category]?.darkBg || categoryColors.general.darkBg} ${categoryColors[article.category]?.darkText || categoryColors.general.darkText} pointer-events-none`}>
                            {article.category || "general"}
                          </Badge>
                        </div>
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex items-center text-sm text-muted-foreground mb-2 flex-wrap gap-2">
                        <Badge variant="outline" className="flex items-center bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800 pointer-events-none">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {formatDate(article.publishedAt)}
                        </Badge>
                        {article.source.name && (
                          <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 pointer-events-none">
                            {article.source.name}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl leading-tight font-semibold line-clamp-2">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {article.description || "No description available"}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary font-medium hover:underline group"
                        >
                          Read article 
                          <ChevronRightIcon className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>

                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => generateSummary(article, index)}
                            disabled={summaryState.loading && summaryState.articleIndex === index}
                            className="text-indigo-600 hover:text-indigo-700 border-indigo-200 hover:border-indigo-300 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300"
                          >
                            {summaryState.loading && summaryState.articleIndex === index ? (
                              <span className="animate-pulse">Summarizing...</span>
                            ) : (
                              <>
                                <SparklesIcon className="h-4 w-4 mr-1" />
                                <span>AI Summary</span>
                              </>
                            )}
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 hover:text-white hover:bg-red-500 transition-colors border-red-200 hover:border-red-500"
                                disabled={deleteLoading === article.articleId}
                              >
                                {deleteLoading === article.articleId ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                                ) : (
                                  <TrashIcon className="h-4 w-4" />
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove from bookmarks?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove this article from your bookmarks? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-red-500 hover:bg-red-600"
                                  onClick={() => removeBookmark(article.articleId)}
                                >
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </motion.div>
      
      {/* AI Summary Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <SparklesIcon className="h-5 w-5 text-primary mr-2" />
              AI-Generated Summary
            </DialogTitle>
            <DialogDescription>
              A concise summary of the article generated by AI.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {summaryState.loading && <SummarySkeleton />}
            
            {summaryState.error && (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-center">
                <AlertCircleIcon className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-600 dark:text-red-400">{summaryState.error}</p>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Retry generating summary
                    if (summaryState.articleIndex !== null) {
                      generateSummary(filteredArticles[summaryState.articleIndex], summaryState.articleIndex);
                    }
                  }}
                  className="mt-3"
                >
                  Try Again
                </Button>
              </div>
            )}
            
            {!summaryState.loading && !summaryState.error && summaryState.content && (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {formatSummaryContent(summaryState.content)}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </ProtectedComponent>
  );
} 