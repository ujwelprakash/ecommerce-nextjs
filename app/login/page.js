"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import qs from "qs";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Login form being sent:", form);

      const res = await api.post("/auth/login.php", qs.stringify(form), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      console.log("Login Response:", res.data);

      if (res.data.token) {
        login(res.data.token); // save token in context + localStorage
        router.push("/");
      } else {
        setError("No token received from server");
      }
    } catch (err) {
      console.error("Login API Error:", err.response?.data);
      const apiError = err.response?.data?.error || err.response?.data?.message;
      setError(apiError || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      {error && (
        <p className="text-red-600 bg-red-100 border border-red-400 p-2 rounded mb-4 text-sm">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-sm text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`p-2 rounded text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600 text-center">
        Don’t have an account?{" "}
        <Link href="/register" className="text-green-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
