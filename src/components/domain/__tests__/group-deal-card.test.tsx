import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as React from "react";
import { GroupDealCard } from "../group-deal-card";
import { MOCK_GROUP_DEALS } from "@/constants/mock-data";

describe("GroupDealCard Component", () => {
  const sampleDeal = MOCK_GROUP_DEALS[0];

  it("renders deal details correctly", () => {
    render(<GroupDealCard deal={sampleDeal} />);

    expect(screen.getByText(sampleDeal.title)).toBeInTheDocument();
    expect(screen.getByText(sampleDeal.localityName)).toBeInTheDocument();
    expect(screen.getByText("₹799")).toBeInTheDocument();
    expect(screen.getByText("₹1,499")).toBeInTheDocument();
    expect(screen.getByText(/Save 47%/i)).toBeInTheDocument();
  });

  it("renders participant progress bar and counts", () => {
    render(<GroupDealCard deal={sampleDeal} />);

    expect(screen.getByText(/9 joined/i)).toBeInTheDocument();
    expect(screen.getByText(/Goal: 8 participants/i)).toBeInTheDocument();

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "100");
  });

  it("handles join deal click and updates UI to joined state", () => {
    const handleJoin = vi.fn();
    render(<GroupDealCard deal={sampleDeal} onJoin={handleJoin} />);

    const joinButton = screen.getByRole("button", { name: /Join Deal/i });
    expect(joinButton).toBeInTheDocument();

    fireEvent.click(joinButton);

    expect(handleJoin).toHaveBeenCalledWith(sampleDeal.id);
    expect(screen.getByRole("button", { name: /Joined/i })).toBeInTheDocument();
  });
});
