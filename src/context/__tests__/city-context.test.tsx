import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import * as React from "react";
import { CityProvider, useCity } from "../city-context";
import { MOCK_CITIES } from "@/constants/mock-data";

function TestConsumer() {
  const {
    activeCity,
    recentCities,
    setActiveCity,
    selectedLocality,
    setSelectedLocality,
    syncUserHomeCity,
  } = useCity();

  return (
    <div>
      <div data-testid="active-city">{activeCity.name}</div>
      <div data-testid="active-slug">{activeCity.slug}</div>
      <div data-testid="selected-locality">{selectedLocality}</div>
      <div data-testid="recent-count">{recentCities.length}</div>
      <button
        onClick={() => {
          const patna = MOCK_CITIES.find((c) => c.slug === "patna");
          if (patna) setActiveCity(patna);
        }}
      >
        Switch to Patna
      </button>
      <button onClick={() => setSelectedLocality("Mithanpura")}>
        Select Mithanpura
      </button>
      <button onClick={() => syncUserHomeCity("city-del-01")}>
        Sync Delhi Home
      </button>
    </div>
  );
}

describe("CityContext & useCity Hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes with default pilot city (Muzaffarpur)", () => {
    render(
      <CityProvider>
        <TestConsumer />
      </CityProvider>
    );

    expect(screen.getByTestId("active-city")).toHaveTextContent("Muzaffarpur");
    expect(screen.getByTestId("active-slug")).toHaveTextContent("muzaffarpur");
    expect(screen.getByTestId("selected-locality")).toHaveTextContent("All Localities");
  });

  it("switches active city and updates recent cities history", () => {
    render(
      <CityProvider>
        <TestConsumer />
      </CityProvider>
    );

    const switchBtn = screen.getByRole("button", { name: /Switch to Patna/i });
    act(() => {
      switchBtn.click();
    });

    expect(screen.getByTestId("active-city")).toHaveTextContent("Patna");
    expect(screen.getByTestId("active-slug")).toHaveTextContent("patna");
    expect(localStorage.getItem("citylink_active_city_slug")).toBe("patna");
    expect(screen.getByTestId("recent-count")).toHaveTextContent("1");
  });

  it("preserves explicit browsing preference over home city synchronization", () => {
    // Set explicit browsing city to Patna
    localStorage.setItem("citylink_active_city_slug", "patna");

    render(
      <CityProvider>
        <TestConsumer />
      </CityProvider>
    );

    // Trigger sync with Delhi home city
    const syncBtn = screen.getByRole("button", { name: /Sync Delhi Home/i });
    act(() => {
      syncBtn.click();
    });

    // Should still maintain Patna because an explicit browsing preference exists
    expect(screen.getByTestId("active-slug")).toHaveTextContent("patna");
  });

  it("updates locality filter", () => {
    render(
      <CityProvider>
        <TestConsumer />
      </CityProvider>
    );

    const localityBtn = screen.getByRole("button", { name: /Select Mithanpura/i });
    act(() => {
      localityBtn.click();
    });

    expect(screen.getByTestId("selected-locality")).toHaveTextContent("Mithanpura");
  });
});
