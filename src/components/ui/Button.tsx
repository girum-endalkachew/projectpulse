import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-xs gap-2",
    lg: "px-6 py-3 text-sm gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] border border-indigo-400/30",
    secondary: "bg-white/10 hover:bg-white/15 text-white border border-white/10",
    glass: "glass-panel-1 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10",
    danger: "bg-rose-600/80 hover:bg-rose-500 text-white border border-rose-400/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]",
  };

  return (
    <button className={base + " " + sizeStyles[size] + " " + variantStyles[variant] + " " + className} {...props}>
      {children}
    </button>
  );
}