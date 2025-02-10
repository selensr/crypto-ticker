export const cryptoMetadata = {
  BTCUSDT: {
    name: "Bitcoin",
    icon: "/src/assets/bitcoin.svg",
    code: "BTC",
  },
  ETHUSDT: {
    name: "Ethereum",
    icon: "/src/assets/ethereum.svg",
    code: "ETH",
  },
  SHIBUSDT: {
    name: "Shiba Inu",
    icon: "/src/assets/shiba.svg",
    code: "SHIB",
  },
};

export const cryptoSymbols = ["BTCUSDT", "ETHUSDT", "SHIBUSDT"];

export type LiveData = {
  symbol: string;
  priceChangePercent: string;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  lastPrice: number;
};
