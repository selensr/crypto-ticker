import { FC, memo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import style from "./Table.module.scss";
import useBinanceWebSocket from "../../hooks/useBinanceWebSocket";
import { useCryptoData } from "../../hooks/useCryptoData";
import Avatar from "../Avatar/Avatar";
import { DataType } from "../../constants/types";
import Chart from "../Chart/Chart";
import { cryptoSymbols, LiveData } from "../../constants/constants";
import usePolling24hChange from "../../hooks/usePolling24hChange";

const Table: FC = () => {
  useBinanceWebSocket(cryptoSymbols);

  const live24hChange = usePolling24hChange(cryptoSymbols, 60000);

  const columns: ColumnDef<DataType>[] = [
    {
      id: "crypto",
      header: "Crypto",
      accessorKey: "crypto",
      cell: (info) => {
        const { icon, name, symbol, code } = info.row.original;

        return (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Avatar src={icon} alt={symbol} />
            <div>
              <div className={style.cryptoName}>
                <span className={style.cryptoCodeName}>{code}</span> / USTD
              </div>
              <div className={style.cryptoFullName}>{name}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Market Value",
      accessorKey: "marketValue",
    },
    {
      header: "24h Change",
      accessorKey: "percentChange",
      cell: (info) => {
        const { symbol } = info.row.original;

        const percentChange = live24hChange?.find(
          (change) => change.symbol === symbol
        )?.priceChangePercent;

        const percentChangeNumber = parseFloat(percentChange || "0").toFixed(2);
        return (
          <div
            style={{ color: percentChange?.includes("-") ? "red" : "green" }}
          >
            {percentChangeNumber}%
          </div>
        );
      },
    },
    {
      id: "priceHistory",
      header: "Price History",
      accessorKey: "priceHistory",
      cell: memo((info) => {
        const { symbol } = info.row.original;

        const livePriceData = live24hChange?.find(
          (change) => change.symbol === symbol
        ) as LiveData;

        return (
          <div>
            <Chart data={livePriceData || {}} />
          </div>
        );
      }),
    },
  ];

  const rows = useCryptoData(cryptoSymbols);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead className={style.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={style.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
