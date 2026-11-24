import { useState } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  CalendarDays,
  ChartPie,
  ChevronDown,
  ClipboardCheck,
  Database,
  FileText,
  LayoutDashboard,
  MapPin,
  MapPinned,
  Menu,
  Search,
  ShoppingBag,
  Store,
  TrendingUp,
  Upload,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Data Upload", icon: Upload },
  { label: "Data Preview", icon: Database },
  { label: "Data Cleaning", icon: Activity, href: "/data-cleaning" },
  { label: "Data Validation", icon: ClipboardCheck },
  { label: "Data Analysis", icon: BarChart3, href: "/data-analysis" },
  { label: "Mobility Analysis", icon: MapPinned },
  { label: "Retail Insights", icon: ShoppingBag },
  { label: "Visualizations", icon: ChartPie },
  { label: "Reports", icon: FileText },
];

const footfallData = [
  { date: "Oct 1", movements: 14500 },
  { date: "Oct 5", movements: 22900 },
  { date: "Oct 9", movements: 19600 },
  { date: "Oct 13", movements: 32300 },
  { date: "Oct 17", movements: 27900 },
  { date: "Oct 21", movements: 35400 },
  { date: "Oct 25", movements: 33300 },
  { date: "Oct 29", movements: 48760 },
];

const areaData = [
  { name: "Residential", value: 36, color: "#7c4dff" },
  { name: "Commercial", value: 28, color: "#27a5e8" },
  { name: "Transport Hub", value: 20, color: "#f5bd38" },
  { name: "Others", value: 16, color: "#f27c58" },
];

const metrics = [
  {
    label: "Total Records",
    value: "1,325",
    icon: Database,
    tone: "blue",
    note: "Across all datasets",
  },
  {
    label: "Retail Locations",
    value: "125",
    icon: Store,
    tone: "purple",
    note: "Active locations",
  },
  {
    label: "Customer Movements",
    value: "48,760",
    icon: Users,
    tone: "green",
    note: "This month",
  },
  {
    label: "Footfall Growth",
    value: "+12.4%",
    icon: TrendingUp,
    tone: "orange",
    note: "Compared to last month",
    positive: true,
  },
];

function MetricCard({ metric }) {
  const Icon = metric.icon;

  return (
    <article className="dashboard-metric">
      <div className={`metric-icon metric-icon-${metric.tone}`}>
        <Icon aria-hidden="true" size={19} strokeWidth={2.2} />
      </div>
      <div className="metric-copy">
        <p className="metric-label">{metric.label}</p>
        <p className="metric-value">{metric.value}</p>
        <p className={`metric-note${metric.positive ? " metric-note-positive" : ""}`}>
          {metric.positive && <TrendingUp aria-hidden="true" size={13} />}
          {metric.note}
        </p>
      </div>
    </article>
  );
}

function DashboardSidebar({ open, onClose }) {
  return (
    <>
      <button
        aria-label="Close navigation"
        className={`sidebar-backdrop${open ? " sidebar-backdrop-visible" : ""}`}
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        type="button"
      />
      <aside className={`dashboard-sidebar${open ? " dashboard-sidebar-open" : ""}`}>
        <a aria-label="GeoPulse dashboard" className="dashboard-brand" href="/dashboard">
          <span className="dashboard-brand-mark">
            <MapPin aria-hidden="true" size={20} fill="currentColor" />
          </span>
          <span className="dashboard-brand-name">GeoPulse</span>
        </a>
        <p className="dashboard-brand-caption">Hyper-Local Retail<br />Mobility Analytics</p>

        <nav aria-label="Main navigation" className="dashboard-nav">
          <p className="dashboard-nav-heading">WORKSPACE</p>
          {navigation.map(({ label, icon: Icon, active, href }) => (
            <a
              aria-current={active ? "page" : undefined}
              aria-disabled={!active && label !== "Data Upload" && label !== "Data Preview" && label !== "Data Cleaning" && label !== "Data Analysis"}
              className={`dashboard-nav-link${active ? " dashboard-nav-link-active" : ""}`}
              href={
                href
                  || (label === "Dashboard"
                    ? "/dashboard"
                    : label === "Data Upload"
                      ? "/data-upload"
                      : label === "Data Preview"
                        ? "/data-preview"
                        : undefined)
              }
              key={label}
              onClick={active || label === "Data Upload" || label === "Data Preview" || label === "Data Cleaning" || label === "Data Analysis" ? onClose : (event) => event.preventDefault()}
              tabIndex={active || label === "Data Upload" || label === "Data Preview" || label === "Data Cleaning" || label === "Data Analysis" ? 0 : -1}
            >
              <Icon aria-hidden="true" size={17} strokeWidth={2} />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <span className="sidebar-help-icon"><MapPin aria-hidden="true" size={17} /></span>
            <div>
              <strong>Know your neighborhood</strong>
              <span>Make every location count.</span>
            </div>
          </div>
          <button className="sidebar-account" type="button">
            <span className="user-avatar user-avatar-sidebar">SK</span>
            <span className="sidebar-account-copy">
              <strong>Sahana K C</strong>
              <span>Administrator</span>
            </span>
            <ChevronDown aria-hidden="true" size={15} />
          </button>
        </div>
      </aside>
    </>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-shell">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            aria-label="Open navigation"
            className="dashboard-menu-button"
            onClick={() => setSidebarOpen(true)}
            type="button"
          >
            <Menu aria-hidden="true" size={21} />
          </button>
          <label className="dashboard-search">
            <Search aria-hidden="true" size={17} />
            <input aria-label="Search dashboard" placeholder="Search..." type="search" />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar-actions">
            <button aria-label="Notifications" className="topbar-icon-button" type="button">
              <Bell aria-hidden="true" size={18} />
              <span className="notification-dot" />
            </button>
            <span aria-hidden="true" className="topbar-divider" />
            <button className="topbar-profile" type="button">
              <span className="user-avatar">SK</span>
              <span className="topbar-profile-name">Sahana K C</span>
              <ChevronDown aria-hidden="true" size={15} />
            </button>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="dashboard-heading-row">
            <div>
              <p className="dashboard-eyebrow">OVERVIEW</p>
              <h1>Dashboard</h1>
              <p className="dashboard-subtitle">
                Overview of retail mobility and business performance
              </p>
            </div>
            <button className="date-range-button" type="button">
              <CalendarDays aria-hidden="true" size={16} />
              <span>Oct 1, 2026 – Oct 31, 2026</span>
              <ChevronDown aria-hidden="true" size={15} />
            </button>
          </div>

          <section aria-label="Key performance indicators" className="dashboard-metrics">
            {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
          </section>

          <section aria-label="Mobility analytics" className="dashboard-charts">
            <article className="dashboard-panel footfall-panel">
              <div className="panel-heading">
                <div>
                  <h2>Footfall Trend</h2>
                  <p>Customer movements over time</p>
                </div>
                <button aria-label="Footfall chart options" className="panel-more-button" type="button">
                  <ChevronDown aria-hidden="true" size={18} />
                </button>
              </div>
              <div className="chart-container footfall-chart">
                <ResponsiveContainer height="100%" width="100%">
                  <AreaChart
                    data={footfallData}
                    margin={{ top: 8, right: 12, bottom: 0, left: -12 }}
                  >
                    <defs>
                      <linearGradient id="footfallFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#854cff" stopOpacity={0.24} />
                        <stop offset="100%" stopColor="#854cff" stopOpacity={0.015} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#eeebf5" strokeDasharray="3 5" vertical={false} />
                    <XAxis
                      axisLine={false}
                      dataKey="date"
                      tick={{ fill: "#858198", fontSize: 11 }}
                      tickLine={false}
                      tickMargin={10}
                    />
                    <YAxis
                      axisLine={false}
                      domain={[0, 50000]}
                      tick={{ fill: "#858198", fontSize: 11 }}
                      tickFormatter={(value) => `${value / 1000}K`}
                      tickLine={false}
                      tickMargin={8}
                      ticks={[0, 10000, 20000, 30000, 40000, 50000]}
                    />
                    <Tooltip
                      contentStyle={{
                        border: "1px solid #ece8f4",
                        borderRadius: 10,
                        boxShadow: "0 8px 24px rgba(34, 20, 72, .12)",
                        fontSize: 12,
                      }}
                      formatter={(value) => [Number(value).toLocaleString(), "Movements"]}
                    />
                    <Area
                      activeDot={{ r: 5, fill: "#7542ed", stroke: "#fff", strokeWidth: 2 }}
                      dataKey="movements"
                      fill="url(#footfallFill)"
                      stroke="#7542ed"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      type="monotone"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="dashboard-panel movement-panel">
              <div className="panel-heading">
                <div>
                  <h2>Movement by Area</h2>
                  <p>Customer distribution by location</p>
                </div>
                <button aria-label="Movement chart options" className="panel-more-button" type="button">
                  <ChevronDown aria-hidden="true" size={18} />
                </button>
              </div>
              <div className="movement-chart-layout">
                <div className="chart-container donut-chart">
                  <ResponsiveContainer height="100%" width="100%">
                    <PieChart>
                      <Pie
                        data={areaData}
                        dataKey="value"
                        innerRadius="64%"
                        outerRadius="88%"
                        paddingAngle={3}
                        stroke="none"
                      >
                        {areaData.map((area) => (
                          <Cell fill={area.color} key={area.name} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          border: "1px solid #ece8f4",
                          borderRadius: 10,
                          boxShadow: "0 8px 24px rgba(34, 20, 72, .12)",
                          fontSize: 12,
                        }}
                        formatter={(value) => [`${value}%`, "Share"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="donut-center" aria-label="48,760 total movements">
                    <strong>48,760</strong>
                    <span>Movements</span>
                  </div>
                </div>
                <ul className="area-legend">
                  {areaData.map((area) => (
                    <li key={area.name}>
                      <span className="legend-name">
                        <span className="legend-dot" style={{ backgroundColor: area.color }} />
                        {area.name}
                      </span>
                      <strong>{area.value}%</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </section>

          <footer className="dashboard-footer">
            <span><Activity aria-hidden="true" size={14} /> Data refreshed just now</span>
            <span>GeoPulse Analytics</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
