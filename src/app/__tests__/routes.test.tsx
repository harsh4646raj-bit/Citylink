import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import HomePage from "../page";
import DiscoverPage from "../discover/page";
import CreatePage from "../create/page";
import MessagesPage from "../messages/page";
import ProfilePage from "../profile/page";
import { CityProvider } from "@/context/city-context";
import { AuthProvider } from "@/context/auth-context";

describe("Consumer Routes Smoke Test", () => {
  it("renders HomePage successfully with active city context", () => {
    render(
      <AuthProvider>
        <CityProvider>
          <HomePage />
        </CityProvider>
      </AuthProvider>
    );
    expect(screen.getByText(/What's happening in Muzaffarpur/i)).toBeInTheDocument();
    expect(screen.getByText(/Featured Collective Demand in Muzaffarpur/i)).toBeInTheDocument();
  });

  it("renders DiscoverPage successfully", () => {
    render(
      <AuthProvider>
        <CityProvider>
          <DiscoverPage />
        </CityProvider>
      </AuthProvider>
    );
    expect(screen.getByText(/Discover Muzaffarpur/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search deals, communities, shops in Muzaffarpur/i)).toBeInTheDocument();
  });

  it("renders CreatePage successfully with target city publishing", () => {
    render(
      <AuthProvider>
        <CityProvider>
          <CreatePage />
        </CityProvider>
      </AuthProvider>
    );
    expect(screen.getByText(/Create Opportunity/i)).toBeInTheDocument();
    expect(screen.getByText(/Publishing to City:/i)).toBeInTheDocument();
  });

  it("renders MessagesPage successfully", () => {
    render(
      <AuthProvider>
        <CityProvider>
          <MessagesPage />
        </CityProvider>
      </AuthProvider>
    );
    expect(screen.getByText(/Messages & Channels/i)).toBeInTheDocument();
    expect(screen.getByText(/SparkleClean Pro Muzaffarpur/i)).toBeInTheDocument();
  });

  it("renders ProfilePage successfully", () => {
    render(
      <AuthProvider>
        <CityProvider>
          <ProfilePage />
        </CityProvider>
      </AuthProvider>
    );
    expect(screen.getByText(/Harsh Kumar/i)).toBeInTheDocument();
    expect(screen.getByText(/@harsh_citylink/i)).toBeInTheDocument();
  });
});
