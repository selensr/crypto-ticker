import { useState, useEffect } from "react";
import { LiveData } from "../constants/constants";

const usePolling24hChange = (symbols: string[], interval = 30000) => {
  const [data, setData] = useState<LiveData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const requests = symbols.map((symbol) =>
        fetch(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
        ).then((response) => response.json())
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

export default usePolling24hChange;
