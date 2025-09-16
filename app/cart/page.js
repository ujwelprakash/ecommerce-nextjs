"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import qs from "qs";

export default function CartPage() {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    api
      .get("/cart/view.php", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setCart(res.data.cart || []))
      .catch(() => setCart([]))
      .finally(() => setLoading(false));
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

    setCheckingOut(true);
    try {
      const payload = {
        address: "123 Main St",
        latitude: "40.7128",
        longitude: "-74.0060",
      };

      console.log("Checkout payload:", payload);

      const res = await api.post(
        "/checkout/checkout.php",
        qs.stringify(payload),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Checkout response:", res.data);
      router.push("/orders"); // redirect on success
    } catch (err) {
      console.error("Checkout API Error:", err.response?.data || err.message);
      setMsg(err.response?.data?.error || "Checkout failed");
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-2"
        >
          <p>
            {item.product_name} x {item.quantity}
          </p>
          <p>${parseFloat(item.price).toFixed(2)}</p>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <p className="mt-4 font-bold">Total: ${total.toFixed(2)}</p>
          <button
            onClick={checkout}
            disabled={checkingOut}
            className={`${
              checkingOut ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } text-white px-4 py-2 rounded mt-4`}
          >
            {checkingOut ? "Processing..." : "Checkout"}
          </button>
        </>
      )}

      {msg && <p className="mt-2 text-red-600">{msg}</p>}
    </div>
  );
}
