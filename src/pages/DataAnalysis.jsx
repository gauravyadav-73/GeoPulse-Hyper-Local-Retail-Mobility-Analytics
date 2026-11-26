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
  { store: "S001", location: "Mysuru", footfall: 16200, revenue: 68400, movements: 22800 },
  { store: "S002", location: "Mysuru", footfall: 14200, revenue: 47800, movements: 20300 },
  { store: "S003", location: "Bengaluru", footfall: 11300, revenue: 39200, movements: 16800 },
  { store: "S004", location: "Chennai", footfall: 12100, revenue: 41500, movements: 17600 },
  { store: "S005", location: "Bengaluru", footfall: 14800, revenue: 50300, movements: 21100 },
];

const periodSeries = {
  Daily: [
    { label: "Oct 25", multiplier: 0.8 },
    { label: "Oct 26", multiplier: 0.94 },
    { label: "Oct 27", multiplier: 0.88 },
    { label: "Oct 28", multiplier: 1.12 },
    { label: "Oct 29", multiplier: 1 },
  ],
  Weekly: [
    { label: "Week 1", multiplier: 0.74 },
    { label: "Week 2", multiplier: 0.88 },
    { label: "Week 3", multiplier: 0.91 },
    { label: "Week 4", multiplier: 1.08 },
    { label: "Week 5", multiplier: 1 },
  ],
  Monthly: [
    { label: "Jun", multiplier: 0.75 },
    { label: "Jul", multiplier: 0.83 },
    { label: "Aug", multiplier: 0.95 },
    { label: "Sep", multiplier: 1.06 },
    { label: "Oct", multiplier: 1 },
  ],
};

function formatMetricValue(value, metric) {
  const formattedValue = Math.round(Number(value)).toLocaleString();
  return metric === "Revenue" ? `$${formattedValue}` : formattedValue;
}

function formatAxisValue(value, metric) {
  const formattedValue = value >= 1000 ? `${value / 1000}K` : value;
  return metric === "Revenue" ? `$${formattedValue}` : formattedValue;
}

export default function DataAnalysis() {
  const [location, setLocation] = useState("All Locations");
  const [metric, setMetric] = useState("Footfall");
  const [period, setPeriod] = useState("Monthly");
  const selectedStores = storeData.filter(
    (store) => location === "All Locations" || store.location === location,
  );
  const activePeriodSeries = periodSeries[period];
  const metricKey = metric.toLowerCase();
  const latestPeriodMultiplier = activePeriodSeries[activePeriodSeries.length - 1].multiplier;
  const filteredStoreData = selectedStores.map((store) => ({
    store: store.store,
    [metricKey]: Math.round(store[metricKey] * latestPeriodMultiplier),
  }));
  const trendData = activePeriodSeries.map(({ label, multiplier }) => ({
    period: label,
    [metricKey]: Math.round(
      selectedStores.reduce((total, store) => total + store[metricKey] * multiplier, 0),
    ),
  }));

  return (
    <div className="upload-shell analysis-shell">
      <aside className="upload-sidebar analysis-sidebar">
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

      <main className="upload-main analysis-main">
        <section aria-labelledby="analysis-title" className="upload-content analysis-content analysis-surface">
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

          <section aria-label={`${metric} charts`} className="analysis-chart-grid">
            <article className="analysis-chart-card">
              <h2>{metric} by Store</h2>
              <div className="analysis-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredStoreData} margin={{ top: 10, right: 4, bottom: 0, left: -22 }}>
                    <CartesianGrid stroke="#f0edf4" strokeDasharray="3 5" vertical={false} />
                    <XAxis axisLine={false} dataKey="store" tick={{ fill: "#393445", fontSize: 11, fontWeight: 700 }} tickLine={false} />
                    <YAxis axisLine={false} domain={[0, "auto"]} tick={{ fill: "#777283", fontSize: 10 }} tickFormatter={(value) => formatAxisValue(value, metric)} tickLine={false} />
                    <Tooltip formatter={(value) => [formatMetricValue(value, metric), metric]} />
                    <Bar dataKey={metricKey} fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={34} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="analysis-chart-card">
              <h2>{metric} Trend</h2>
              <div className="analysis-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 10, right: 8, bottom: 0, left: -25 }}>
                    <CartesianGrid stroke="#f0edf4" strokeDasharray="3 5" vertical={false} />
                    <XAxis axisLine={false} dataKey="period" tick={{ fill: "#777283", fontSize: 10 }} tickLine={false} />
                    <YAxis axisLine={false} domain={[0, "auto"]} tick={{ fill: "#777283", fontSize: 10 }} tickFormatter={(value) => formatAxisValue(value, metric)} tickLine={false} />
                    <Tooltip formatter={(value) => [formatMetricValue(value, metric), metric]} />
                    <Line activeDot={{ r: 4, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }} dataKey={metricKey} dot={false} stroke="#18b885" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} type="monotone" />
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
