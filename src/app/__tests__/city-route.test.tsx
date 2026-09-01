import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import CityPage from "../city/[slug]/page";
import { CityProvider } from "@/context/city-context";

// Mock notFound
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
    usePathname: () => "/city/muzaffarpur",
    useSearchParams: () => new URLSearchParams(),
    notFound: () => {
      throw new Error("NEXT_NOT_FOUND");
    },
  };
});

describe("CityPage Dynamic Route", () => {
  it("renders Muzaffarpur city hub correctly", async () => {
    const pageJsx = await CityPage({ params: { slug: "muzaffarpur" } });

    render(<CityProvider>{pageJsx}</CityProvider>);

    expect(screen.getByText(/Muzaffarpur City Hub/i)).toBeInTheDocument();
    expect(screen.getByText(/Pilot Launch City/i)).toBeInTheDocument();
    expect(screen.getByText(/Group Deals in Muzaffarpur/i)).toBeInTheDocument();
  });

  it("renders Patna city hub correctly with empty deals state", async () => {
    const pageJsx = await CityPage({ params: { slug: "patna" } });

    render(<CityProvider>{pageJsx}</CityProvider>);

    expect(screen.getByText(/Patna City Hub/i)).toBeInTheDocument();
    expect(screen.getByText(/No active Group Deals in Patna yet/i)).toBeInTheDocument();
  });

  it("throws notFound for invalid city slug", async () => {
    await expect(CityPage({ params: { slug: "invalid-city" } })).rejects.toThrow("NEXT_NOT_FOUND");
  });
});
