import { describe, it, expect } from "vitest";
import { FollowService } from "../follow-service";

describe("FollowService", () => {
  it("prevents self-follow", async () => {
    const res = await FollowService.followUser("user-1", "user-1");
    expect(res.success).toBe(false);
    expect(res.error).toContain("cannot follow yourself");
  });

  it("successfully follows and unfollows a target user", async () => {
    const followRes = await FollowService.followUser("user-1", "user-rohan-02");
    expect(followRes.success).toBe(true);

    const isFollowing = await FollowService.isFollowing("user-1", "user-rohan-02");
    expect(isFollowing).toBe(true);

    const unfollowRes = await FollowService.unfollowUser("user-1", "user-rohan-02");
    expect(unfollowRes.success).toBe(true);
  });

  it("returns follow counts for user", async () => {
    const counts = await FollowService.getFollowCounts("mock-user-01");
    expect(counts.followersCount).toBeGreaterThanOrEqual(0);
    expect(counts.followingCount).toBeGreaterThanOrEqual(0);
  });
});
