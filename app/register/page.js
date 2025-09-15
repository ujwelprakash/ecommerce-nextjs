"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import qs from "qs"; // 👈 install this with `npm install qs`

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("Form being sent:", form);

      // ✅ Option 1: JSON (default)
      // const res = await api.post("/auth/register.php", form);

      // ✅ Option 2: x-www-form-urlencoded (for PHP APIs)
      const res = await api.post("/auth/register.php", qs.stringify(form), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      console.log("Register Response:", res.data);
      router.push("/login");
    } catch (err) {
      console.error("Register API Error:", err.response?.data);
      const apiError = err.response?.data?.error || err.response?.data?.message;
      setError(apiError || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
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
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
