import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, LogOut, Mail, User as UserIcon } from "lucide-react";
import Section from "../components/common/Section";
import Button from "../components/common/Button";
import FormField from "../components/common/FormField";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const EMPTY_LOGIN = { email: "", password: "" };
const EMPTY_SIGNUP = { name: "", email: "", password: "" };

/**
 * "/account" — signed out shows a Login/Signup form backed by
 * AuthContext (mock, localStorage-based, same pattern as
 * cartService/wishlistService); signed in shows the profile with a
 * sign-out action. A real submit handler either way, not a dead end.
 */
const Account = () => {
  const { user, isLoading, isAuthenticated, login, signup, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState(EMPTY_LOGIN);
  const [signupForm, setSignupForm] = useState(EMPTY_SIGNUP);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateLoginField = (field) => (e) => {
    setError("");
    setLoginForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const updateSignupField = (field) => (e) => {
    setError("");
    setSignupForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(loginForm);
      showToast("Welcome back!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await signup(signupForm);
      showToast("Account created — welcome!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    showToast("Signed out");
  };

  if (isLoading) {
    return (
      <Section tone="canvas" className="min-h-[50vh]">
        <p className="py-16 text-center text-sm text-ink-500">Loading…</p>
      </Section>
    );
  }

  return (
    <Section tone="canvas" className="min-h-[60vh]">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex items-center gap-1.5 text-xs text-ink-500"
      >
        <Link to="/" className="hover:text-navy-700">
          Home
        </Link>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="font-medium text-ink-900">Account</span>
      </nav>

      <div className="mx-auto max-w-md">
        {isAuthenticated ? (
          <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-500">
                <UserIcon size={22} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-ink-900">
                  {user.name}
                </p>
                <p className="flex items-center gap-1.5 truncate text-xs text-ink-500">
                  <Mail size={12} aria-hidden="true" className="shrink-0" />
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5 border-t border-line pt-5">
              <Button href="/wishlist" variant="outline" size="sm">
                Wishlist
              </Button>
              <Button href="/cart" variant="outline" size="sm">
                Cart
              </Button>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-line py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-danger/40 hover:text-danger"
            >
              <LogOut size={15} aria-hidden="true" />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <div className="mb-5 flex rounded-full bg-navy-50 p-1">
              {["login", "signup"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setMode(tab);
                    setError("");
                  }}
                  className={`flex-1 rounded-full py-2 text-xs font-bold transition-colors ${
                    mode === tab ? "bg-navy-800 text-white" : "text-ink-600"
                  }`}
                >
                  {tab === "login" ? "Log In" : "Sign Up"}
                </button>
              ))}
            </div>

            {error && (
              <p className="mb-4 rounded-lg bg-danger/10 px-3 py-2 text-xs font-medium text-danger">
                {error}
              </p>
            )}

            {mode === "login" ? (
              <form onSubmit={handleLogin} className="space-y-3.5">
                <FormField
                  label="Email"
                  type="email"
                  value={loginForm.email}
                  onChange={updateLoginField("email")}
                  required
                />
                <FormField
                  label="Password"
                  type="password"
                  value={loginForm.password}
                  onChange={updateLoginField("password")}
                  required
                  minLength={6}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in…" : "Log In"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-3.5">
                <FormField
                  label="Full Name"
                  value={signupForm.name}
                  onChange={updateSignupField("name")}
                  required
                />
                <FormField
                  label="Email"
                  type="email"
                  value={signupForm.email}
                  onChange={updateSignupField("email")}
                  required
                />
                <FormField
                  label="Password"
                  type="password"
                  value={signupForm.password}
                  onChange={updateSignupField("password")}
                  required
                  minLength={6}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account…" : "Create Account"}
                </Button>
              </form>
            )}
          </div>
        )}
      </div>
    </Section>
  );
};

export default Account;
