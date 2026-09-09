import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ level = 2, children, className = "", ...props }: GlassCardProps) {
  const styles = {
    1: "glass-subtle rounded-2xl",
    2: "glass-base rounded-[2rem]",
    3: "glass-base rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.6)]",
  };
  return (
    <div className={styles[level] + " relative overflow-hidden " + className} {...props}>
      {children}
    </div>
  );
}