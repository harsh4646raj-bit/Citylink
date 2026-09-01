"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CityService } from "@/services/city-service";
import { GroupDealCard } from "@/components/domain/group-deal-card";
import { CommunityCard } from "@/components/domain/community-card";
import type { City } from "@/types/database";

interface CityLandingViewProps {
  city: City;
}

export function CityLandingView({ city }: CityLandingViewProps) {
  const cityName = city.name;
  const content = CityService.getCityContent(city.id);
  const hasDeals = content.groupDeals.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* City Header */}
      <div className="px-4 pt-6 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">{cityName} City Hub</h1>
        {cityName.toLowerCase() === "muzaffarpur" && (
          <span className="inline-block mt-2 px-2.5 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full">
            Pilot Launch City
          </span>
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          Explore communities, Group Deals, businesses, and marketplace in {cityName}, {city.state}.
        </p>
      </div>

      {/* City Stats */}
      <div className="flex gap-6 px-4 py-4 border-b border-gray-100">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{content.groupDeals.length}</div>
          <div className="text-xs text-muted-foreground">Active Deals</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{content.communities.length}</div>
          <div className="text-xs text-muted-foreground">Communities</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{content.businesses.length}</div>
          <div className="text-xs text-muted-foreground">Businesses</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{content.posts.length}</div>
          <div className="text-xs text-muted-foreground">Posts</div>
        </div>
      </div>

      {/* Group Deals Section */}
      <div className="px-4 pt-6 pb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Group Deals in {cityName}</h2>
        {hasDeals ? (
          <div className="space-y-2">
            {content.groupDeals.map((deal) => (
              <GroupDealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 py-8 text-center">
            No active Group Deals in {cityName} yet
          </p>
        )}
      </div>

      {/* Communities Section */}
      <div className="px-4 py-4 border-t border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Communities in {cityName}</h2>
        {content.communities.length > 0 ? (
          <div className="space-y-3">
            {content.communities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 py-4 text-center">
            No communities in {cityName} yet.
          </p>
        )}
      </div>
    </div>
  );
}
