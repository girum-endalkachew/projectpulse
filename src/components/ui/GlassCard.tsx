import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3 | 4;
  hoverGlow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({
  level = 2,
  hoverGlow = true,
  children,
  className = "",
  ...props
}: GlassCardProps) {
  const levelStyles = {
    1: "glass-panel-1",
    2: "glass-panel-2",
    3: "glass-panel-3",
    4: "bg-black/80 backdrop-blur-3xl border border-white/20 shadow-2xl",
  };

  const glowStyle = hoverGlow
    ? "transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
    : "";

  return (
    <div
      className={levelStyles[level] + " " + glowStyle + " rounded-3xl p-6 relative overflow-hidden " + className}
      {...props}
    >
      {children}
    </div>
  );
}