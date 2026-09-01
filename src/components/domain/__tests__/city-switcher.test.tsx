import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as React from "react";
import { CitySwitcherDialog } from "../city-switcher-dialog";
import { CityProvider } from "@/context/city-context";

describe("CitySwitcherDialog Component", () => {
  it("renders city options and pilot badge when open", () => {
    render(
      <CityProvider>
        <CitySwitcherDialog
          open={true}
          onOpenChange={vi.fn()}
          selectedCityId="city-muz-01"
        />
      </CityProvider>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Muzaffarpur")).toBeInTheDocument();
    expect(screen.getByText("Patna")).toBeInTheDocument();
    expect(screen.getByText("Pilot City")).toBeInTheDocument();
  });

  it("filters cities based on search input", () => {
    render(
      <CityProvider>
        <CitySwitcherDialog
          open={true}
          onOpenChange={vi.fn()}
          selectedCityId="city-muz-01"
        />
      </CityProvider>
    );

    const searchInput = screen.getByPlaceholderText(/Search city or state/i);
    fireEvent.change(searchInput, { target: { value: "Patna" } });

    expect(screen.getByText("Patna")).toBeInTheDocument();
    expect(screen.queryByText("Bengaluru")).not.toBeInTheDocument();
  });

  it("triggers selection callback and closes dialog", () => {
    const handleSelect = vi.fn();
    const handleOpenChange = vi.fn();

    render(
      <CityProvider>
        <CitySwitcherDialog
          open={true}
          onOpenChange={handleOpenChange}
          onSelectCity={handleSelect}
        />
      </CityProvider>
    );

    const patnaButton = screen.getByText("Patna").closest("button");
    expect(patnaButton).toBeInTheDocument();

    if (patnaButton) {
      fireEvent.click(patnaButton);
    }

    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Patna" })
    );
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
