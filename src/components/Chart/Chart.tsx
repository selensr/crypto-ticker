import { FC, memo, useMemo } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { LiveData } from "../../constants/constants";

const Chart: FC<{ data: LiveData }> = memo(({ data }) => {
  const chartData = useMemo(() => {
    return [
      { time: "24h Ago", price: data.openPrice },
      { time: "Lowest", price: data.lowPrice },
      { time: "Highest", price: data.highPrice },
      { time: "Now", price: data.lastPrice },
    ];
  }, [data.openPrice, data.highPrice, data.lowPrice, data.lastPrice]);

  const isPriceUp = chartData[0].price < chartData[chartData.length - 1].price;

  return (
    <div data-testid="chart-container">
      <ResponsiveContainer width="100%" height={40}>
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPriceUp ? "green" : "red"}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            animationDuration={0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default Chart;
