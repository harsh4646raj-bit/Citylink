import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import * as React from "react";
import PublicProfilePage from "../u/[username]/page";
import { AuthProvider } from "@/context/auth-context";
import { CityProvider } from "@/context/city-context";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
    }),
    usePathname: () => "/u/rohan_v",
    useSearchParams: () => new URLSearchParams(),
    notFound: () => {
      throw new Error("NEXT_NOT_FOUND");
    },
  };
});

describe("PublicProfilePage Dynamic Route", () => {
  it("renders public profile for valid neighbor username", async () => {
    const pageJsx = await PublicProfilePage({ params: { username: "rohan_v" } });

    render(
      <AuthProvider>
        <CityProvider>{pageJsx}</CityProvider>
      </AuthProvider>
    );

    expect(screen.getByText("Rohan Verma")).toBeInTheDocument();
    expect(screen.getByText("@rohan_v")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Follow Neighbor/i })).toBeInTheDocument();
  });

  it("renders privacy shield for private user profile", async () => {
    const pageJsx = await PublicProfilePage({ params: { username: "private_user" } });

    render(
      <AuthProvider>
        <CityProvider>{pageJsx}</CityProvider>
      </AuthProvider>
    );

    expect(screen.getByText("Private Neighbor")).toBeInTheDocument();
    expect(screen.getByText("This Account is Private")).toBeInTheDocument();
  });

  it("throws notFound error for non-existent username", async () => {
    await expect(
      PublicProfilePage({ params: { username: "non_existent_user_999" } })
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });
});
