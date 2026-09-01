import { describe, it, expect } from "vitest";
import { CityService } from "../city-service";

describe("CityService", () => {
  it("fetches active cities list", async () => {
    const cities = await CityService.getActiveCities();
    expect(cities.length).toBeGreaterThanOrEqual(4);
    expect(cities.some((c) => c.slug === "muzaffarpur")).toBe(true);
    expect(cities.some((c) => c.slug === "patna")).toBe(true);
  });

  it("fetches city by valid slug", async () => {
    const city = await CityService.getCityBySlug("muzaffarpur");
    expect(city).not.toBeNull();
    expect(city?.name).toBe("Muzaffarpur");
    expect(city?.state).toBe("Bihar");
  });

  it("returns null for non-existent slug", async () => {
    const city = await CityService.getCityBySlug("non-existent-city-xyz");
    expect(city).toBeNull();
  });

  it("returns city content scoped by city ID", () => {
    const content = CityService.getCityContent("city-muz-01");
    expect(content.city.name).toBe("Muzaffarpur");
    expect(content.groupDeals.length).toBeGreaterThan(0);
    expect(content.communities.length).toBeGreaterThan(0);
    expect(content.posts.length).toBeGreaterThan(0);
    expect(content.businesses.length).toBeGreaterThan(0);
  });

  it("returns neighborhood localities for supported city", () => {
    const localities = CityService.getLocalitiesForCity("muzaffarpur");
    expect(localities).toContain("Mithanpura");
    expect(localities).toContain("Kalambagh Chowk");
  });
});
