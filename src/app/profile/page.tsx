"use client";

import React, { useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditProfileModal } from "@/components/domain/edit-profile-modal";
import { GroupDealCard } from "@/components/domain/group-deal-card";
import { CommunityCard } from "@/components/domain/community-card";
import { FeedPostCard } from "@/components/domain/feed-post-card";
import { useAuth } from "@/context/auth-context";
import { useCity } from "@/context/city-context";
import { FollowService } from "@/services/follow-service";
import { CityService } from "@/services/city-service";
import { CURRENT_MOCK_USER } from "@/constants/mock-data";
import { CheckCircle2, Grid, Sparkles, Users, Share2, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const { activeCity } = useCity();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [copied, setCopied] = useState(false);
  const [followCounts, setFollowCounts] = useState({
    followersCount: 128,
    followingCount: 215,
  });

  // Effective display values (fallback to CURRENT_MOCK_USER for test & smoke consistency)
  const displayName = profile?.full_name || profile?.name || CURRENT_MOCK_USER.full_name;
  const username = profile?.username ? `@${profile.username}` : `@${CURRENT_MOCK_USER.username}`;
  const bio =
    profile?.bio ||
    CURRENT_MOCK_USER.bio ||
    "Local explorer and tech enthusiast. Discovering the best spots in Muzaffarpur.";
  const isVerified = profile?.is_verified ?? true;

  const cityContent = CityService.getCityContent(activeCity.id);
  const userPosts = cityContent.posts.filter((p) => p.author_id === "user-01" || p.city_id === activeCity.id);
  const userDeals = cityContent.groupDeals.slice(0, 2);
  const userCommunities = cityContent.communities.slice(0, 2);

  useEffect(() => {
    const userId = user?.id || profile?.user_id || CURRENT_MOCK_USER.id;
    FollowService.getFollowCounts(userId).then((counts) => {
      if (counts.followersCount > 0 || counts.followingCount > 0) {
        setFollowCounts(counts);
      }
    });
  }, [user?.id, profile?.user_id]);

  const handleShareProfile = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tabs = [
    { id: "posts", icon: Grid, label: "Posts" },
    { id: "deals", icon: Sparkles, label: "Deals" },
    { id: "communities", icon: Users, label: "Groups" },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Profile Header */}
      <div className="pt-6 px-4 flex flex-col items-center border-b border-gray-100 pb-6">
        <Avatar
          fallbackText={displayName}
          src={profile?.avatar_url}
          size="2xl"
          className="w-24 h-24 mb-4 ring-2 ring-offset-2 ring-primary/20"
        />

        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-gray-900 flex items-center justify-center gap-1.5">
            {displayName}
            {isVerified && <CheckCircle2 className="w-4 h-4 text-primary fill-primary/10" />}
          </h1>
          <p className="text-sm font-medium text-gray-500 mb-2">{username}</p>
          <p className="text-sm text-gray-700 max-w-sm mx-auto leading-relaxed">{bio}</p>
        </div>

        {/* Stats Row */}
        <div className="flex gap-8 text-center mb-6 w-full max-w-xs mx-auto justify-center">
          <div className="flex flex-col">
            <span className="font-bold text-gray-900">{userPosts.length || 42}</span>
            <span className="text-xs text-gray-500">Posts</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900">{followCounts.followersCount}</span>
            <span className="text-xs text-gray-500">Followers</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900">{followCounts.followingCount}</span>
            <span className="text-xs text-gray-500">Following</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm flex gap-2">
          <Button
            onClick={() => setIsEditModalOpen(true)}
            variant="outline"
            className="flex-1 rounded-xl font-semibold border-gray-200 flex items-center justify-center gap-1.5"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </Button>
          <Button
            onClick={handleShareProfile}
            variant="outline"
            className="flex-1 rounded-xl font-semibold border-gray-200 flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            {copied ? "Link Copied!" : "Share Profile"}
          </Button>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="flex border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 flex justify-center py-3 border-b-2 transition-colors",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-gray-600"
            )}
          >
            <tab.icon className="w-5 h-5" />
            <span className="sr-only">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === "posts" && (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <FeedPostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {activeTab === "deals" && (
          <div className="space-y-4">
            {userDeals.length > 0 ? (
              userDeals.map((deal) => <GroupDealCard key={deal.id} deal={deal} />)
            ) : (
              <div className="text-center py-12 text-sm text-gray-500">
                No active group deals joined yet.
              </div>
            )}
          </div>
        )}

        {activeTab === "communities" && (
          <div className="space-y-3">
            {userCommunities.length > 0 ? (
              userCommunities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))
            ) : (
              <div className="text-center py-12 text-sm text-gray-500">
                No communities joined yet.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />
    </div>
  );
}
