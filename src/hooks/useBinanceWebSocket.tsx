import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { cryptoMetadata } from "../constants/constants";
import { formatUSD } from "../helpers/helpers";

export function useBinanceWebSocket(pairs: string[]) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const streams = pairs
      .map((pair) => `${pair.toLowerCase()}@ticker`)
      .join("/");
    const WEBSOCKET_URL = `wss://stream.binance.com:9443/stream?streams=${streams}`;
    //single stream => wss://stream.binance.com:9443/ws/${pair.toLowerCase()}@ticker
    //multiple stream => wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/adausdt@ticker

    console.log("Connecting to WebSocket:", WEBSOCKET_URL);

    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log("WebSocket connected for pairs:", pairs);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const ticker = message.data;

      if (ticker?.s) {
        console.log("WebSocket message:", ticker);

        const marketValueRaw = parseFloat(ticker.q);
        const marketValueFormatted = formatUSD(marketValueRaw);

        const metadata = cryptoMetadata[
          ticker.s as keyof typeof cryptoMetadata
        ] || {
          name: ticker.s,
          icon: "",
        };

        queryClient.setQueryData(["cryptoTicker", ticker.s], {
          symbol: ticker.s,
          name: metadata.name,
          icon: metadata.icon,
          code: metadata.code,
          price: parseFloat(ticker.c).toFixed(2),
          marketValue: marketValueFormatted,
        });
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = (event) => {
      console.warn("WebSocket closed:", event.reason);
    };

    return () => {
      console.log("Cleaning up WebSocket connection");
      ws.close();
    };
  }, [queryClient, pairs]);

  return null;
}
