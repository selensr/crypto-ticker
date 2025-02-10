import { useState, useEffect } from "react";
import { LiveData } from "../constants/constants";

const BINANCE_API_BASE = "https://api.binance.com/api/v3";

export const usePolling24hChange = (symbols: string[], interval = 30000) => {
  const [data, setData] = useState<LiveData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const requests = symbols.map((symbol) =>
        fetch(`${BINANCE_API_BASE}/ticker/24hr?symbol=${symbol}`).then(
          (response) => response.json()
        )
      );

      const responses = await Promise.all(requests);
      const formattedData = responses.map((data) => ({
        symbol: data.symbol,
        priceChangePercent: data.priceChangePercent,
        openPrice: parseFloat(data.openPrice),
        highPrice: parseFloat(data.highPrice),
        lowPrice: parseFloat(data.lowPrice),
        lastPrice: parseFloat(data.lastPrice),
      }));

      setData(formattedData);
    };

    // Fetch initially
    fetchData();

    // Polling mechanism
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [symbols, interval]);

  return data;
};
