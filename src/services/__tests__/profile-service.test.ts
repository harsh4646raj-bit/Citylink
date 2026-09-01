import { describe, it, expect } from "vitest";
import { ProfileService } from "../profile-service";

describe("ProfileService", () => {
  it("creates a new user profile with home_city_id", async () => {
    const res = await ProfileService.createProfile({
      user_id: "test-user-123",
      name: "Rohan Verma",
      username: "rohan_v",
      home_city_id: "city-muz-01",
      bio: "Resident of Mithanpura",
      privacy: "public",
    });

    expect(res.success).toBe(true);
    expect(res.profile?.username).toBe("rohan_v");
    expect(res.profile?.home_city_id).toBe("city-muz-01");
  });

  it("fetches profile for user ID", async () => {
    const profile = await ProfileService.getProfile("mock-user-01");
    expect(profile).not.toBeNull();
    expect(profile?.username).toBeDefined();
  });

  it("fetches profile by username", async () => {
    const profile = await ProfileService.getProfileByUsername("rohan_v");
    expect(profile).not.toBeNull();
    expect(profile?.name).toBe("Rohan Verma");
    expect(profile?.username).toBe("rohan_v");
  });

  it("returns null for non-existent username", async () => {
    const profile = await ProfileService.getProfileByUsername("non_existent_username_xyz");
    expect(profile).toBeNull();
  });
});
