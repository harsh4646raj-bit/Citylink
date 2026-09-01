export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      cities: {
        Row: {
          id: string;
          name: string;
          slug: string;
          state: string;
          country: string;
          latitude: number | null;
          longitude: number | null;
          boundary: Json | null;
          status: "active" | "inactive" | "coming_soon";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          state: string;
          country?: string;
          latitude?: number | null;
          longitude?: number | null;
          boundary?: Json | null;
          status?: "active" | "inactive" | "coming_soon";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["cities"]["Insert"]>;
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          username: string;
          avatar_url: string | null;
          bio: string | null;
          home_city_id: string | null;
          privacy: "public" | "private";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          username: string;
          avatar_url?: string | null;
          bio?: string | null;
          home_city_id?: string | null;
          privacy?: "public" | "private";
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      user_follows: {
        Row: {
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: {
          follower_id: string;
          following_id: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["user_follows"]["Insert"]>;
      };
      communities: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          type: "city" | "college" | "society" | "interest" | "other";
          privacy: "public" | "private";
          city_id: string;
          creator_id: string;
          cover_image: string | null;
          avatar: string | null;
          rules: string | null;
          verification_required: boolean;
          status: "active" | "archived" | "suspended";
          member_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          type?: "city" | "college" | "society" | "interest" | "other";
          privacy?: "public" | "private";
          city_id: string;
          creator_id: string;
          cover_image?: string | null;
          avatar?: string | null;
          rules?: string | null;
          verification_required?: boolean;
          status?: "active" | "archived" | "suspended";
          member_count?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["communities"]["Insert"]>;
      };
      community_members: {
        Row: {
          community_id: string;
          user_id: string;
          role: "owner" | "admin" | "moderator" | "member";
          status: "requested" | "approved" | "rejected" | "banned" | "left";
          verified: boolean;
          joined_at: string;
        };
        Insert: {
          community_id: string;
          user_id: string;
          role?: "owner" | "admin" | "moderator" | "member";
          status?: "requested" | "approved" | "rejected" | "banned" | "left";
          verified?: boolean;
          joined_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["community_members"]["Insert"]>;
      };
      posts: {
        Row: {
          id: string;
          author_id: string;
          city_id: string;
          community_id: string | null;
          content: string;
          post_type: "text" | "image" | "poll" | "announcement" | "group_deal_alert";
          visibility: "public" | "community" | "private";
          location_name: string | null;
          like_count: number;
          comment_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_id: string;
          city_id: string;
          community_id?: string | null;
          content: string;
          post_type?: "text" | "image" | "poll" | "announcement" | "group_deal_alert";
          visibility?: "public" | "community" | "private";
          location_name?: string | null;
          like_count?: number;
          comment_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["posts"]["Insert"]>;
      };
      businesses: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          slug: string;
          description: string | null;
          category_id: string | null;
          city_id: string;
          address: string | null;
          latitude: number | null;
          longitude: number | null;
          phone: string | null;
          website: string | null;
          logo: string | null;
          cover_image: string | null;
          verification_status: "unverified" | "pending" | "verified" | "rejected";
          status: "active" | "inactive" | "suspended";
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          slug: string;
          description?: string | null;
          category_id?: string | null;
          city_id: string;
          address?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          phone?: string | null;
          website?: string | null;
          logo?: string | null;
          cover_image?: string | null;
          verification_status?: "unverified" | "pending" | "verified" | "rejected";
          status?: "active" | "inactive" | "suspended";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["businesses"]["Insert"]>;
      };
      group_deals: {
        Row: {
          id: string;
          creator_id: string;
          city_id: string;
          community_id: string | null;
          business_id: string | null;
          title: string;
          description: string | null;
          category_id: string | null;
          location_name: string | null;
          min_participants: number;
          max_participants: number | null;
          current_participants: number;
          target_price: number | null;
          deadline: string;
          preferred_date: string | null;
          status:
            | "draft"
            | "open"
            | "target_reached"
            | "offers_available"
            | "offer_selected"
            | "booking"
            | "in_progress"
            | "completed"
            | "cancelled"
            | "disputed";
          created_at: string;
        };
        Insert: {
          id?: string;
          creator_id: string;
          city_id: string;
          community_id?: string | null;
          business_id?: string | null;
          title: string;
          description?: string | null;
          category_id?: string | null;
          location_name?: string | null;
          min_participants?: number;
          max_participants?: number | null;
          current_participants?: number;
          target_price?: number | null;
          deadline: string;
          preferred_date?: string | null;
          status?:
            | "draft"
            | "open"
            | "target_reached"
            | "offers_available"
            | "offer_selected"
            | "booking"
            | "in_progress"
            | "completed"
            | "cancelled"
            | "disputed";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["group_deals"]["Insert"]>;
      };
      group_deal_participants: {
        Row: {
          group_deal_id: string;
          user_id: string;
          quantity: number;
          address: string | null;
          preferred_slot: string | null;
          status: "joined" | "confirmed" | "cancelled";
          joined_at: string;
        };
        Insert: {
          group_deal_id: string;
          user_id: string;
          quantity?: number;
          address?: string | null;
          preferred_slot?: string | null;
          status?: "joined" | "confirmed" | "cancelled";
          joined_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["group_deal_participants"]["Insert"]>;
      };
      categories: {
        Row: {
          id: string;
          parent_id: string | null;
          name: string;
          slug: string;
          icon: string | null;
          type: "business" | "service" | "marketplace" | "community";
          status: "active" | "inactive";
        };
        Insert: {
          id?: string;
          parent_id?: string | null;
          name: string;
          slug: string;
          icon?: string | null;
          type: "business" | "service" | "marketplace" | "community";
          status?: "active" | "inactive";
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
      };
    };
  };
}

// Convenient entity row types
export type City = Database["public"]["Tables"]["cities"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  full_name?: string;
  role?: string;
  is_verified?: boolean;
};
export type UserFollow = Database["public"]["Tables"]["user_follows"]["Row"];
export type Community = Database["public"]["Tables"]["communities"]["Row"] & {
  is_private?: boolean;
};
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Business = Database["public"]["Tables"]["businesses"]["Row"] & {
  is_verified?: boolean;
  rating?: number;
};
export type GroupDeal = Database["public"]["Tables"]["group_deals"]["Row"] & {
  min_participants?: number;
  max_participants?: number;
  original_price?: number;
  discounted_price?: number;
};
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type GroupDealParticipant = Database["public"]["Tables"]["group_deal_participants"]["Row"];
export type CommunityMember = Database["public"]["Tables"]["community_members"]["Row"];

export interface MarketplaceListing {
  id: string;
  city_id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  status: string;
  created_at: string;
}
