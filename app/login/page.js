"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import qs from "qs"; // 👈 install if not already (`npm install qs`)

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("Login form being sent:", form);

      // ✅ Send as x-www-form-urlencoded (PHP expects this)
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
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
