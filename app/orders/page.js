"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    api
      .get("/orders/list.php", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const sorted = (res.data.orders || []).sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setOrders(sorted);
      })
      .catch(() => setOrders([]));
  }, [token, router]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 && <p>No past orders.</p>}

      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded mb-4 bg-white shadow">
          <p className="font-semibold">
            Order #{order.id} - ${order.total}
          </p>
          <p className="text-sm text-gray-600">
            {new Date(order.created_at).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">{order.address}</p>

          <ul className="list-disc ml-6 mt-2">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.product_name} x {item.quantity} @ ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
