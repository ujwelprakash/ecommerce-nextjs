"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import qs from "qs"; // 👈 add this

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [msg, setMsg] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    api
      .get(`/products/details.php?id=${id}`)
      .then((res) => {
        console.log("Product details response:", res.data); // 👈 log response
        setProduct(res.data.product);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err.response?.data);
        setProduct(null);
      });
  }, [id]);

  const addToCart = async () => {
    if (!token) {
      console.warn("No token found. User must login.");
      return setMsg("Login required to add to cart");
    }

    const payload = qs.stringify({ product_id: product.id, quantity: 1 });
    console.log("Add to cart payload:", payload); // 👈 log what we send

    try {
      const res = await api.post("/cart/add.php", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("Add to cart response:", res.data); // 👈 log success response
      setMsg(res.data.message);
    } catch (err) {
      console.error("Add to Cart Error:", err.response?.data); // 👈 log error response
      setMsg(err.response?.data?.error || "Failed to add to cart");
    }
  };

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-blue-600 font-semibold mt-2">${product.price}</p>
      <button
        onClick={addToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Add to Cart
      </button>
      {msg && <p className="mt-2 text-green-600">{msg}</p>}
    </div>
  );
}
