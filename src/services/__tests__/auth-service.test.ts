import { describe, it, expect } from "vitest";
import { AuthService } from "../auth-service";

describe("AuthService", () => {
  it("rejects invalid email formats on signup", async () => {
    const res = await AuthService.signUp("invalid-email", "password123");
    expect(res.success).toBe(false);
    expect(res.error).toContain("valid email");
  });

  it("rejects weak password on signup", async () => {
    const res = await AuthService.signUp("valid@citylink.in", "short");
    expect(res.success).toBe(false);
    expect(res.error).toContain("at least 8 characters");
  });

  it("successfully signs up with valid credentials in mock/test mode", async () => {
    const res = await AuthService.signUp("resident@muzaffarpur.in", "securepassword123");
    expect(res.success).toBe(true);
    expect(res.user?.email).toBe("resident@muzaffarpur.in");
  });

  it("handles signIn validation", async () => {
    const emptyEmail = await AuthService.signIn("", "password123");
    expect(emptyEmail.success).toBe(false);

    const validLogin = await AuthService.signIn("test@citylink.in", "password123");
    expect(validLogin.success).toBe(true);
  });

  it("correctly identifies reserved and available usernames", async () => {
    const isAdminAvail = await AuthService.checkUsernameAvailability("admin");
    expect(isAdminAvail).toBe(false);

    const isShortAvail = await AuthService.checkUsernameAvailability("ab");
    expect(isShortAvail).toBe(false);

    const isNormalAvail = await AuthService.checkUsernameAvailability("harsh_bihar");
    expect(isNormalAvail).toBe(true);
  });
});
