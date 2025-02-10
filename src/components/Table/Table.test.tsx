import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import Table from "./Table";
import { useCryptoData } from "../../hooks/useCryptoData";

vi.mock("/src/hooks/useBinanceWebSocket.tsx", () => ({
  useBinanceWebSocket: vi.fn(),
}));

vi.mock("/src/hooks/usePolling24hChange.tsx", () => ({
  usePolling24hChange: vi.fn(),
}));

vi.mock("/src/hooks/useCryptoData.tsx", () => ({
  useCryptoData: vi.fn(() => [
    {
      crypto: "BTCUSDT",
      price: "43000",
      marketValue: "815B",
      icon: "/public/assets/bitcoin.svg",
      name: "Bitcoin",
      symbol: "BTC",
      code: "BTC",
    },
    {
      crypto: "ETHUSDT",
      price: "3200",
      marketValue: "375B",
      icon: "/public/assets/ethereum.svg",
      name: "Ethereum",
      symbol: "ETH",
      code: "ETH",
    },
  ]),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

describe("Table Component", () => {
  it("renders table headers correctly", () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <Table />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Crypto/i)).toBeInTheDocument();
  });

  it("renders the Price History column (Chart)", async () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <Table />
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.getAllByRole("img").length).toBeGreaterThan(0)
    );
  });

  it("renders table rows correctly", async () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <Table />
      </QueryClientProvider>
    );
    expect(useCryptoData).toHaveBeenCalled();

    await waitFor(() =>
      expect(screen.getByText("Bitcoin")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Ethereum")).toBeInTheDocument()
    );
  });
});
