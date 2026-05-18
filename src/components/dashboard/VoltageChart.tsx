import { useId } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { VoltagePoint } from "../../hooks/useGlucoseMonitor";

type Props = {
  data: VoltagePoint[];
};

export function VoltageChart({ data }: Props) {
  const uid = useId();
  const fillId = `voltFill-${uid}`;

  return (
    <div className="h-64 w-full md:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgb(255 255 255 / 0.06)" vertical={false} />
          <XAxis
            dataKey="t"
            tick={{ fill: "#64748b", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${Number(v).toFixed(0)}s`}
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fill: "#64748b", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${Number(v).toFixed(3)}`}
            width={56}
          />
          <Tooltip
            contentStyle={{
              background: "rgb(15 23 42 / 0.92)",
              border: "1px solid rgb(255 255 255 / 0.08)",
              borderRadius: "12px",
              fontSize: "12px",
              color: "#e2e8f0",
            }}
            formatter={(value) => {
              const v = typeof value === "number" ? value : Number(value ?? 0);
              return [`${v.toFixed(3)} V`, "Voltage"];
            }}
            labelFormatter={(label) => `t +${Number(label).toFixed(1)}s`}
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke="#67e8f9"
            strokeWidth={2}
            fill={`url(#${fillId})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
