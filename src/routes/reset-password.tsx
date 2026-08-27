import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a New Password | RAS Jewellers" },
      {
        name: "description",
        content: "Choose a new password for your RAS Jewellers customer account.",
      },
      { property: "og:title", content: "Set a New Password | RAS Jewellers" },
      {
        property: "og:description",
        content: "Choose a new password for your RAS Jewellers customer account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") ?? "");
    const confirm = String(fd.get("confirm") ?? "");
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setBusy(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (err) {
      toast.error(err.message);
      return;
    }
    toast.success("Password updated");
    void navigate({ to: "/account" });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-center font-serif text-lg tracking-[0.2em] text-gold-dark">{SITE.name}</p>
        <h1 className="mt-4 text-center font-serif text-2xl">Set a new password</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground" htmlFor="rp-pass">
              New Password
            </label>
            <input id="rp-pass" name="password" type="password" autoComplete="new-password" className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground" htmlFor="rp-confirm">
              Confirm Password
            </label>
            <input id="rp-confirm" name="confirm" type="password" autoComplete="new-password" className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button type="submit" disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium uppercase tracking-wide text-primary-foreground hover:opacity-90 disabled:opacity-60">
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Update password
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          <Link to="/auth" className="text-muted-foreground hover:text-gold-dark">
            Back to login
          </Link>
        </p>
      </div>
    </main>
  );
}
