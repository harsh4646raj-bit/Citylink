import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import * as React from "react";
import OnboardingPage from "../onboarding/page";
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
    usePathname: () => "/onboarding",
    useSearchParams: () => new URLSearchParams(),
  };
});

describe("Onboarding Wizard Multi-Step Flow", () => {
  it("progresses through Step 1 (Identity) to Step 2 (Home City)", async () => {
    render(
      <AuthProvider>
        <CityProvider>
          <OnboardingPage />
        </CityProvider>
      </AuthProvider>
    );

    expect(screen.getByText(/Set Up Your Profile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Unique Username/i)).toBeInTheDocument();

    const continueBtn = screen.getByRole("button", { name: /Continue to Home City/i });
    await act(async () => {
      fireEvent.click(continueBtn);
    });

    expect(screen.getByText(/Select Your Home City/i)).toBeInTheDocument();
  });
});
