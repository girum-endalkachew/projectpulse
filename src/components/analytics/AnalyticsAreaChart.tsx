"use client";

import { TimeSeriesPoint } from "@/types/telemetry";

interface ChartProps {
  data: TimeSeriesPoint[];
  accentColor?: string;
  metricKey?: "pageViews" | "activeUsers" | "apiRequests";
}

export function AnalyticsAreaChart({
  data,
  accentColor = "#6366F1",
  metricKey = "activeUsers",
}: ChartProps) {
  if (!data || data.length < 2) return null;

  const values = data.map((d) => d[metricKey]);
  const max = Math.max(...values) || 1;
  const min = Math.min(...values);

  const width = 800;
  const height = 240;

  const points = data
    .map((d, idx) => {
      const x = (idx / (data.length - 1)) * (width - 40) + 20;
      const y = height - ((d[metricKey] - min) / (max - min || 1)) * (height - 60) - 30;
      return x + "," + y;
    })
    .join(" ");

  const firstX = 20;
  const lastX = width - 20;
  const areaPoints = firstX + "," + (height - 10) + " " + points + " " + lastX + "," + (height - 10);

  const gradId = "area-grad-" + accentColor.replace("#", "");

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={"0 0 " + width + " " + height} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Fill Gradient Area */}
        <polygon fill={"url(#" + gradId + ")"} points={areaPoints} />

        {/* Line */}
        <polyline
          fill="none"
          stroke={accentColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />

        {/* Data Node Dots & Labels */}
        {data.map((d, idx) => {
          const x = (idx / (data.length - 1)) * (width - 40) + 20;
          const y = height - ((d[metricKey] - min) / (max - min || 1)) * (height - 60) - 30;

          return (
            <g key={d.label}>
              <circle cx={x} cy={y} r="5" fill="#0B0C10" stroke={accentColor} strokeWidth="3" />
              <text x={x} y={height - 5} textAnchor="middle" fill="#9CA3AF" fontSize="11" fontWeight="600">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}