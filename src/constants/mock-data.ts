import { City, Community, GroupDeal, Post, Profile, Business, MarketplaceListing } from "@/types/database";

export interface MockGroupDeal {
  id: string;
  city_id: string;
  title: string;
  serviceName: string;
  localityName: string;
  description: string;
  category: string;
  creator_id: string;
  organizerName: string;
  vendor_id?: string;
  vendorName?: string;
  min_participants: number;
  max_participants: number;
  current_participants: number;
  original_price: number;
  discounted_price: number;
  deadline: string;
  status: string;
  created_at: string;
}

export interface MockCommunity {
  id: string;
  city_id: string;
  name: string;
  slug: string;
  description: string;
  is_private: boolean;
  creator_id: string;
  created_at: string;
  memberCountFormatted: string;
  recentActivity: string;
}

export interface MockPost {
  id: string;
  city_id: string;
  author_id: string;
  community_id?: string;
  content: string;
  category: string;
  created_at: string;
  author: {
    fullName: string;
    username: string;
    avatarUrl?: string;
    locality: string;
    isVerified?: boolean;
  };
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  imageUrl?: string;
  imageCount?: number;
}

export interface MockBusiness {
  id: string;
  city_id: string;
  owner_id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  is_verified: boolean;
  rating: number;
  created_at: string;
  ownerName: string;
  localityName: string;
  reviewsCount: number;
  isOpenNow: boolean;
  priceRange: string;
}

export interface MockMarketplaceListing {
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
  sellerName: string;
  localityName: string;
  conditionText: string;
}

export const MOCK_CITIES: City[] = [
  {
    id: "city-muz-01",
    name: "Muzaffarpur",
    state: "Bihar",
    country: "India",
    slug: "muzaffarpur",
    latitude: 26.1209,
    longitude: 85.3647,
    boundary: null,
    status: "active",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "city-pat-02",
    name: "Patna",
    state: "Bihar",
    country: "India",
    slug: "patna",
    latitude: 25.5941,
    longitude: 85.1376,
    boundary: null,
    status: "active",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "city-del-03",
    name: "Delhi NCR",
    state: "Delhi",
    country: "India",
    slug: "delhi-ncr",
    latitude: 28.6139,
    longitude: 77.2090,
    boundary: null,
    status: "active",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "city-blr-04",
    name: "Bengaluru",
    state: "Karnataka",
    country: "India",
    slug: "bengaluru",
    latitude: 12.9716,
    longitude: 77.5946,
    boundary: null,
    status: "active",
    created_at: "2026-01-01T00:00:00Z",
  },
];

export const MOCK_GROUP_DEALS: MockGroupDeal[] = [
  {
    id: "deal-01",
    city_id: "city-muz-01",
    title: "Apartment Sofa & Deep Carpet Cleaning",
    serviceName: "Home Deep Cleaning",
    localityName: "Mithanpura Residential Society",
    description: "Group bulk booking for high-pressure sofa and carpet shampooing across towers A, B, and C. Professional steam sanitation included.",
    category: "Home Services",
    creator_id: "user-01",
    organizerName: "Rakesh Sharma (RWA Secretary)",
    vendor_id: "biz-01",
    vendorName: "SparkleClean Pro Muzaffarpur",
    min_participants: 8,
    max_participants: 15,
    current_participants: 9,
    original_price: 1499,
    discounted_price: 799,
    deadline: "2026-09-02T18:00:00Z",
    status: "active",
    created_at: "2026-08-28T10:00:00Z",
  },
  {
    id: "deal-02",
    city_id: "city-muz-01",
    title: "Residential RO Water Purifier Annual AMC",
    serviceName: "Water Purifier Service",
    localityName: "Kalambagh Chowk & Gannipur",
    description: "Annual maintenance contract covering 3 filter replacements and free emergency visits for Kent/Aquaguard systems.",
    category: "Appliances",
    creator_id: "user-02",
    organizerName: "Anjali Verma",
    vendor_id: "biz-02",
    vendorName: "AquaPure Solutions",
    min_participants: 12,
    max_participants: 25,
    current_participants: 16,
    original_price: 2200,
    discounted_price: 1299,
    deadline: "2026-09-05T20:00:00Z",
    status: "active",
    created_at: "2026-08-27T12:00:00Z",
  },
  {
    id: "deal-03",
    city_id: "city-muz-01",
    title: "Festival Bridal & Spa Salon Package at Home",
    serviceName: "Beauty & Wellness",
    localityName: "Zero Mile & Ahiyapur",
    description: "Certified beauticians coming on-site for group manicure, pedicure, facial, and hair treatment.",
    category: "Salon & Spa",
    creator_id: "user-03",
    organizerName: "Pooja Mishra",
    min_participants: 5,
    max_participants: 10,
    current_participants: 4,
    original_price: 3500,
    discounted_price: 1850,
    deadline: "2026-09-03T15:00:00Z",
    status: "active",
    created_at: "2026-08-28T14:30:00Z",
  },
  {
    id: "deal-04",
    city_id: "city-muz-01",
    title: "Society Split AC Pre-Season Servicing & Gas Top-up",
    serviceName: "AC & Refrigeration",
    localityName: "Brahmpura",
    description: "Pre-season foam jet servicing and performance audit for 1.5 Ton split AC units.",
    category: "Appliances",
    creator_id: "user-04",
    organizerName: "Vikram Kumar",
    vendor_id: "biz-03",
    vendorName: "CoolTech Engineers",
    min_participants: 10,
    max_participants: 20,
    current_participants: 10,
    original_price: 1200,
    discounted_price: 650,
    deadline: "2026-09-01T12:00:00Z",
    status: "active",
    created_at: "2026-08-26T09:00:00Z",
  },
];

export const MOCK_COMMUNITIES: MockCommunity[] = [
  {
    id: "comm-01",
    city_id: "city-muz-01",
    name: "MIT Muzaffarpur Students & Alumni",
    slug: "mit-muzaffarpur",
    description: "Official verified hub for Muzaffarpur Institute of Technology students, campus events, and alumni networking.",
    is_private: true,
    creator_id: "user-admin",
    created_at: "2026-01-10T00:00:00Z",
    memberCountFormatted: "1,420 members",
    recentActivity: "4 posts today",
  },
  {
    id: "comm-02",
    city_id: "city-muz-01",
    name: "Muzaffarpur Tech & Entrepreneurs",
    slug: "muz-tech-startups",
    description: "Collaborate, share opportunities, hire local developers, and build products from North Bihar.",
    is_private: false,
    creator_id: "user-02",
    created_at: "2026-02-15T00:00:00Z",
    memberCountFormatted: "650 members",
    recentActivity: "12 discussions this week",
  },
  {
    id: "comm-03",
    city_id: "city-muz-01",
    name: "Mithanpura Residents Welfare Society",
    slug: "mithanpura-residents",
    description: "Civic discussions, neighborhood security, Group Deal bookings, and local welfare announcements.",
    is_private: false,
    creator_id: "user-01",
    created_at: "2026-03-01T00:00:00Z",
    memberCountFormatted: "380 residents",
    recentActivity: "Active deal running",
  },
];

export const MOCK_POSTS: MockPost[] = [
  {
    id: "post-01",
    city_id: "city-muz-01",
    author_id: "user-01",
    content: "📢 Good news for Mithanpura residents! The group deal for society sofa and carpet deep cleaning just crossed the minimum 8-person threshold. The vendor has confirmed Thursday 10 AM slot. 3 more slots left at ₹799! Join before deadline.",
    category: "Group Deals",
    created_at: "2026-08-29T10:15:00Z",
    author: {
      fullName: "Rakesh Sharma",
      username: "rakesh_mithanpura",
      locality: "Mithanpura",
      isVerified: true,
    },
    likesCount: 24,
    commentsCount: 8,
    sharesCount: 3,
    isLiked: false,
    isSaved: true,
    imageCount: 4,
  },
  {
    id: "post-02",
    city_id: "city-muz-01",
    author_id: "user-02",
    community_id: "comm-01",
    content: "Calling all MIT Muzaffarpur CS & EC students: We are hosting a hackathon on Smart City Solutions next Saturday in the Main Auditorium. Registration is free for all enrolled students!",
    category: "Communities",
    created_at: "2026-08-29T08:30:00Z",
    author: {
      fullName: "Priya Ranjan",
      username: "priya_mit",
      locality: "MIT Campus",
      isVerified: true,
    },
    likesCount: 56,
    commentsCount: 14,
    sharesCount: 12,
    isLiked: true,
    isSaved: false,
  },
  {
    id: "post-03",
    city_id: "city-muz-01",
    author_id: "user-03",
    content: "Can anyone recommend a trusted laptop repair technician near Kalambagh Chowk? My display hinge needs urgent replacement.",
    category: "General",
    created_at: "2026-08-29T07:45:00Z",
    author: {
      fullName: "Sameer Alam",
      username: "sameer_a",
      locality: "Kalambagh Road",
      isVerified: false,
    },
    likesCount: 9,
    commentsCount: 11,
    sharesCount: 1,
    isLiked: false,
    isSaved: false,
  },
];

export const MOCK_BUSINESSES: MockBusiness[] = [
  {
    id: "biz-01",
    city_id: "city-muz-01",
    owner_id: "user-biz-1",
    name: "SparkleClean Pro Services",
    slug: "sparkleclean-pro",
    category: "Cleaning & Sanitation",
    description: "Certified deep cleaning, carpet shampooing, and water tank sanitation for homes and offices across Muzaffarpur.",
    address: "Shop 14, Mithanpura Main Road",
    phone: "+91 98765 43210",
    is_verified: true,
    rating: 4.8,
    created_at: "2026-01-15T00:00:00Z",
    ownerName: "Sunil Verma",
    localityName: "Mithanpura",
    reviewsCount: 84,
    isOpenNow: true,
    priceRange: "₹₹",
  },
  {
    id: "biz-02",
    city_id: "city-muz-01",
    owner_id: "user-biz-2",
    name: "Bihar Tech Care & Laptop Clinic",
    slug: "bihar-tech-care",
    category: "Electronics Repair",
    description: "Motherboard repair, screen replacement, and genuine spare parts for Dell, HP, Lenovo and Apple devices.",
    address: "Opposite MIT Gate, Kalambagh Road",
    phone: "+91 98765 11223",
    is_verified: true,
    rating: 4.9,
    created_at: "2026-02-01T00:00:00Z",
    ownerName: "Amitabh Sen",
    localityName: "Kalambagh Chowk",
    reviewsCount: 132,
    isOpenNow: true,
    priceRange: "₹",
  },
];

export const MOCK_MARKETPLACE: MockMarketplaceListing[] = [
  {
    id: "item-01",
    city_id: "city-muz-01",
    seller_id: "user-05",
    title: "Solid Teakwood Study Desk with Bookshelf",
    description: "Ergonomic study desk in excellent condition. Ideal for students and work-from-home setups. Pick up from Club Road.",
    price: 3200,
    category: "Furniture",
    condition: "like-new",
    status: "active",
    created_at: "2026-08-28T16:00:00Z",
    sellerName: "Gaurav Roy",
    localityName: "Club Road",
    conditionText: "Like New",
  },
  {
    id: "item-02",
    city_id: "city-muz-01",
    seller_id: "user-06",
    title: "Hercules 21-Speed Gear Bicycle",
    description: "Well-maintained gear cycle with front disc brakes and new tires. 6 months old.",
    price: 4500,
    category: "Bicycles & Sports",
    condition: "good",
    status: "active",
    created_at: "2026-08-27T11:00:00Z",
    sellerName: "Deepak Choudhary",
    localityName: "Brahmpura",
    conditionText: "Good Condition",
  },
];

export const CURRENT_MOCK_USER = {
  id: "user-curr-01",
  user_id: "auth-user-01",
  name: "Harsh Kumar",
  full_name: "Harsh Kumar",
  username: "harsh_citylink",
  avatar_url: null,
  bio: "Exploring local opportunities, active in MIT Community & Mithanpura Group Deals.",
  home_city_id: "city-muz-01",
  privacy: "public" as const,
  role: "user",
  is_verified: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};
