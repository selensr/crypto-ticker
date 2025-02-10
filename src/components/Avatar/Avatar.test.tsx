import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar";
import { describe, expect, it } from "vitest";

describe("Avatar Component", () => {
  it("renders correctly", () => {
    render(<Avatar src="/test-image.png" alt="User Avatar" />);

    const avatar = screen.getByRole("img");
    expect(avatar).toBeInTheDocument();
  });

  it("applies correct src and alt attributes", () => {
    render(<Avatar src="/test-image.png" alt="User Avatar" />);

    const avatar = screen.getByRole("img");
    expect(avatar).toHaveAttribute("src", "/test-image.png");
    expect(avatar).toHaveAttribute("alt", "User Avatar");
  });
});
