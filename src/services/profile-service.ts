import { createClient } from "@/lib/supabase/client";
import { Profile, Database } from "@/types/database";
import { CURRENT_MOCK_USER } from "@/constants/mock-data";

export interface CreateProfileInput {
  user_id: string;
  name: string;
  username: string;
  home_city_id?: string;
  bio?: string;
  avatar_url?: string;
  privacy?: "public" | "private";
}

const isPlaceholderEnv = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return (
    process.env.NODE_ENV === "test" ||
    !url ||
    url.includes("your-project") ||
    url.includes("placeholder")
  );
};

export class ProfileService {
  /**
   * Fetch profile by user ID.
   */
  static async getProfile(userId: string): Promise<Profile | null> {
    if (isPlaceholderEnv()) {
      if (userId === "guest" || !userId) return null;
      return CURRENT_MOCK_USER as unknown as Profile;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error || !data) {
        return CURRENT_MOCK_USER as unknown as Profile;
      }

      return data as unknown as Profile;
    } catch {
      return CURRENT_MOCK_USER as unknown as Profile;
    }
  }

  /**
   * Fetch profile by username.
   */
  static async getProfileByUsername(username: string): Promise<Profile | null> {
    const cleanUsername = username.toLowerCase().replace(/^@/, "").trim();

    if (isPlaceholderEnv()) {
      if (cleanUsername === "harsh_citylink" || cleanUsername === CURRENT_MOCK_USER.username) {
        return CURRENT_MOCK_USER as unknown as Profile;
      }
      if (cleanUsername === "rohan_v") {
        return {
          id: "user-rohan-02",
          user_id: "user-rohan-02",
          name: "Rohan Verma",
          full_name: "Rohan Verma",
          username: "rohan_v",
          avatar_url: null,
          bio: "Tech enthusiast and badminton player in Mithanpura.",
          home_city_id: "city-muz-01",
          privacy: "public",
          is_verified: true,
          role: "user",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as unknown as Profile;
      }
      if (cleanUsername === "private_user") {
        return {
          id: "user-private-03",
          user_id: "user-private-03",
          name: "Private Neighbor",
          full_name: "Private Neighbor",
          username: "private_user",
          avatar_url: null,
          bio: "Resident of Muzaffarpur.",
          home_city_id: "city-muz-01",
          privacy: "private",
          is_verified: false,
          role: "user",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as unknown as Profile;
      }
      return null;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", cleanUsername)
        .single();

      if (error || !data) {
        if (cleanUsername === "harsh_citylink" || cleanUsername === CURRENT_MOCK_USER.username) {
          return CURRENT_MOCK_USER as unknown as Profile;
        }
        return null;
      }

      return data as unknown as Profile;
    } catch {
      if (cleanUsername === "harsh_citylink" || cleanUsername === CURRENT_MOCK_USER.username) {
        return CURRENT_MOCK_USER as unknown as Profile;
      }
      return null;
    }
  }

  /**
   * Create a new profile row during onboarding.
   */
  static async createProfile(input: CreateProfileInput): Promise<{ success: boolean; profile?: Profile; error?: string }> {
    const profileInsert: Database["public"]["Tables"]["profiles"]["Insert"] = {
      id: input.user_id,
      user_id: input.user_id,
      name: input.name,
      username: input.username.toLowerCase().trim(),
      home_city_id: input.home_city_id || null,
      bio: input.bio || null,
      avatar_url: input.avatar_url || null,
      privacy: input.privacy || "public",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isPlaceholderEnv()) {
      return {
        success: true,
        profile: {
          ...profileInsert,
          id: input.user_id,
          full_name: profileInsert.name,
          role: "user",
          is_verified: true,
          created_at: profileInsert.created_at || new Date().toISOString(),
          updated_at: profileInsert.updated_at || new Date().toISOString(),
        } as unknown as Profile,
      };
    }

    try {
      const supabase = createClient();
      const { data, error } = await (supabase
        .from("profiles") as any)
        .insert([profileInsert])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, profile: data as unknown as Profile };
    } catch {
      return { success: false, error: "Failed to create profile. Please retry." };
    }
  }

  /**
   * Update existing profile.
   */
  static async updateProfile(
    userId: string,
    updates: Partial<CreateProfileInput>
  ): Promise<{ success: boolean; profile?: Profile; error?: string }> {
    if (isPlaceholderEnv()) {
      return {
        success: true,
        profile: {
          ...CURRENT_MOCK_USER,
          ...updates,
          full_name: updates.name || CURRENT_MOCK_USER.full_name,
        } as unknown as Profile,
      };
    }

    try {
      const supabase = createClient();
      const { data, error } = await (supabase
        .from("profiles") as any)
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, profile: data as unknown as Profile };
    } catch {
      return { success: false, error: "Failed to update profile." };
    }
  }
}
