import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { SITE } from "@/lib/site-data";
import logo from "@/assets/ras-logo.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Customer Login & Sign Up | RAS Jewellers" },
      {
        name: "description",
        content:
          "Sign in to your RAS Jewellers account to view orders, saved addresses and your jewellery wishlist.",
      },
      { property: "og:title", content: "Customer Login & Sign Up | RAS Jewellers" },
      {
        property: "og:description",
        content: "Access your RAS Jewellers customer account — orders, addresses and wishlist.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage;
});

const signUpSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name").max(80),
    mobile: z
      .string()
      .trim()
      .regex(/^[0-9+\s-]{10,15}$/, "Enter a valid mobile number"),
    email: z.string().trim().email("Enter a valid email address").max(255),
    password: z.string().min(8, "Password must be at least 8 characters").max(72),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

const field =
  "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";
const label = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground";

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [forgotOpen, setForgotOpen] = useState(false);

  useEffect(() => {
    if (!loading && user) void navigate({ to: "/account", replace: true });
  }, [user, loading, navigate]);

  async function onSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = signInSchema.safeParse({
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
    });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back to RAS Jewellers");
    void navigate({ to: "/account" });
  }

  async function onSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = signUpSchema.safeParse({
      fullName: String(fd.get("fullName") ?? ""),
      mobile: String(fd.get("mobile") ?? ""),
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
      confirmPassword: String(fd.get("confirmPassword") ?? ""),
    });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: parsed.data.fullName, mobile: parsed.data.mobile },
      },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Your account is ready");
    void navigate({ to: "/account" });
  }

  async function onForgot(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    if (!z.string().email().safeParse(email).success) {
      toast.error("Enter a valid email address");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Password reset link sent to your email");
      setForgotOpen(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream px-5 py-12">
      <div className="mx-auto w-full max-w-md">
        <Link to="/" className="mb-8 flex flex-col items-center gap-3 text-center">
          <img
            src={logo}
            alt="RAS Jewellers logo"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover ring-1 ring-primary/30"
          />
          <span className="font-serif text-2xl tracking-[0.22em] text-gold-dark">{SITE.name}</span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {SITE.established}
          </span>
        </Link>

        <div className="rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-9">
          {forgotOpen ? (
            <form onSubmit={onForgot} className="space-y-5">
              <div className="text-center">
                <h1 className="font-serif text-2xl text-foreground">Reset your password</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  We'll email you a secure link to set a new password.
                </p>
              </div>
              <div>
                <label className={label} htmlFor="forgot-email">Email Address</label>
                <input id="forgot-email" name="email" type="email" className={field} placeholder="you@example.com" />
              </div>
              <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">
                {busy && <Loader2 className="h-4 w-4 animate-spin" />} Send reset link
              </button>
              <button type="button" onClick={() => setForgotOpen(false)} className="w-full text-center text-sm text-muted-foreground hover:text-gold-dark">
                Back to login
              </button>
            </form>
          ) : (
            <>
              <div className="mb-7 grid grid-cols-2 rounded-full border border-border p-1">
                {(["login", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMode(m);
                      setErrors({});
                    }}
                    className={`rounded-full py-2 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                      mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-gold-dark"
                    }`}
                  >
                    {m === "login" ? "Login" : "Create Account"}
                  </button>
                ))}
              </div>

              {mode === "login" ? (
                <form onSubmit={onSignIn} className="space-y-5">
                  <div className="text-center">
                    <h1 className="font-serif text-2xl text-foreground">Welcome back</h1>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      Sign in to view your orders and wishlist.
                    </p>
                  </div>
                  <div>
                    <label className={label} htmlFor="login-email">Email Address</label>
                    <input id="login-email" name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" />
                    {errors["email"] && <p className="mt-1.5 text-xs text-destructive">{errors["email"]}</p>}
                  </div>
                  <div>
                    <label className={label} htmlFor="login-password">Password</label>
                    <input id="login-password" name="password" type="password" autoComplete="current-password" className={field} placeholder="••••••••" />
                    {errors["password"] && <p className="mt-1.5 text-xs text-destructive">{errors["password"]}</p>}
                  </div>
                  <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">
                    {busy && <Loader2 className="h-4 w-4 animate-spin" />} Login
                  </button>
                  <div className="flex items-center justify-between text-sm">
                    <button type="button" onClick={() => setForgotOpen(true)} className="text-muted-foreground hover:text-gold-dark">
                      Forgot password?
                    </button>
                    <button type="button" onClick={() => setMode("signup")} className="text-gold-dark hover:underline">
                      Create account
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={onSignUp} className="space-y-5">
                  <div className="text-center">
                    <h1 className="font-serif text-2xl text-foreground">Create your account</h1>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      Save your wishlist, addresses and order history.
                    </p>
                  </div>
                  <div>
                    <label className={label} htmlFor="su-name">Full Name</label>
                    <input id="su-name" name="fullName" className={field} placeholder="Your name" />
                    {errors["fullName"] && <p className="mt-1.5 text-xs text-destructive">{errors["fullName"]}</p>}
                  </div>
                  <div>
                    <label className={label} htmlFor="su-mobile">Mobile Number</label>
                    <input id="su-mobile" name="mobile" inputMode="tel" className={field} placeholder="+91 98765 43210" />
                    {errors["mobile"] && <p className="mt-1.5 text-xs text-destructive">{errors["mobile"]}</p>}
                  </div>
                  <div>
                    <label className={label} htmlFor="su-email">Email Address</label>
                    <input id="su-email" name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" />
                    {errors["email"] && <p className="mt-1.5 text-xs text-destructive">{errors["email"]}</p>}
                  </div>
                  <div>
                    <label className={label} htmlFor="su-password">Password</label>
                    <input id="su-password" name="password" type="password" autoComplete="new-password" className={field} placeholder="At least 8 characters" />
                    {errors["password"] && <p className="mt-1.5 text-xs text-destructive">{errors["password"]}</p>}
                  </div>
                  <div>
                    <label className={label} htmlFor="su-confirm">Confirm Password</label>
                    <input id="su-confirm" name="confirmPassword" type="password" autoComplete="new-password" className={field} placeholder="Re-enter password" />
                    {errors["confirmPassword"] && <p className="mt-1.5 text-xs text-destructive">{errors["confirmPassword"]}</p>}
                  </div>
                  <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">
                    {busy && <Loader2 className="h-4 w-4 animate-spin" />} Create account
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm">
          <Link to="/" className="text-muted-foreground hover:text-gold-dark">
            ← Back to store
          </Link>
        </p>
      </div>
    </main>
  );
}
