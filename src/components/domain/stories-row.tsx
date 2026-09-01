"use client";

import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { useCity } from "@/context/city-context";
import { useOptionalAuth } from "@/context/auth-context";
import { MOCK_COMMUNITIES } from "@/constants/mock-data";
import { Plus } from "lucide-react";

export function StoriesRow() {
  const { activeCity } = useCity();
  const auth = useOptionalAuth();
  const profile = auth?.profile;
  
  const communities = MOCK_COMMUNITIES.slice(0, 3);
  
  return (
    <div className="w-full bg-white">
      <div className="flex overflow-x-auto no-scrollbar gap-4 px-4 py-3">
        {/* Your Story */}
        <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
          <div className="relative">
            <Avatar 
              fallbackText={profile?.full_name || profile?.name || "User"} 
              className="w-16 h-16 border-2 border-transparent" 
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white">
              <Plus className="w-3 h-3" />
            </div>
          </div>
          <span className="text-[11px] text-center truncate max-w-[72px] text-gray-500">
            Your story
          </span>
        </div>
        
        {/* City LIVE */}
        <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
          <div className="relative stories-ring p-[2px]">
            <Avatar 
              fallbackText={activeCity?.name || "City"} 
              className="w-16 h-16 border-2 border-white"
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 rounded text-white text-[8px] font-bold px-1 py-0.5 border border-white z-10">
              LIVE
            </div>
          </div>
          <span className="text-[11px] text-center truncate max-w-[72px] text-foreground mt-1">
            {activeCity?.name || "City"}
          </span>
        </div>

        {/* Communities */}
        {communities.map((community) => (
          <div key={community.id} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
            <div className="stories-ring p-[2px]">
              <Avatar 
                fallbackText={community.name} 
                className="w-16 h-16 border-2 border-white"
              />
            </div>
            <span className="text-[11px] text-center truncate max-w-[72px] text-foreground">
              {community.name}
            </span>
          </div>
        ))}
        
        {/* Local Businesses */}
        <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
          <div className="stories-ring p-[2px]">
            <Avatar 
              fallbackText="LB" 
              className="w-16 h-16 border-2 border-white"
            />
          </div>
          <span className="text-[11px] text-center truncate max-w-[72px] text-foreground">
            Local Businesses
          </span>
        </div>
      </div>
    </div>
  );
}
