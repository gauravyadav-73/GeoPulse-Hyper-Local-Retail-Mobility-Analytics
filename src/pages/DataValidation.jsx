import { Link } from "react-router-dom";
import {
  Activity,
  BarChart3,
  ChartPie,
  Check,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  MapPin,
  MapPinned,
  ShoppingBag,
  Upload,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Data Upload", icon: Upload, href: "/data-upload" },
  { label: "Data Preview", icon: FileText, href: "/data-preview" },
  { label: "Data Cleaning", icon: Activity, href: "/data-cleaning" },
  { label: "Data Validation", icon: ClipboardCheck, href: "/data-validation", active: true },
  { label: "Data Analysis", icon: BarChart3 },
  { label: "Mobility Analysis", icon: MapPinned },
  { label: "Retail Insights", icon: ShoppingBag },
  { label: "Visualizations", icon: ChartPie },
  { label: "Reports", icon: FileText },
];

const validationChecks = [
  { label: "File Format", result: "CSV (Valid)" },
  { label: "Required Columns", result: "All present" },
  { label: "Data Types", result: "Valid" },
  { label: "Missing Value Check", result: "Passed" },
  { label: "Duplicate Check", result: "Passed" },
];

export default function DataValidation() {
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
        <section aria-labelledby="validation-title" className="upload-content validation-content">
          <div className="upload-heading">
            <p className="upload-eyebrow">DATA MANAGEMENT</p>
            <h1 id="validation-title">Data Validation</h1>
            <p>Validate dataset quality and format.</p>
          </div>

          <section aria-label="Dataset validation results" className="validation-results">
            <ul className="validation-check-list">
              {validationChecks.map(({ label, result }) => (
                <li className="validation-check" key={label}>
                  <span aria-hidden="true" className="validation-check-icon">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="validation-check-label">{label}</span>
                  <span className="validation-check-result">{result}</span>
                </li>
              ))}
            </ul>

            <article aria-labelledby="validation-success-title" className="validation-success-card">
              <span aria-hidden="true" className="validation-success-icon">
                <Check size={30} strokeWidth={3.2} />
              </span>
              <h2 id="validation-success-title">Validation Successful</h2>
              <p>The dataset is valid and ready for analysis.</p>
            </article>
          </section>
        </section>
      </main>
    </div>
  );
}
