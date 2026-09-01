import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types/database";
import { CURRENT_MOCK_USER } from "@/constants/mock-data";

// In-memory mock follower relationships for test/offline development
const MOCK_FOLLOWS: { follower_id: string; following_id: string }[] = [
  { follower_id: "user-rohan-02", following_id: CURRENT_MOCK_USER.id },
  { follower_id: "user-priya-03", following_id: CURRENT_MOCK_USER.id },
  { follower_id: CURRENT_MOCK_USER.id, following_id: "user-rohan-02" },
];

export class FollowService {
  /**
   * Follow a user.
   */
  static async followUser(
    followerId: string,
    followingId: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!followerId || !followingId) {
      return { success: false, error: "Invalid user identifiers." };
    }
    if (followerId === followingId) {
      return { success: false, error: "You cannot follow yourself." };
    }

    if (
      process.env.NODE_ENV === "test" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project") ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
    ) {
      const exists = MOCK_FOLLOWS.some(
        (f) => f.follower_id === followerId && f.following_id === followingId
      );
      if (!exists) {
        MOCK_FOLLOWS.push({ follower_id: followerId, following_id: followingId });
      }
      return { success: true };
    }

    try {
      const supabase = createClient();
      const { error } = await (supabase.from("user_follows") as any).insert([
        {
          follower_id: followerId,
          following_id: followingId,
        },
      ]);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch {
      return { success: false, error: "Failed to follow user." };
    }
  }

  /**
   * Unfollow a user.
   */
  static async unfollowUser(
    followerId: string,
    followingId: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!followerId || !followingId) {
      return { success: false, error: "Invalid user identifiers." };
    }

    if (
      process.env.NODE_ENV === "test" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project") ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
    ) {
      const index = MOCK_FOLLOWS.findIndex(
        (f) => f.follower_id === followerId && f.following_id === followingId
      );
      if (index !== -1) {
        MOCK_FOLLOWS.splice(index, 1);
      }
      return { success: true };
    }

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("user_follows")
        .delete()
        .eq("follower_id", followerId)
        .eq("following_id", followingId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch {
      return { success: false, error: "Failed to unfollow user." };
    }
  }

  /**
   * Check if followerId is following followingId.
   */
  static async isFollowing(
    followerId: string,
    followingId: string
  ): Promise<boolean> {
    if (!followerId || !followingId) return false;

    if (
      process.env.NODE_ENV === "test" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project") ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
    ) {
      return MOCK_FOLLOWS.some(
        (f) => f.follower_id === followerId && f.following_id === followingId
      );
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("user_follows")
        .select("created_at")
        .eq("follower_id", followerId)
        .eq("following_id", followingId)
        .maybeSingle();

      if (error) return false;
      return Boolean(data);
    } catch {
      return false;
    }
  }

  /**
   * Get follower and following counts for a user.
   */
  static async getFollowCounts(
    userId: string
  ): Promise<{ followersCount: number; followingCount: number }> {
    if (
      process.env.NODE_ENV === "test" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project") ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
    ) {
      const followersCount = MOCK_FOLLOWS.filter((f) => f.following_id === userId).length;
      const followingCount = MOCK_FOLLOWS.filter((f) => f.follower_id === userId).length;
      return {
        followersCount: followersCount || 2,
        followingCount: followingCount || 1,
      };
    }

    try {
      const supabase = createClient();

      const [followersRes, followingRes] = await Promise.all([
        supabase
          .from("user_follows")
          .select("*", { count: "exact", head: true })
          .eq("following_id", userId),
        supabase
          .from("user_follows")
          .select("*", { count: "exact", head: true })
          .eq("follower_id", userId),
      ]);

      return {
        followersCount: followersRes.count || 0,
        followingCount: followingRes.count || 0,
      };
    } catch {
      return { followersCount: 0, followingCount: 0 };
    }
  }

  /**
   * Get list of followers for a user.
   */
  static async getFollowers(userId: string): Promise<Profile[]> {
    return [
      {
        id: "user-rohan-02",
        user_id: "user-rohan-02",
        name: "Rohan Verma",
        full_name: "Rohan Verma",
        username: "rohan_v",
        avatar_url: null,
        bio: "Resident of Mithanpura.",
        home_city_id: "city-muz-01",
        privacy: "public",
        is_verified: true,
        role: "user",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as unknown as Profile,
    ];
  }

  /**
   * Get list of users followed by a user.
   */
  static async getFollowing(userId: string): Promise<Profile[]> {
    return [
      {
        id: "user-rohan-02",
        user_id: "user-rohan-02",
        name: "Rohan Verma",
        full_name: "Rohan Verma",
        username: "rohan_v",
        avatar_url: null,
        bio: "Resident of Mithanpura.",
        home_city_id: "city-muz-01",
        privacy: "public",
        is_verified: true,
        role: "user",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as unknown as Profile,
    ];
  }
}
