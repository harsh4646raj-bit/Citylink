import { createClient } from "@/lib/supabase/client";
import { MOCK_GROUP_DEALS, MockGroupDeal } from "@/constants/mock-data";

export interface JoinDealInput {
  dealId: string;
  userId: string;
  quantity?: number;
  address?: string;
  preferredSlot?: string;
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

// In-memory tracker for joined deals in mock/test mode
const mockJoinedDeals = new Set<string>();

export class GroupDealService {
  /**
   * Fetch all active group deals for a given city.
   */
  static async getGroupDeals(cityId: string): Promise<MockGroupDeal[]> {
    if (isPlaceholderEnv()) {
      return MOCK_GROUP_DEALS.filter((d) => d.city_id === cityId);
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("group_deals")
        .select("*")
        .eq("city_id", cityId)
        .order("created_at", { ascending: false });

      if (error || !data) {
        return MOCK_GROUP_DEALS.filter((d) => d.city_id === cityId);
      }

      return data as unknown as MockGroupDeal[];
    } catch {
      return MOCK_GROUP_DEALS.filter((d) => d.city_id === cityId);
    }
  }

  /**
   * Check if a specific user has joined a group deal.
   */
  static async hasUserJoined(dealId: string, userId: string): Promise<boolean> {
    const key = `${dealId}:${userId}`;
    if (mockJoinedDeals.has(key)) return true;

    if (isPlaceholderEnv()) {
      return false;
    }

    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("group_deal_participants")
        .select("id")
        .eq("group_deal_id", dealId)
        .eq("user_id", userId)
        .maybeSingle();

      return Boolean(data);
    } catch {
      return false;
    }
  }

  /**
   * Join a group deal, recording participation and incrementing the count.
   */
  static async joinGroupDeal(
    input: JoinDealInput
  ): Promise<{ success: boolean; error?: string; currentParticipants?: number }> {
    const key = `${input.dealId}:${input.userId}`;

    if (isPlaceholderEnv()) {
      mockJoinedDeals.add(key);
      const deal = MOCK_GROUP_DEALS.find((d) => d.id === input.dealId);
      const updatedCount = (deal ? deal.current_participants : 8) + 1;
      if (deal) {
        deal.current_participants = updatedCount;
      }
      return {
        success: true,
        currentParticipants: updatedCount,
      };
    }

    try {
      const supabase = createClient();

      // 1. Insert participant record
      const { error: insertError } = await (supabase
        .from("group_deal_participants") as any)
        .insert([
          {
            group_deal_id: input.dealId,
            user_id: input.userId,
            quantity: input.quantity || 1,
            address: input.address || null,
            preferred_slot: input.preferredSlot || null,
            status: "joined",
            joined_at: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        // If already joined, treat as joined
        if (insertError.code === "23505") {
          return { success: true };
        }
        return { success: false, error: insertError.message };
      }

      // 2. Fetch updated count
      const { count } = await supabase
        .from("group_deal_participants")
        .select("*", { count: "exact", head: true })
        .eq("group_deal_id", input.dealId);

      const newCount = count || 1;

      // 3. Update deal current_participants column
      await (supabase
        .from("group_deals") as any)
        .update({ current_participants: newCount })
        .eq("id", input.dealId);

      return { success: true, currentParticipants: newCount };
    } catch {
      return { success: false, error: "Network error joining Group Deal. Please retry." };
    }
  }
}
