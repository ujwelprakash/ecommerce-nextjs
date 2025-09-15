"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import qs from "qs"; // ✅ npm install qs

export default function CartPage() {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    api
      .get("/cart/view.php", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setCart(res.data.cart || []))
      .catch(() => setCart([]));
  }, [token, router]);

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price),
    0
  );

  const checkout = async () => {
    if (!token) {
      setMsg("Login required for checkout");
      return;
    }

    try {
      const payload = {
        address: "123 Main St",
        latitude: "40.7128",
        longitude: "-74.0060",
      };

      console.log("Checkout payload:", payload);

      const res = await api.post(
        "/checkout/checkout.php",
        qs.stringify(payload), // ✅ PHP expects form-data
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Checkout response:", res.data);

      // ✅ Redirect to orders page after success
      router.push("/orders");
    } catch (err) {
      console.error("Checkout API Error:", err.response?.data || err.message);
      setMsg(err.response?.data?.error || "Checkout failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 && <p>No items in cart.</p>}

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-2"
        >
          <p>
            {item.product_name} x {item.quantity}
          </p>
          <p>${item.price}</p>
        </div>
      ))}

      <p className="mt-4 font-bold">Total: ${total.toFixed(2)}</p>

      {cart.length > 0 && (
        <button
          onClick={checkout}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
          Checkout
        </button>
      )}

      {msg && <p className="mt-2 text-blue-600">{msg}</p>}
    </div>
  );
}
