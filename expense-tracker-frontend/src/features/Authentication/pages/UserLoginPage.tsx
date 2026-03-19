import { useNavigate, Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function UserLoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      setError(data.error || "Invalid credentials");
    }
  }

  return (
      <div className="min-h-screen bg-[#dce8f5] flex items-center justify-center">
        <div className="w-full max-w-md">

          {/* Header card */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-t-xl px-8 py-6 text-white text-center shadow-md">
            <h1 className="text-2xl font-bold tracking-wide">Fintrak</h1>
            <p className="text-blue-100 text-sm mt-1">Track your expenses, own your finances</p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-b-xl shadow-lg px-8 py-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-6">Sign in to your account</h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="text-sm text-gray-600">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="password" className="text-sm text-gray-600">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>

              {error && (
                  <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">
                    {error}
                  </p>
              )}

              <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-2"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <p className="text-sm text-center text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Register
              </Link>
            </p>
          </div>

        </div>
      </div>
  );
}