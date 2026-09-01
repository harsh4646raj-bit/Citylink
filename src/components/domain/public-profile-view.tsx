"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Lock, CheckCircle2 } from "lucide-react";
import { useOptionalAuth } from "@/context/auth-context";
import { FollowService } from "@/services/follow-service";
import type { Profile } from "@/types/database";

interface PublicProfileViewProps {
  profile: Profile;
}

export function PublicProfileView({ profile }: PublicProfileViewProps) {
  const auth = useOptionalAuth();
  const user = auth?.user;
  const displayName = profile.full_name || profile.name;
  const isPrivate = profile.privacy === "private";
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [followCounts, setFollowCounts] = React.useState({
    followersCount: 0,
    followingCount: 0,
  });

  React.useEffect(() => {
    FollowService.getFollowCounts(profile.user_id).then(setFollowCounts);
    if (user?.id) {
      FollowService.isFollowing(user.id, profile.user_id).then(setIsFollowing);
    }
  }, [profile.user_id, user?.id]);

  const handleFollow = async () => {
    if (!user?.id) return;
    if (isFollowing) {
      await FollowService.unfollowUser(user.id, profile.user_id);
      setIsFollowing(false);
      setFollowCounts((prev) => ({
        ...prev,
        followersCount: Math.max(0, prev.followersCount - 1),
      }));
    } else {
      await FollowService.followUser(user.id, profile.user_id);
      setIsFollowing(true);
      setFollowCounts((prev) => ({
        ...prev,
        followersCount: prev.followersCount + 1,
      }));
    }
  };

  if (isPrivate) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex flex-col items-center pt-8 px-4 pb-8">
          <Avatar
            fallbackText={displayName}
            size="2xl"
            className="mb-4"
          />
          <h1 className="text-xl font-bold text-gray-900">{displayName}</h1>
          <p className="text-sm text-gray-500">@{profile.username}</p>

          <div className="mt-8 flex flex-col items-center text-gray-500 space-y-2">
            <Lock className="w-10 h-10 text-gray-300" />
            <h2 className="font-bold text-lg text-foreground">Private Account</h2>
            <p className="text-sm text-muted-foreground">This Account is Private</p>
            <p className="text-xs text-muted-foreground text-center max-w-xs mt-1">
              Follow this neighbor to see their posts, Group Deals, and community activity.
            </p>
          </div>

          <Button
            onClick={handleFollow}
            className="mt-6 w-full max-w-xs"
          >
            Follow Neighbor
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Profile Header */}
      <div className="flex flex-col items-center pt-8 px-4 border-b border-gray-100 pb-6">
        <Avatar
          fallbackText={displayName}
          src={profile.avatar_url}
          size="2xl"
          className="mb-4"
        />
        <div className="flex items-center gap-1.5">
          <h1 className="text-xl font-bold text-gray-900">{displayName}</h1>
          {profile.is_verified && (
            <CheckCircle2 className="h-5 w-5 text-primary fill-primary/10" />
          )}
        </div>
        <p className="text-sm text-gray-500">@{profile.username}</p>

        {profile.bio && (
          <p className="mt-3 text-center text-sm text-gray-700 max-w-sm">
            {profile.bio}
          </p>
        )}

        {/* Stats Row */}
        <div className="mt-6 flex space-x-8 text-center">
          <div>
            <div className="font-bold text-gray-900">0</div>
            <div className="text-xs text-gray-500">Posts</div>
          </div>
          <div>
            <div className="font-bold text-gray-900">{followCounts.followersCount}</div>
            <div className="text-xs text-gray-500">Followers</div>
          </div>
          <div>
            <div className="font-bold text-gray-900">{followCounts.followingCount}</div>
            <div className="text-xs text-gray-500">Following</div>
          </div>
        </div>

        <Button
          onClick={handleFollow}
          variant={isFollowing ? "outline" : "default"}
          className="mt-6 w-full max-w-xs"
        >
          {isFollowing ? "Following" : "Follow Neighbor"}
        </Button>
      </div>

      {/* Empty Content */}
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        <p className="text-sm text-muted-foreground">
          No posts yet.
        </p>
      </div>
    </div>
  );
}
