import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  BarChart3,
  ChartPie,
  ChevronRight,
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
  { label: "Data Preview", icon: FileText, href: "/data-preview", active: true },
  { label: "Data Cleaning", icon: Activity, href: "/data-cleaning" },
  { label: "Data Validation", icon: ClipboardCheck },
  { label: "Data Analysis", icon: BarChart3 },
  { label: "Mobility Analysis", icon: MapPinned },
  { label: "Retail Insights", icon: ShoppingBag },
  { label: "Visualizations", icon: ChartPie },
  { label: "Reports", icon: FileText },
];

const previewRows = [
  { storeId: "S001", location: "Mysuru", timestamp: "2026-10-10 10:24", customerId: "C1001", movementType: "Entry" },
  { storeId: "S001", location: "Mysuru", timestamp: "2026-10-10 10:37", customerId: "C1001", movementType: "Exit" },
  { storeId: "S002", location: "Bengaluru", timestamp: "2026-10-10 11:05", customerId: "C1002", movementType: "Entry" },
  { storeId: "S002", location: "Bengaluru", timestamp: "2026-10-10 11:47", customerId: "C1002", movementType: "Exit" },
  { storeId: "S003", location: "Chennai", timestamp: "2026-10-10 12:12", customerId: "C1003", movementType: "Entry" },
  { storeId: "S003", location: "Chennai", timestamp: "2026-10-10 12:45", customerId: "C1003", movementType: "Exit" },
  { storeId: "S004", location: "Hyderabad", timestamp: "2026-10-10 13:08", customerId: "C1004", movementType: "Entry" },
  { storeId: "S004", location: "Hyderabad", timestamp: "2026-10-10 13:36", customerId: "C1004", movementType: "Exit" },
  { storeId: "S005", location: "Pune", timestamp: "2026-10-10 14:02", customerId: "C1005", movementType: "Entry" },
  { storeId: "S005", location: "Pune", timestamp: "2026-10-10 14:29", customerId: "C1005", movementType: "Exit" },
  { storeId: "S006", location: "Mumbai", timestamp: "2026-10-10 15:14", customerId: "C1006", movementType: "Entry" },
  { storeId: "S006", location: "Mumbai", timestamp: "2026-10-10 15:52", customerId: "C1006", movementType: "Exit" },
];

const totalRecords = 1325;
const pageSize = 4;
const pageCount = Math.ceil(previewRows.length / pageSize);

function PreviewSidebar() {
  return (
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
  );
}

export default function DataPreview() {
  const [page, setPage] = useState(1);
  const firstRow = (page - 1) * pageSize;
  const visibleRows = previewRows.slice(firstRow, firstRow + pageSize);
  const rangeEnd = Math.min(firstRow + visibleRows.length, totalRecords);

  return (
    <div className="upload-shell">
      <PreviewSidebar />

      <main className="upload-main">
        <section aria-labelledby="preview-title" className="upload-content preview-content">
          <div className="upload-heading">
            <p className="upload-eyebrow">DATA MANAGEMENT</p>
            <h1 id="preview-title">Data Preview</h1>
            <p>Review the uploaded dataset.</p>
          </div>

          <section aria-label="Dataset summary" className="preview-summary">
            <article className="preview-stat-card">
              <p>Total Records</p>
              <strong>1,325</strong>
            </article>
            <article className="preview-stat-card">
              <p>Total Columns</p>
              <strong>12</strong>
            </article>
            <article className="preview-stat-card preview-file-card">
              <p>File Name</p>
              <strong title="retail_mobility_data.csv">retail_mobility_data.csv</strong>
            </article>
          </section>

          <section aria-label="Dataset rows" className="preview-table-panel">
            <div className="preview-table-scroll">
              <table className="preview-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Store_ID</th>
                    <th scope="col">Location</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col">Customer_ID</th>
                    <th scope="col">Movement_Type</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row, index) => (
                    <tr key={`${row.storeId}-${row.timestamp}`}>
                      <td>{firstRow + index + 1}</td>
                      <td>{row.storeId}</td>
                      <td>{row.location}</td>
                      <td>{row.timestamp}</td>
                      <td>{row.customerId}</td>
                      <td>{row.movementType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="preview-pagination">
              <p aria-live="polite">
                Showing {firstRow + 1}–{rangeEnd} of {totalRecords.toLocaleString()} records
              </p>
              <nav aria-label="Dataset pages" className="preview-page-controls">
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    aria-current={pageNumber === page ? "page" : undefined}
                    className={`preview-page-button${pageNumber === page ? " preview-page-button-active" : ""}`}
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    type="button"
                  >
                    {pageNumber}
                  </button>
                ))}
                <span aria-hidden="true" className="preview-page-ellipsis">…</span>
                <button
                  aria-label="Next page"
                  className="preview-page-button preview-next-button"
                  disabled={page === pageCount}
                  onClick={() => setPage((currentPage) => Math.min(currentPage + 1, pageCount))}
                  type="button"
                >
                  <ChevronRight aria-hidden="true" size={17} />
                </button>
              </nav>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
