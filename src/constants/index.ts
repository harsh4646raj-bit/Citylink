/**
 * Citylink Core Platform Constants
 */

export const DEFAULT_CITY = {
  id: "a0000000-0000-0000-0000-000000000001",
  name: "Muzaffarpur",
  slug: "muzaffarpur",
  state: "Bihar",
  country: "India",
  latitude: 26.1209,
  longitude: 85.3647,
} as const;

export const SUPPORTED_CITIES = [
  DEFAULT_CITY,
  {
    id: "a0000000-0000-0000-0000-000000000002",
    name: "Patna",
    slug: "patna",
    state: "Bihar",
    country: "India",
    latitude: 25.5941,
    longitude: 85.1376,
  },
  {
    id: "a0000000-0000-0000-0000-000000000003",
    name: "Delhi NCR",
    slug: "delhi-ncr",
    state: "Delhi",
    country: "India",
    latitude: 28.7041,
    longitude: 77.1025,
  },
] as const;

export const NAV_ROUTES = {
  HOME: "/",
  DISCOVER: "/discover",
  CREATE: "/create",
  MESSAGES: "/messages",
  PROFILE: "/profile",
  COMMUNITIES: "/communities",
  GROUP_DEALS: "/group-deals",
  BUSINESS_DASHBOARD: "/business",
  ADMIN: "/admin",
} as const;
