import { useState } from "react";
import type { FormEvent } from "react";

function AdminLogin() {
  const [email, setEmail] = useState("admin@voyagetravelmansion.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:4020/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to sign in");
      }

      localStorage.setItem("adminToken", data.token);
      window.location.reload();
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Unable to sign in",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl"
      >
        <p className="text-sm font-medium text-cyan-400">
          Voyage Travel Mansion
        </p>
        <h1 className="mt-2 text-3xl font-bold">Admin sign in</h1>
        <p className="mt-2 text-slate-400">Access flight and visa requests.</p>

        <label
          className="mt-8 block text-sm font-medium text-slate-300"
          htmlFor="admin-email"
        >
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />

   <label 
  className="mt-5 block text-sm font-medium text-slate-300" 
  htmlFor="admin-password" 
>
  Password 
</label>

<div className="relative mt-2">
  <input 
    id="admin-password" 
    type={showPassword ? "text" : "password"} 
    required 
    value={password} 
    onChange={(event) => setPassword(event.target.value)} 
    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 pr-20 text-white outline-none focus:border-cyan-400" 
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 transition hover:text-cyan-400"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

{error && (
  <div className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3">
    <p className="text-sm font-medium text-rose-300">
      {error}
    </p>
  </div>
)}
      <button 
  type="submit" 
  disabled={isSubmitting} 
  className="mt-6 w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-cyan-400 disabled:hover:shadow-none"
>
{isSubmitting ? (
  <span className="flex items-center justify-center gap-2">
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
    Signing in...
  </span>
) : (
  "Sign in"
)}
</button>

<p className="mt-5 text-center text-xs font-medium tracking-wide text-slate-500">
  Secure Admin Portal · Voyage Travel Mansion
</p>

<a
  href="/"
  className="mt-4 block text-center text-sm font-medium text-slate-400 transition hover:text-cyan-400"
>
  ← Back to website
</a>

      </form>
    </main>
  );
}

export default AdminLogin;
