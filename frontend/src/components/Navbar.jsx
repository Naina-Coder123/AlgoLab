import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, login, signup, logout } = useAuth();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isActive = (path) => location.pathname === path;

  const openLogin = () => {
    setIsLoginOpen(true);
    setAuthError("");
    document.body.classList.add("modal-open");
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
    setAuthError("");
    setEmail("");
    setPassword("");
    setAuthMode("login");
    document.body.classList.remove("modal-open");
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setAuthError("");
      setSubmitting(true);

      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      closeLogin();
      navigate("/dashboard");
    } catch (error) {
      setAuthError(error.message || "Google sign-in failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setAuthError("");
      setSubmitting(true);

      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);

      closeLogin();
      navigate("/dashboard");
    } catch (error) {
      setAuthError(error.message || "GitHub sign-in failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (!email || !password) {
      setAuthError("Please enter email and password.");
      return;
    }

    try {
      setSubmitting(true);

      if (authMode === "signup") {
        await signup(email, password);
      } else {
        await login(email, password);
      }

      closeLogin();
      navigate("/dashboard");
    } catch (error) {
      setAuthError(error.message || "Authentication failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <img
              src="/algolab-logo.png"
              alt="AlgoLab logo"
              className="navbar-logo"
            />
            <span>AlgoLab</span>
          </Link>
        </div>

        <div className="navbar-links">
          <Link className={isActive("/dashboard") ? "active" : ""} to="/dashboard">
            Dashboard
          </Link>
          <Link className={isActive("/visualizer") ? "active" : ""} to="/visualizer">
            Visualizer
          </Link>
          <Link className={isActive("/race") ? "active" : ""} to="/race">
            Race
          </Link>
          <Link className={isActive("/analyzer") ? "active" : ""} to="/analyzer">
            Analyzer
          </Link>
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <span className="nav-user-email">{user.email}</span>
              <button type="button" className="nav-login" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button type="button" className="nav-login" onClick={openLogin}>
                Login
              </button>

              <button
                type="button"
                className="nav-primary nav-link-btn"
                onClick={openLogin}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </nav>

      {isLoginOpen && (
        <div className="login-modal-overlay" onClick={closeLogin}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <div>
                <div className="brand-mark login-brand-mark">
                  <img
                    src="/algolab-logo.png"
                    alt="AlgoLab logo"
                    className="brand-mark-icon"
                  />
                  <span>AlgoLab</span>
                </div>

                <p className="login-modal-kicker">
                  {authMode === "signup" ? "Create account" : "Welcome back"}
                </p>
                <h2>
                  {authMode === "signup" ? "Sign up to AlgoLab" : "Sign in to AlgoLab"}
                </h2>
              </div>

              <button
                type="button"
                className="login-modal-close"
                onClick={closeLogin}
                aria-label="Close login modal"
              >
                ×
              </button>
            </div>

            {/* <p className="login-modal-text">
              {authMode === "signup"
                ? "Create your account to access the dashboard, visualizer, race mode, and analyzer."
                : "Sign in with your email and password to continue to your AlgoLab workspace."}
            </p> */}

            <form className="login-form" onSubmit={handleAuthSubmit}>
              <div className="login-field">
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="login-field">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {authError ? <p className="auth-error-text">{authError}</p> : null}

              <button
                type="submit"
                className="nav-primary login-submit-btn"
                disabled={submitting}
              >
                {submitting
                  ? "Please wait..."
                  : authMode === "signup"
                  ? "Create Account"
                  : "Continue"}
              </button>
            </form>

            <div className="social-auth-divider">
              <span>or continue with</span>
            </div>

            <div className="social-auth-grid">
              <button
                type="button"
                className="social-auth-btn"
                onClick={handleGoogleLogin}
                disabled={submitting}
              >
                <span className="social-auth-icon">G</span>
                <span>Google</span>
              </button>

              <button
                type="button"
                className="social-auth-btn"
                onClick={handleGithubLogin}
                disabled={submitting}
              >
                <span className="social-auth-icon">GH</span>
                <span>GitHub</span>
              </button>

              <button
                type="button"
                className="social-auth-btn social-auth-btn-disabled"
                disabled
              >
                <span className="social-auth-icon">in</span>
                <span>LinkedIn</span>
              </button>
            </div>

            <p className="login-helper-text">
              {authMode === "signup"
                ? "Already have an account?"
                : "Don’t have an account?"}{" "}
              <button
                type="button"
                className="auth-switch-btn"
                onClick={() =>
                  setAuthMode((prev) => (prev === "login" ? "signup" : "login"))
                }
              >
                {authMode === "signup" ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;