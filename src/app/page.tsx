"use client";

import React, { useState, useMemo } from "react";
import { useCity } from "@/context/city-context";
import { useAuth } from "@/context/auth-context";
import { CityService } from "@/services/city-service";
import { StoriesRow } from "@/components/domain/stories-row";
import { FeedPostCard } from "@/components/domain/feed-post-card";
import { GroupDealCard } from "@/components/domain/group-deal-card";
import { cn } from "@/lib/utils";
import type { MockPost, MockGroupDeal } from "@/constants/mock-data";

type FeedItem =
  | { type: "post"; data: MockPost }
  | { type: "deal"; data: MockGroupDeal };

export default function HomePage() {
  const { activeCity } = useCity();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");

  const content = useMemo(() => {
    return CityService.getCityContent(activeCity.id);
  }, [activeCity.id]);

  const posts = content.posts || [];
  const deals = content.groupDeals || [];

  // Mixed feed logic: chronological-style interleave
  const mixedFeed: FeedItem[] = useMemo(() => {
    const feed: FeedItem[] = [];
    const maxLength = Math.max(posts.length, deals.length);
    for (let i = 0; i < maxLength; i++) {
      if (posts[i]) feed.push({ type: "post", data: posts[i] });
      if (deals[i]) feed.push({ type: "deal", data: deals[i] });
    }
    return feed;
  }, [posts, deals]);

  const categories = [
    { id: "all", label: "All" },
    { id: "deals", label: "Deals" },
    { id: "communities", label: "Communities" },
    { id: "businesses", label: "Local" },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. StoriesRow component */}
      <div className="pt-2 pb-1 border-b border-gray-100">
        <StoriesRow />
      </div>

      {/* 2. Visible h1 */}
      <h1 className="text-base font-semibold px-4 py-3 text-gray-900">
        What's happening in {activeCity.name}
      </h1>

      {/* 5. Subtle category filter (horizontal pill scroll) */}
      <div className="px-4 pb-2 border-b border-gray-50 flex gap-2 overflow-x-auto no-scrollbar">
        {categories.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
              activeCategory === tab.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-white text-gray-600 border-gray-200"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Section heading */}
      <div className="px-4 mt-4 mb-2">
        <h2 className="text-sm font-bold text-muted-foreground">
          Featured Collective Demand in {activeCity.name}
        </h2>
      </div>

      {/* 4. Social feed mixing posts and deals chronologically */}
      <div className="flex flex-col gap-y-4 px-0 sm:px-4">
        {activeCategory === "all" &&
          mixedFeed.map((item, idx) => (
            <div key={idx} className="border-b border-gray-100 pb-4 sm:border-0 sm:pb-0">
              {item.type === "post" ? (
                <FeedPostCard post={item.data} />
              ) : (
                <GroupDealCard deal={item.data} />
              )}
            </div>
          ))}
        {activeCategory === "deals" &&
          deals.map((deal) => (
            <div key={deal.id} className="border-b border-gray-100 pb-4 sm:border-0 sm:pb-0">
              <GroupDealCard deal={deal} />
            </div>
          ))}
        {activeCategory !== "all" && activeCategory !== "deals" && (
          <div className="px-4 py-8 text-center text-sm text-gray-500">
            Check back later for more updates.
          </div>
        )}
      </div>
    </div>
  );
}
