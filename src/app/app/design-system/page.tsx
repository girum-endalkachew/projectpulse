"use client";

import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function DesignSystemPage() {
  return (
    <AppShell>
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            Design System Showcase
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Dark Glassmorphism primitives for ProjectPulse command center.
          </p>
        </div>

        {/* Status Indicators Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">1. Status Indicators</h2>
          <div className="flex flex-wrap gap-4 glass-panel-2 p-6 rounded-3xl">
            <StatusIndicator status="operational" />
            <StatusIndicator status="degraded" />
            <StatusIndicator status="warning" />
            <StatusIndicator status="down" />
            <StatusIndicator status="unknown" />
          </div>
        </section>

        {/* Metric Cards Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">2. Metric Cards with Inline Sparklines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              label="Active Users Right Now"
              value="1,284"
              change="12%"
              isPositive={true}
              subValue="Peak baseline across nodes"
              trendData={[20, 35, 25, 45, 30, 55, 60, 50]}
              accentColor="#3B82F6"
            />
            <MetricCard
              label="API Latency"
              value="32ms"
              change="4ms"
              isPositive={true}
              subValue="Global average response time"
              trendData={[50, 48, 42, 38, 35, 32, 32]}
              accentColor="#EC4899"
            />
            <MetricCard
              label="Error Rate"
              value="0.02%"
              change="18%"
              isPositive={false}
              subValue="14 unresolved exceptions"
              trendData={[0.01, 0.01, 0.02, 0.05, 0.04, 0.02]}
              accentColor="#8B5CF6"
            />
          </div>
        </section>

        {/* Glass Levels Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">3. Glass Levels Hierarchy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard level={1}>
              <h3 className="font-bold text-white text-sm mb-1">Glass Level 1 (Subtle)</h3>
              <p className="text-xs text-gray-400">Low opacity surface background for embedded containers.</p>
            </GlassCard>
            <GlassCard level={2}>
              <h3 className="font-bold text-white text-sm mb-1">Glass Level 2 (Card Default)</h3>
              <p className="text-xs text-gray-400">Standard card panel with medium blur and subtle hover glow.</p>
            </GlassCard>
            <GlassCard level={3}>
              <h3 className="font-bold text-white text-sm mb-1">Glass Level 3 (Elevated)</h3>
              <p className="text-xs text-gray-400">High contrast translucent backdrop for flyouts & popovers.</p>
            </GlassCard>
          </div>
        </section>

        {/* Button Variants Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">4. Buttons & Badges</h2>
          <div className="flex flex-wrap items-center gap-4 glass-panel-2 p-6 rounded-3xl">
            <Button variant="primary">Primary Indigo</Button>
            <Button variant="secondary">Secondary Glass</Button>
            <Button variant="glass">Glass Panel</Button>
            <Button variant="danger">Danger Alert</Button>

            <div className="h-6 w-px bg-white/10 mx-2"></div>

            <Badge color="#3B82F6">ACA Academy</Badge>
            <Badge color="#EC4899">Sift Platform</Badge>
            <Badge color="#8B5CF6">ExamGuard</Badge>
            <Badge color="#06B6D4">Focus OS</Badge>
          </div>
        </section>
      </div>
    </AppShell>
  );
}