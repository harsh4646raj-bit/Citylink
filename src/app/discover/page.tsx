"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCity } from "@/context/city-context";
import { CityService } from "@/services/city-service";
import { Input } from "@/components/ui/input";
import { GroupDealCard } from "@/components/domain/group-deal-card";
import { CommunityCard } from "@/components/domain/community-card";
import { BusinessCard } from "@/components/domain/business-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Search, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

function DiscoverView() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams?.get("filter") || "all";

  const { activeCity } = useCity();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialFilter);

  const content = useMemo(() => {
    return CityService.getCityContent(activeCity.id);
  }, [activeCity.id]);

  const cleanQuery = query.toLowerCase().trim();

  // Search filtering
  const filteredDeals = useMemo(() => {
    if (!cleanQuery) return content.groupDeals;
    return content.groupDeals.filter(
      (deal) =>
        deal.title.toLowerCase().includes(cleanQuery) ||
        deal.description.toLowerCase().includes(cleanQuery) ||
        deal.localityName.toLowerCase().includes(cleanQuery) ||
        deal.category.toLowerCase().includes(cleanQuery) ||
        (deal.vendorName && deal.vendorName.toLowerCase().includes(cleanQuery))
    );
  }, [content.groupDeals, cleanQuery]);

  const filteredCommunities = useMemo(() => {
    if (!cleanQuery) return content.communities;
    return content.communities.filter(
      (comm) =>
        comm.name.toLowerCase().includes(cleanQuery) ||
        comm.description.toLowerCase().includes(cleanQuery)
    );
  }, [content.communities, cleanQuery]);

  const filteredBusinesses = useMemo(() => {
    if (!cleanQuery) return content.businesses;
    return content.businesses.filter(
      (biz) =>
        biz.name.toLowerCase().includes(cleanQuery) ||
        biz.description.toLowerCase().includes(cleanQuery) ||
        biz.category.toLowerCase().includes(cleanQuery) ||
        biz.localityName.toLowerCase().includes(cleanQuery)
    );
  }, [content.businesses, cleanQuery]);

  const hasAnyResults =
    (selectedCategory === "all" &&
      (filteredDeals.length > 0 ||
        filteredCommunities.length > 0 ||
        filteredBusinesses.length > 0)) ||
    (selectedCategory === "deals" && filteredDeals.length > 0) ||
    (selectedCategory === "communities" && filteredCommunities.length > 0) ||
    (selectedCategory === "businesses" && filteredBusinesses.length > 0);

  const categories = [
    { id: "all", label: "All" },
    { id: "deals", label: "Group Deals" },
    { id: "communities", label: "Communities" },
    { id: "businesses", label: "Local Businesses" },
  ];

  return (
    <div className="bg-white min-h-screen pb-20 pt-4 px-4 sm:px-6">
      {/* Search Header */}
      <div className="mb-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Discover {activeCity.name}
        </h1>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder={`Search deals, communities, shops in ${activeCity.name}...`}
            className="pl-10 h-12 w-full bg-gray-50 border-gray-100 focus:border-primary focus:bg-white transition-colors rounded-xl shadow-2xs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 border",
              selectedCategory === cat.id
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results / Content */}
      {hasAnyResults ? (
        <div className="space-y-6">
          {(selectedCategory === "all" || selectedCategory === "deals") && filteredDeals.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">Group Deals</h2>
                <span className="text-xs text-muted-foreground font-semibold">{filteredDeals.length} active</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDeals.map((deal) => (
                  <GroupDealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          )}

          {(selectedCategory === "all" || selectedCategory === "communities") && filteredCommunities.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">Communities & Societies</h2>
                <span className="text-xs text-muted-foreground font-semibold">{filteredCommunities.length} groups</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCommunities.map((community) => (
                  <CommunityCard key={community.id} community={community} />
                ))}
              </div>
            </div>
          )}

          {(selectedCategory === "all" || selectedCategory === "businesses") && filteredBusinesses.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">Verified Local Businesses</h2>
                <span className="text-xs text-muted-foreground font-semibold">{filteredBusinesses.length} verified</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          icon={<Compass className="h-6 w-6" />}
          title={`No results found in ${activeCity.name}`}
          description={`We couldn't find any deals, communities, or businesses matching "${query}". Try searching another keyword.`}
          actionLabel="Clear Search"
          onAction={() => {
            setQuery("");
            setSelectedCategory("all");
          }}
        />
      )}
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="bg-white min-h-screen pt-12 text-center text-gray-400">Loading...</div>}>
      <DiscoverView />
    </Suspense>
  );
}
