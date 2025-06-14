import mongoose, { Schema, models } from "mongoose";

const BookmarkSchema = new Schema(
  {
    userId: { 
      type: String, 
      required: true,
      index: true // Add index for better query performance
    },
    articleId: { 
      type: String,
      required: true 
    },
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String,
      default: ""
    },
    url: { 
      type: String, 
      required: true 
    },
    urlToImage: { 
      type: String,
      default: ""
    },
    publishedAt: { 
      type: String, 
      required: true 
    },
    source: {
      name: { 
        type: String,
        default: ""
      }
    },
    category: {
      type: String,
      default: "general"
    }
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate bookmarks for the same user
BookmarkSchema.index({ userId: 1, articleId: 1 }, { unique: true });

export const Bookmark = models.Bookmark || mongoose.model("Bookmark", BookmarkSchema); 