import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  UserRound,
} from "lucide-react";

function CityIllustration() {
  return (
    <svg
      className="city-illustration"
      viewBox="0 0 600 340"
      role="img"
      aria-label="Illustration of a neighborhood with shops, city buildings, and location pins"
    >
      <defs>
        <linearGradient id="signupCitySky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#26105d" />
          <stop offset="1" stopColor="#111d50" />
        </linearGradient>
        <linearGradient id="signupCityGround" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#123d70" />
          <stop offset="1" stopColor="#071733" />
        </linearGradient>
        <linearGradient id="signupStoreGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8beaff" />
          <stop offset="1" stopColor="#2794c7" />
        </linearGradient>
      </defs>
      <rect width="600" height="340" rx="18" fill="url(#signupCitySky)" />
      <circle cx="485" cy="68" r="44" fill="#7953d8" opacity=".18" />
      <path d="M0 228 600 208v132H0Z" fill="url(#signupCityGround)" />
      <path d="m0 302 600-70M0 326l600-69M72 340l93-117m90 117 45-121m92 121 8-126m85 126-37-132" stroke="#286296" strokeWidth="2" opacity=".7" />
      <g fill="#172b5d">
        <path d="M24 175h45v60H24z" />
        <path d="M80 145h34v91H80z" />
        <path d="M121 183h47v53h-47z" />
        <path d="M414 150h46v73h-46z" />
        <path d="M470 121h34v102h-34z" />
        <path d="M513 165h55v60h-55z" />
      </g>
      <g fill="#44c3f5" opacity=".65">
        <path d="M34 185h8v9h-8zm17 0h8v9h-8zm-17 17h8v9h-8zm17 0h8v9h-8z" />
        <path d="M89 157h7v10h-7zm16 0h7v10h-7zm-16 17h7v10h-7zm16 0h7v10h-7z" />
        <path d="M426 163h8v10h-8zm16 0h8v10h-8zm-16 17h8v10h-8zm16 0h8v10h-8z" />
        <path d="M480 135h7v10h-7zm15 0h7v10h-7zm-15 17h7v10h-7zm15 0h7v10h-7z" />
      </g>
      <path d="M35 284c98-56 162-18 226 2s149 18 306-67" fill="none" stroke="#28dbc4" strokeWidth="6" strokeLinecap="round" />
      <path d="M37 298c102-54 165-17 229 2s147 17 298-63" fill="none" stroke="#8bf6dd" strokeWidth="2" strokeDasharray="5 13" strokeLinecap="round" />
      <g transform="translate(282 153)">
        <path d="M0 34V93h126V34" fill="#fcfcff" />
        <path d="M-11 38 11 5h104l22 33Z" fill="#f3f0ff" />
        <path d="m-11 38 8-17h24l-8 17zm24 0 8-17h24l-1 17zm31 0 1-17h24l5 17zm31 0-5-17h24l11 17zm31 0-11-17h19l9 17z" fill="#f05a79" />
        <path d="M10 55h37v38H10z" fill="url(#signupStoreGlass)" />
        <path d="M59 53h51v40H59z" fill="#aeefff" />
        <path d="M67 61h17v18H67zm25 0h17v18H92z" fill="#2587b9" />
        <path d="M55 93V72a13 13 0 0 1 26 0v21" fill="#5b35bd" />
        <path d="M0 93h126v8H0z" fill="#f05a79" />
      </g>
      <g transform="translate(155 183)">
        <path d="M16 0C7 0 0 7 0 16c0 12 16 31 16 31s16-19 16-31C32 7 25 0 16 0Z" fill="#fb617e" />
        <circle cx="16" cy="16" r="6" fill="#fff" />
      </g>
      <g transform="translate(91 222) scale(.8)">
        <path d="M16 0C7 0 0 7 0 16c0 12 16 31 16 31s16-19 16-31C32 7 25 0 16 0Z" fill="#ffc36d" />
        <circle cx="16" cy="16" r="6" fill="#fff" />
      </g>
      <g transform="translate(234 126) scale(.72)">
        <path d="M16 0C7 0 0 7 0 16c0 12 16 31 16 31s16-19 16-31C32 7 25 0 16 0Z" fill="#9c70ff" />
        <circle cx="16" cy="16" r="6" fill="#fff" />
      </g>
    </svg>
  );
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notice, setNotice] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password !== confirmPassword) {
      setNotice("Passwords do not match.");
      return;
    }

    setNotice("Account creation is not connected yet.");
  }

  return (
    <main className="login-page">
      <section className="login-card signup-card" aria-label="GeoPulse create account">
        <div className="login-intro">
          <Link className="brand" to="/login" aria-label="GeoPulse sign in">
            <MapPin aria-hidden="true" />
            <span>GeoPulse</span>
          </Link>
          <p className="brand-tagline">
            Hyper-Local Retail
            <br />
            Mobility Analytics
          </p>
          <CityIllustration />
          <p className="intro-caption">Turn local movement into smarter decisions.</p>
        </div>

        <div className="login-form-panel">
          <div className="login-form-content signup-form-content">
            <header className="login-heading">
              <h1>Create Account</h1>
              <p>Join GeoPulse and explore your community</p>
            </header>

            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="fullName">Full Name</label>
              <div className="input-row">
                <UserRound className="field-icon" aria-hidden="true" />
                <input
                  autoComplete="name"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                  type="text"
                />
              </div>

              <label htmlFor="signupEmail">Email</label>
              <div className="input-row">
                <Mail className="field-icon" aria-hidden="true" />
                <input
                  autoComplete="email"
                  id="signupEmail"
                  name="email"
                  placeholder="Enter your email"
                  required
                  type="email"
                />
              </div>

              <label htmlFor="signupPassword">Password</label>
              <div className="input-row">
                <LockKeyhole className="field-icon" aria-hidden="true" />
                <input
                  autoComplete="new-password"
                  id="signupPassword"
                  name="password"
                  placeholder="Create a password"
                  minLength="8"
                  required
                  type={showPassword ? "text" : "password"}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="password-toggle"
                  onClick={() => setShowPassword((visible) => !visible)}
                  type="button"
                >
                  {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                </button>
              </div>

              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-row">
                <LockKeyhole className="field-icon" aria-hidden="true" />
                <input
                  autoComplete="new-password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  minLength="8"
                  required
                  type={showConfirmPassword ? "text" : "password"}
                />
                <button
                  aria-label={showConfirmPassword ? "Hide confirmed password" : "Show confirmed password"}
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  type="button"
                >
                  {showConfirmPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                </button>
              </div>

              <label className="terms-option" htmlFor="terms">
                <input id="terms" name="terms" required type="checkbox" />
                <span>
                  I agree to the <button className="text-link" type="button">Terms</button> and{" "}
                  <button className="text-link" type="button">Privacy Policy</button>
                </span>
              </label>

              <button className="sign-in-button" type="submit">
                Create Account
              </button>
              <p className="login-notice" aria-live="polite">
                {notice}
              </p>
            </form>

            <p className="signup-prompt">
              Already have an account?{" "}
              <Link className="text-link" to="/login">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
