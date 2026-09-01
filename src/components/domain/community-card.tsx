"use client";

import * as React from "react";
import { Users, Lock, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CommunityCardProps {
  community: {
    id: string;
    name: string;
    slug: string;
    description: string;
    is_private: boolean;
    memberCountFormatted: string;
    recentActivity?: string;
  };
  onJoin?: (communityId: string) => void;
}

export function CommunityCard({ community, onJoin }: CommunityCardProps) {
  const [joined, setJoined] = React.useState(false);

  const handleJoin = () => {
    setJoined(true);
    if (onJoin) onJoin(community.id);
  };

  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-3.5 mb-3">
        {/* Avatar/Icon */}
        <div className="h-12 w-12 shrink-0 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
          {community.is_private ? <Lock className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
        </div>
        
        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-foreground leading-tight truncate">
                {community.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                <Users className="h-3.5 w-3.5" />
                <span>{community.memberCountFormatted} members</span>
                {community.is_private && (
                  <>
                    <span>·</span>
                    <span className="text-secondary font-medium">Private</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
        {community.description}
      </p>

      {/* Footer / Action */}
      <div className="pt-3 border-t border-gray-50 flex items-center justify-between gap-3 mt-auto">
        <div className="text-xs text-muted-foreground font-medium truncate">
          {community.recentActivity ? community.recentActivity : (community.is_private ? "Requires verification" : "Open community")}
        </div>

        <button
          onClick={handleJoin}
          disabled={joined}
          className={cn(
            "flex items-center gap-1.5 shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-colors",
            joined
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-secondary text-white hover:bg-secondary/90"
          )}
        >
          {joined ? (
            <>
              <CheckCircle2 className="h-4 w-4" /> Joined
            </>
          ) : (
            <>
              {community.is_private ? "Request" : "Join"} <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
