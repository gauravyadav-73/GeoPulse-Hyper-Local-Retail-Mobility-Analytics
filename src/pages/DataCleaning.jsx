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
  WandSparkles,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Data Upload", icon: Upload, href: "/data-upload" },
  { label: "Data Preview", icon: FileText, href: "/data-preview" },
  { label: "Data Cleaning", icon: Activity, href: "/data-cleaning", active: true },
  { label: "Data Validation", icon: ClipboardCheck },
  { label: "Data Analysis", icon: BarChart3 },
  { label: "Mobility Analysis", icon: MapPinned },
  { label: "Retail Insights", icon: ShoppingBag },
  { label: "Visualizations", icon: ChartPie },
  { label: "Reports", icon: FileText },
];

const issueGroups = [
  { id: "missing", label: "Missing Values", count: 58 },
  { id: "duplicates", label: "Duplicate Records", count: 24 },
  { id: "invalid", label: "Invalid Entries", count: 7 },
];

export default function DataCleaning() {
  const [actions, setActions] = useState({
    missing: true,
    duplicates: true,
    inconsistent: true,
    location: true,
  });
  const [notice, setNotice] = useState("");

  function toggleAction(key) {
    setActions((current) => ({ ...current, [key]: !current[key] }));
    setNotice("");
  }

  function cleanData() {
    const enabledCount = Object.values(actions).filter(Boolean).length;
    setNotice(
      enabledCount
        ? `${enabledCount} cleaning actions are ready to process.`
        : "Select at least one cleaning action.",
    );
  }

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
        <section aria-labelledby="cleaning-title" className="upload-content cleaning-content">
          <div className="upload-heading">
            <p className="upload-eyebrow">DATA MANAGEMENT</p>
            <h1 id="cleaning-title">Data Cleaning</h1>
            <p>Handle missing values, duplicates, and inconsistencies</p>
          </div>

          <section aria-label="Data quality issues" className="cleaning-summary">
            {issueGroups.map((issue) => (
              <article className="cleaning-stat-card" key={issue.id}>
                <p>{issue.label}</p>
                <strong>{issue.count}</strong>
              </article>
            ))}
          </section>

          <section aria-labelledby="cleaning-actions-title" className="cleaning-actions-panel">
            <h2 id="cleaning-actions-title">Cleaning Actions</h2>
            <div className="cleaning-options">
              <label className="cleaning-option">
                <input checked={actions.missing} onChange={() => toggleAction("missing")} type="checkbox" />
                <span>Remove missing values (mean/median)</span>
              </label>
              <label className="cleaning-option">
                <input checked={actions.duplicates} onChange={() => toggleAction("duplicates")} type="checkbox" />
                <span>Remove duplicate records</span>
              </label>
              <label className="cleaning-option">
                <input checked={actions.inconsistent} onChange={() => toggleAction("inconsistent")} type="checkbox" />
                <span>Fix inconsistent formats</span>
              </label>
              <label className="cleaning-option">
                <input checked={actions.location} onChange={() => toggleAction("location")} type="checkbox" />
                <span>Standardize location names</span>
              </label>
            </div>

            <div aria-live="polite" className="cleaning-feedback">{notice}</div>

            <button className="cleaning-submit-button" onClick={cleanData} type="button">
              <WandSparkles aria-hidden="true" size={16} />
              Clean Data
            </button>
          </section>
        </section>
      </main>
    </div>
  );
}
