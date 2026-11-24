import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  BarChart3,
  ChartPie,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  MapPin,
  MapPinned,
  ShoppingBag,
  Upload,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Data Upload", icon: Upload, href: "/data-upload" },
  { label: "Data Preview", icon: FileText, href: "/data-preview" },
  { label: "Data Cleaning", icon: Activity, href: "/data-cleaning" },
  { label: "Data Validation", icon: ClipboardCheck },
  { label: "Data Analysis", icon: BarChart3, href: "/data-analysis", active: true },
  { label: "Mobility Analysis", icon: MapPinned },
  { label: "Retail Insights", icon: ShoppingBag },
  { label: "Visualizations", icon: ChartPie },
  { label: "Reports", icon: FileText },
];

const storeData = [
  { store: "S001", footfall: 16200 },
  { store: "S002", footfall: 14200 },
  { store: "S003", footfall: 11300 },
  { store: "S004", footfall: 12100 },
  { store: "S005", footfall: 14800 },
];

const trendData = [
  { period: "Oct 1", footfall: 18500 },
  { period: "Oct 8", footfall: 26100 },
  { period: "Oct 15", footfall: 23200 },
  { period: "Oct 22", footfall: 30400 },
  { period: "Oct 29", footfall: 27800 },
];

export default function DataAnalysis() {
  const [location, setLocation] = useState("All Locations");
  const [metric, setMetric] = useState("Footfall");
  const [period, setPeriod] = useState("Monthly");

  return (
    <div className="upload-shell">
      <aside className="upload-sidebar">
        <Link aria-label="GeoPulse dashboard" className="upload-brand" to="/dashboard">
          <span className="upload-brand-mark">
            <MapPin aria-hidden="true" size={19} fill="currentColor" />
          </span>
          <span>GeoPulse</span>
        </Link>
        <p className="upload-brand-caption">Hyper-Local Retail<br />Mobility Analytics</p>

        <nav aria-label="Main navigation" className="upload-nav">
          <p className="upload-nav-heading">WORKSPACE</p>
          {navigation.map(({ label, icon: Icon, href, active }) => (
            href ? (
              <Link
                aria-current={active ? "page" : undefined}
                className={`upload-nav-link${active ? " upload-nav-link-active" : ""}`}
                key={label}
                to={href}
              >
                <Icon aria-hidden="true" size={17} strokeWidth={2} />
                <span>{label}</span>
              </Link>
            ) : (
              <span aria-disabled="true" className="upload-nav-link upload-nav-link-disabled" key={label}>
                <Icon aria-hidden="true" size={17} strokeWidth={2} />
                <span>{label}</span>
              </span>
            )
          ))}
        </nav>

        <div className="upload-sidebar-footer">
          <span className="upload-user-avatar">SK</span>
          <span><strong>Sahana K C</strong><small>Administrator</small></span>
        </div>
      </aside>

      <main className="upload-main">
        <section aria-labelledby="analysis-title" className="upload-content analysis-content">
          <div className="upload-heading analysis-heading">
            <h1 id="analysis-title">Data Analysis</h1>
            <p>Analyze retail and mobility data to identify trends</p>
          </div>

          <section aria-label="Analysis filters" className="analysis-filters">
            <label>
              <span>Location</span>
              <select value={location} onChange={(event) => setLocation(event.target.value)}>
                <option>All Locations</option>
                <option>Mysuru</option>
                <option>Bengaluru</option>
                <option>Chennai</option>
              </select>
            </label>
            <label>
              <span>Metric</span>
              <select value={metric} onChange={(event) => setMetric(event.target.value)}>
                <option>Footfall</option>
                <option>Revenue</option>
                <option>Movements</option>
              </select>
            </label>
            <label>
              <span>Period</span>
              <select value={period} onChange={(event) => setPeriod(event.target.value)}>
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>
            </label>
          </section>

          <section aria-label="Footfall charts" className="analysis-chart-grid">
            <article className="analysis-chart-card">
              <h2>Footfall by Store</h2>
              <div className="analysis-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={storeData} margin={{ top: 10, right: 4, bottom: 0, left: -22 }}>
                    <CartesianGrid stroke="#f0edf4" strokeDasharray="3 5" vertical={false} />
                    <XAxis axisLine={false} dataKey="store" tick={{ fill: "#393445", fontSize: 11, fontWeight: 700 }} tickLine={false} />
                    <YAxis axisLine={false} domain={[0, 20000]} ticks={[0, 5000, 10000, 15000, 20000]} tick={{ fill: "#777283", fontSize: 10 }} tickFormatter={(value) => `${value / 1000}K`} tickLine={false} />
                    <Tooltip formatter={(value) => [Number(value).toLocaleString(), metric]} />
                    <Bar dataKey="footfall" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={34} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="analysis-chart-card">
              <h2>Footfall Trend</h2>
              <div className="analysis-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 10, right: 8, bottom: 0, left: -25 }}>
                    <CartesianGrid stroke="#f0edf4" strokeDasharray="3 5" vertical={false} />
                    <XAxis axisLine={false} dataKey="period" tick={{ fill: "#777283", fontSize: 10 }} tickLine={false} />
                    <YAxis axisLine={false} domain={[0, 40000]} ticks={[0, 10000, 20000, 30000, 40000]} tick={{ fill: "#777283", fontSize: 10 }} tickFormatter={(value) => `${value / 1000}K`} tickLine={false} />
                    <Tooltip formatter={(value) => [Number(value).toLocaleString(), metric]} />
                    <Line activeDot={{ r: 4, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }} dataKey="footfall" dot={false} stroke="#18b885" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} type="monotone" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>
          </section>
        </section>
      </main>
    </div>
  );
}
