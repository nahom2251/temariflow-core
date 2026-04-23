import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { TrendingUp, Users, GraduationCap, Activity, Wallet } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart, Area,
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — TemariFlow" }] }),
  component: Analytics,
});

const REVENUE = [
  { m: "Nov", revenue: 142000, target: 150000 },
  { m: "Dec", revenue: 168000, target: 160000 },
  { m: "Jan", revenue: 195000, target: 175000 },
  { m: "Feb", revenue: 211000, target: 200000 },
  { m: "Mar", revenue: 248000, target: 220000 },
  { m: "Apr", revenue: 287000, target: 250000 },
];

const ATTENDANCE = [
  { d: "Mon", rate: 96.2 },
  { d: "Tue", rate: 95.8 },
  { d: "Wed", rate: 97.1 },
  { d: "Thu", rate: 94.6 },
  { d: "Fri", rate: 93.2 },
  { d: "Mon", rate: 95.5 },
  { d: "Tue", rate: 96.8 },
];

const GROWTH = [
  { m: "Nov", students: 5840 },
  { m: "Dec", students: 6120 },
  { m: "Jan", students: 6480 },
  { m: "Feb", students: 6790 },
  { m: "Mar", students: 7150 },
  { m: "Apr", students: 7421 },
];

const PERFORMANCE = [
  { subj: "Math", t1: 72, t2: 75, t3: 79 },
  { subj: "English", t1: 80, t2: 82, t3: 85 },
  { subj: "Physics", t1: 68, t2: 71, t3: 74 },
  { subj: "Biology", t1: 76, t2: 78, t3: 81 },
  { subj: "Chemistry", t1: 64, t2: 68, t3: 70 },
  { subj: "Amharic", t1: 84, t2: 86, t3: 89 },
];

const ACTIVE_USERS = [
  { d: "Apr 15", users: 1820 },
  { d: "Apr 16", users: 1940 },
  { d: "Apr 17", users: 2010 },
  { d: "Apr 18", users: 2180 },
  { d: "Apr 19", users: 1450 },
  { d: "Apr 20", users: 1280 },
  { d: "Apr 21", users: 2240 },
];

function Analytics() {
  return (
    <div>
      <PageHeader title="Analytics" description="Platform metrics, trends, and performance insights." />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="MRR" value="ETB 287K" icon={Wallet} tone="primary" trend="+15.7%" />
        <StatCard label="Active schools" value="142" icon={GraduationCap} tone="success" trend="+4.2%" />
        <StatCard label="Total students" value="7,421" icon={Users} tone="primary" trend="+3.8%" />
        <StatCard label="Avg attendance" value="95.5%" icon={Activity} tone="warning" trend="+0.4%" />
        <StatCard label="DAU" value="2.2K" icon={TrendingUp} tone="success" trend="+9.1%" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Revenue vs target" subtitle="Last 6 months · ETB">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={REVENUE} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => `${v / 1000}K`} />
              <Tooltip {...tooltipProps} formatter={(v: number) => `ETB ${v.toLocaleString()}`} />
              <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#revFill)" />
              <Line type="monotone" dataKey="target" stroke="var(--color-muted-foreground)" strokeDasharray="4 4" dot={false} strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Attendance trend" subtitle="Daily school-wide rate">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={ATTENDANCE} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis domain={[88, 100]} stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => `${v}%`} />
              <Tooltip {...tooltipProps} formatter={(v: number) => `${v}%`} />
              <Line type="monotone" dataKey="rate" stroke="var(--color-success)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--color-success)" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Student growth" subtitle="Total enrolled students">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={GROWTH} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="growFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip {...tooltipProps} />
              <Area type="monotone" dataKey="students" stroke="var(--color-accent)" strokeWidth={2.5} fill="url(#growFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Performance trends" subtitle="Subject averages by term">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={PERFORMANCE} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="subj" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis domain={[50, 100]} stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip {...tooltipProps} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="t1" name="Term 1" fill="var(--color-muted-foreground)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="t2" name="Term 2" fill="var(--color-primary-glow)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="t3" name="Term 3" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Active users" subtitle="Last 7 days" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={ACTIVE_USERS} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="usersFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-warning)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-warning)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip {...tooltipProps} />
              <Area type="monotone" dataKey="users" stroke="var(--color-warning)" strokeWidth={2.5} fill="url(#usersFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

const tooltipProps = {
  contentStyle: {
    backgroundColor: "var(--color-popover)",
    border: "1px solid var(--color-border)",
    borderRadius: "0.5rem",
    fontSize: "12px",
    color: "var(--color-popover-foreground)",
  },
  cursor: { fill: "var(--color-muted)", opacity: 0.4 },
};

function ChartCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={`p-5 ${className || ""}`}>
      <div className="mb-4">
        <h3 className="font-display text-base font-semibold">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </Card>
  );
}
