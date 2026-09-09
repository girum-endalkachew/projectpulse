import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  variant?: "outline" | "solid";
}

export function Badge({ children, color = "#6366F1", variant = "outline" }: BadgeProps) {
  const bg = variant === "solid" ? color + "30" : "rgba(255, 255, 255, 0.03)";
  const border = color + "40";

  return (
    <span
      className="inline-flex items-center text-[10px] font-semibold px-2.5 py-0.5 rounded-full border transition-all"
      style={{
        backgroundColor: bg,
        borderColor: border,
        color: "#F3F4F6",
      }}
    >
      {children}
    </span>
  );
}