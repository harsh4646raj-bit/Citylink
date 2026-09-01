import { City } from "@/types/database";
import {
  MOCK_CITIES,
  MOCK_GROUP_DEALS,
  MOCK_COMMUNITIES,
  MOCK_POSTS,
  MOCK_BUSINESSES,
  MOCK_MARKETPLACE,
  MockGroupDeal,
  MockCommunity,
  MockPost,
  MockBusiness,
  MockMarketplaceListing,
} from "@/constants/mock-data";
import { createClient } from "@/lib/supabase/client";

export interface CityContentData {
  city: City;
  groupDeals: MockGroupDeal[];
  communities: MockCommunity[];
  posts: MockPost[];
  businesses: MockBusiness[];
  marketplace: MockMarketplaceListing[];
  stats: {
    activeDealsCount: number;
    communitiesCount: number;
    businessesCount: number;
  };
}

export class CityService {
  /**
   * Fetch all active supported cities.
   */
  static async getActiveCities(): Promise<City[]> {
    // In test environment or offline fallback mode, return mock pilot cities directly
    if (
      process.env.NODE_ENV === "test" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project") ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
    ) {
      return MOCK_CITIES.filter((c) => c.status === "active");
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("cities")
        .select("*")
        .eq("status", "active")
        .order("name", { ascending: true })
        .abortSignal(AbortSignal.timeout(2000));

      if (!error && data && data.length > 0) {
        return data as City[];
      }
    } catch {
      // Fallback to local pilot cities
    }

    return MOCK_CITIES.filter((c) => c.status === "active");
  }

  /**
   * Fetch city by slug.
   */
  static async getCityBySlug(slug: string): Promise<City | null> {
    const normalizedSlug = slug.toLowerCase().trim();

    if (
      process.env.NODE_ENV === "test" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project") ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
    ) {
      const found = MOCK_CITIES.find((c) => c.slug.toLowerCase() === normalizedSlug);
      return found || null;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("cities")
        .select("*")
        .eq("slug", normalizedSlug)
        .abortSignal(AbortSignal.timeout(2000))
        .single();

      if (!error && data) {
        return data as City;
      }
    } catch {
      // Fallback
    }

    const found = MOCK_CITIES.find((c) => c.slug.toLowerCase() === normalizedSlug);
    return found || null;
  }

  /**
   * Fetch all content scoped to a specific city ID.
   */
  static getCityContent(cityId: string): CityContentData {
    const city = MOCK_CITIES.find((c) => c.id === cityId) || MOCK_CITIES[0];

    const groupDeals = MOCK_GROUP_DEALS.filter((d) => d.city_id === cityId);
    const communities = MOCK_COMMUNITIES.filter((c) => c.city_id === cityId);
    const posts = MOCK_POSTS.filter((p) => p.city_id === cityId);
    const businesses = MOCK_BUSINESSES.filter((b) => b.city_id === cityId);
    const marketplace = MOCK_MARKETPLACE.filter((m) => m.city_id === cityId);

    return {
      city,
      groupDeals,
      communities,
      posts,
      businesses,
      marketplace,
      stats: {
        activeDealsCount: groupDeals.length,
        communitiesCount: communities.length,
        businessesCount: businesses.length,
      },
    };
  }

  /**
   * Get localities/neighborhoods for a given city.
   */
  static getLocalitiesForCity(citySlug: string): string[] {
    switch (citySlug.toLowerCase()) {
      case "muzaffarpur":
        return ["All Localities", "Mithanpura", "Kalambagh Chowk", "Zero Mile", "Brahmpura", "Club Road", "MIT Campus"];
      case "patna":
        return ["All Localities", "Boring Road", "Kankarbagh", "Bailey Road", "Patliputra", "Danapur"];
      case "delhi-ncr":
        return ["All Localities", "Connaught Place", "South Extension", "Dwarka", "Noida Sector 62", "Gurugram DLF"];
      case "bengaluru":
        return ["All Localities", "Indiranagar", "Koramangala", "HSR Layout", "Whitefield", "Jayanagar"];
      default:
        return ["All Localities", "City Center", "Residential Hub", "University Area"];
    }
  }
}
