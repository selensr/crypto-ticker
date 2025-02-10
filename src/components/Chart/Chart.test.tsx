import { render, screen } from "@testing-library/react";
import Chart from "./Chart";
import { describe, expect, it } from "vitest";

const mockData = {
  openPrice: 100,
  highPrice: 120,
  lowPrice: 90,
  lastPrice: 110,
  symbol: "BTC",
  priceChangePercent: "10%",
};

describe("Chart Component", () => {
  it("renders without crashing", () => {
    render(<Chart data={mockData} />);

    expect(screen.getByTestId("chart-container")).toBeInTheDocument();
  });
});
