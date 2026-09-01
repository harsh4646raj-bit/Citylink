"use client";

import * as React from "react";
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  MapPin, 
  CheckCircle2 
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeedPostCardProps {
  post: {
    id: string;
    content: string;
    category: string;
    created_at: string;
    author: {
      fullName: string;
      username: string;
      avatarUrl?: string;
      locality: string;
      isVerified?: boolean;
    };
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
    isLiked?: boolean;
    isSaved?: boolean;
    imageUrl?: string;
  };
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
  onSave?: (id: string) => void;
}

export function FeedPostCard({ post, onLike, onComment, onShare, onSave }: FeedPostCardProps) {
  const [isLiked, setIsLiked] = React.useState(post.isLiked ?? false);
  const [likesCount, setLikesCount] = React.useState(post.likesCount);
  const [isSaved, setIsSaved] = React.useState(post.isSaved ?? false);

  const toggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
    if (onLike) onLike(post.id);
  };

  const toggleSave = () => {
    setIsSaved((prev) => !prev);
    if (onSave) onSave(post.id);
  };

  const getTimeAgo = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      if (diffMinutes < 60) return `${Math.max(1, diffMinutes)}m`;
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours}h`;
      return `${Math.floor(diffHours / 24)}d`;
    } catch {
      return "2h";
    }
  };

  return (
    <div className="w-full bg-white sm:max-w-xl sm:mx-auto sm:border sm:border-gray-100 sm:rounded-sm pb-1">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 overflow-hidden">
            {post.author.avatarUrl ? (
              <img src={post.author.avatarUrl} alt={post.author.fullName} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold text-sm">
                {post.author.fullName.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm text-foreground">{post.author.fullName}</span>
              {post.author.isVerified && (
                <CheckCircle2 className="h-4 w-4 text-primary fill-primary/10" />
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{post.author.locality}</span>
              <span>·</span>
              <span>{getTimeAgo(post.created_at)}</span>
            </div>
          </div>
        </div>
        <button className="p-2 -mr-2 text-foreground/80 hover:text-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Image Area */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 my-2 flex items-center justify-center overflow-hidden sm:rounded-sm">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt="Post image" className="h-full w-full object-cover" />
        ) : (
          <div className="text-gray-400 text-sm font-medium">Image Placeholder</div>
        )}
        <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-medium px-2 py-1 rounded-full">
          1/4
        </div>
      </div>

      {/* Engagement Bar */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <button onClick={toggleLike} className="flex items-center gap-1.5 group">
            <Heart className={cn("h-6 w-6 transition-transform group-active:scale-90", isLiked && "fill-red-500 text-red-500")} />
            <span className="text-sm font-semibold">{likesCount}</span>
          </button>
          <button onClick={() => onComment && onComment(post.id)} className="flex items-center gap-1.5 group">
            <MessageCircle className="h-6 w-6 transition-transform group-active:scale-90" />
            <span className="text-sm font-semibold">{post.commentsCount}</span>
          </button>
          <button onClick={() => onShare && onShare(post.id)} className="flex items-center gap-1.5 group">
            <Send className="h-6 w-6 transition-transform group-active:scale-90" />
            <span className="text-sm font-semibold">{post.sharesCount}</span>
          </button>
        </div>
        <button onClick={toggleSave} className="group">
          <Bookmark className={cn("h-6 w-6 transition-transform group-active:scale-90", isSaved && "fill-foreground text-foreground")} />
        </button>
      </div>

      {/* Caption & Comments */}
      <div className="px-4 pb-3 space-y-1">
        <p className="text-sm text-foreground line-clamp-2">
          <span className="font-bold mr-1.5">{post.author.fullName}</span>
          {post.content}
        </p>
        
        {post.commentsCount > 0 && (
          <button onClick={() => onComment && onComment(post.id)} className="text-sm text-muted-foreground block mt-1 hover:underline cursor-pointer">
            View all {post.commentsCount} comments
          </button>
        )}
        
        <div className="text-[11px] text-muted-foreground uppercase tracking-wide mt-1.5">
          {getTimeAgo(post.created_at)} ago
        </div>
      </div>

      <div className="border-b border-gray-100 sm:hidden"></div>
    </div>
  );
}
