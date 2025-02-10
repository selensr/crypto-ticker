import { useQueryClient } from "@tanstack/react-query";
import { DataType } from "../constants/types";
import { useEffect, useState } from "react";

export const useCryptoData = (symbols: string[]): DataType[] => {
  const queryClient = useQueryClient();
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    const updateRows = () => {
      const newRows = symbols.map((symbol) => {
        const data = queryClient.getQueryData<DataType>([
          "cryptoTicker",
          symbol,
        ]);
        return {
          symbol,
          name: data?.name || "Loading...",
          icon: data?.icon || "Loading...",
          code: data?.code || "Loading...",
          price: data?.price || "Loading...",
          marketValue: data?.marketValue || "Loading...",
        };
      });

      setRows(newRows);
    };

    const unsubscribe = queryClient.getQueryCache().subscribe(updateRows);

    updateRows();

    return () => unsubscribe();
  }, [queryClient, symbols]);

  return rows;
};
