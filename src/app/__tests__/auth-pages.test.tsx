import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as React from "react";
import LoginPage from "../login/page";
import SignupPage from "../signup/page";
import ForgotPasswordPage from "../forgot-password/page";
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
    usePathname: () => "/login",
    useSearchParams: () => new URLSearchParams(),
  };
});

describe("Authentication Pages Smoke & Validation Tests", () => {
  it("renders LoginPage with email/password inputs", () => {
    render(
      <AuthProvider>
        <CityProvider>
          <LoginPage />
        </CityProvider>
      </AuthProvider>
    );

    expect(screen.getByText(/Welcome back to Citylink/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Log In to Citylink/i })).toBeInTheDocument();
  });

  it("renders SignupPage with password confirmation", () => {
    render(
      <AuthProvider>
        <CityProvider>
          <SignupPage />
        </CityProvider>
      </AuthProvider>
    );

    expect(screen.getByText(/Join Citylink/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Continue to Profile Setup/i })).toBeInTheDocument();
  });

  it("renders ForgotPasswordPage and handles submit", () => {
    render(
      <AuthProvider>
        <CityProvider>
          <ForgotPasswordPage />
        </CityProvider>
      </AuthProvider>
    );

    expect(screen.getByText(/Reset Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Registered Email/i)).toBeInTheDocument();
  });
});
