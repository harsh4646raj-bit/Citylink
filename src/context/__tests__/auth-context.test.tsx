import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import * as React from "react";
import { AuthProvider, useAuth } from "../auth-context";

function TestAuthConsumer() {
  const { user, profile, isAuthenticated, signIn, signOut } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? "authenticated" : "guest"}</div>
      <div data-testid="user-email">{user?.email || "none"}</div>
      <div data-testid="profile-username">{profile?.username || "none"}</div>
      <button
        onClick={() => signIn("newuser@citylink.in", "password123")}
      >
        Log In Test
      </button>
      <button onClick={() => signOut()}>Log Out Test</button>
    </div>
  );
}

describe("AuthContext & useAuth Hook", () => {
  it("initializes with default mock authenticated state in test mode", () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-status")).toHaveTextContent("authenticated");
    expect(screen.getByTestId("profile-username")).toHaveTextContent("harsh_citylink");
  });

  it("handles user logout and switches to guest state", async () => {
    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    const logoutBtn = screen.getByRole("button", { name: /Log Out Test/i });
    await act(async () => {
      logoutBtn.click();
    });

    expect(screen.getByTestId("auth-status")).toHaveTextContent("guest");
    expect(screen.getByTestId("user-email")).toHaveTextContent("none");
  });
});
