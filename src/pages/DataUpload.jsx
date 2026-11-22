import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  BarChart3,
  ChartPie,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  FileUp,
  LayoutDashboard,
  MapPin,
  MapPinned,
  ShoppingBag,
  Upload,
  UploadCloud,
  X,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Data Upload", icon: Upload, href: "/data-upload", active: true },
  { label: "Data Preview", icon: FileText, href: "/data-preview" },
  { label: "Data Cleaning", icon: Activity, href: "/data-cleaning" },
  { label: "Data Validation", icon: ClipboardCheck },
  { label: "Data Analysis", icon: BarChart3 },
  { label: "Mobility Analysis", icon: MapPinned },
  { label: "Retail Insights", icon: ShoppingBag },
  { label: "Visualizations", icon: ChartPie },
  { label: "Reports", icon: FileText },
];

const MAX_FILE_SIZE = 50 * 1024 * 1024;

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DataUpload() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  function chooseFile(candidate) {
    if (!candidate) return;

    if (!candidate.name.toLowerCase().endsWith(".csv")) {
      setError("Please choose a CSV file.");
      setNotice("");
      return;
    }

    if (candidate.size > MAX_FILE_SIZE) {
      setError("This file is larger than 50 MB. Choose a smaller CSV file.");
      setNotice("");
      return;
    }

    setFile(candidate);
    setError("");
    setNotice("");
  }

  function handleFileInput(event) {
    chooseFile(event.target.files?.[0]);
    event.target.value = "";
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    chooseFile(event.dataTransfer.files?.[0]);
  }

  function handleUpload() {
    if (!file) return;
    setNotice("Your file is ready, but the upload service is not connected yet.");
  }

  function removeFile() {
    setFile(null);
    setError("");
    setNotice("");
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
        <section aria-labelledby="upload-title" className="upload-content">
          <div className="upload-heading">
            <p className="upload-eyebrow">DATA MANAGEMENT</p>
            <h1 id="upload-title">Data Upload</h1>
            <p>Upload your retail and mobility data in CSV format.</p>
          </div>

          <div className="upload-panel">
            <div
              className={`upload-dropzone${isDragging ? " upload-dropzone-active" : ""}`}
              onDragEnter={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                setIsDragging(false);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                accept=".csv,text/csv"
                className="upload-file-input"
                onChange={handleFileInput}
                ref={fileInputRef}
                type="file"
              />
              <span className="upload-cloud-icon">
                <UploadCloud aria-hidden="true" size={38} strokeWidth={1.8} />
              </span>
              <p className="upload-drop-title">Drag and drop your file here</p>
              <p className="upload-drop-browse">
                or{" "}
                <button onClick={() => fileInputRef.current?.click()} type="button">
                  click to browse
                </button>
              </p>
              <p className="upload-formats">Supported format: CSV (Max 50 MB)</p>
            </div>

            {file && (
              <div className="upload-file-row">
                <span className="upload-file-icon"><FileUp aria-hidden="true" size={19} /></span>
                <span className="upload-file-details">
                  <strong title={file.name}>{file.name}</strong>
                  <small>{formatFileSize(file.size)}</small>
                </span>
                <CheckCircle2 aria-label="File ready" className="upload-file-check" size={20} />
                <button
                  aria-label={`Remove ${file.name}`}
                  className="upload-remove-button"
                  onClick={removeFile}
                  type="button"
                >
                  <X aria-hidden="true" size={16} />
                </button>
              </div>
            )}

            <div aria-live="polite" className={`upload-feedback${error ? " upload-feedback-error" : ""}`}>
              {error || notice}
            </div>

            <button
              className="upload-submit-button"
              disabled={!file}
              onClick={handleUpload}
              type="button"
            >
              <Upload aria-hidden="true" size={17} />
              Upload Dataset
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
