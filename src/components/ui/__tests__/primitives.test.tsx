import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../button";
import { Input } from "../input";
import { Badge } from "../badge";
import { Card, CardHeader, CardTitle, CardContent } from "../card";
import { Avatar } from "../avatar";
import { EmptyState } from "../empty-state";

describe("Design System UI Primitives", () => {
  it("renders Button with text and handles clicks", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders Button loading state correctly and disables interaction", () => {
    render(<Button isLoading>Submit</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("renders Input with label, placeholder, and error message", () => {
    render(
      <Input
        label="City Name"
        placeholder="Enter city"
        error="City is required"
      />
    );
    expect(screen.getByText("City Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter city")).toBeInTheDocument();
    expect(screen.getByText("City is required")).toBeInTheDocument();
  });

  it("renders Badge variants correctly", () => {
    render(<Badge variant="accent">Group Deal</Badge>);
    expect(screen.getByText("Group Deal")).toBeInTheDocument();
  });

  it("renders Card component hierarchy correctly", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Community Title</CardTitle>
        </CardHeader>
        <CardContent>Content info</CardContent>
      </Card>
    );
    expect(screen.getByText("Community Title")).toBeInTheDocument();
    expect(screen.getByText("Content info")).toBeInTheDocument();
  });

  it("renders Avatar with fallback initials when no image src is given", () => {
    render(<Avatar fallbackText="Muzaffarpur College" />);
    expect(screen.getByText("MC")).toBeInTheDocument();
  });

  it("renders EmptyState and triggers action button", async () => {
    const handleAction = vi.fn();
    render(
      <EmptyState
        title="No Results Found"
        description="Try searching for another keyword"
        actionLabel="Clear Filter"
        onAction={handleAction}
      />
    );

    expect(screen.getByText("No Results Found")).toBeInTheDocument();
    expect(screen.getByText("Try searching for another keyword")).toBeInTheDocument();

    const actionBtn = screen.getByRole("button", { name: /clear filter/i });
    await userEvent.click(actionBtn);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });
});
