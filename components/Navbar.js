"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <Link href="/" className="text-lg font-bold hover:text-gray-200">
        E-Shop
      </Link>

      <div className="flex gap-4 items-center">
        <Link href="/" className="hover:text-gray-200">
          Products
        </Link>

        {token ? (
          <>
            <Link href="/cart" className="hover:text-gray-200">
              Cart
            </Link>
            <Link href="/orders" className="hover:text-gray-200">
              Orders
            </Link>
            <button
              onClick={logout}
              aria-label="Logout"
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-gray-200">
              Login
            </Link>
            <Link href="/register" className="hover:text-gray-200">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
