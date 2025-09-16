"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import qs from "qs";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/products/details.php?id=${id}`)
      .then((res) => {
        console.log("Product details response:", res.data);
        setProduct(res.data.product);
      })
      .catch((err) => {
        console.error(
          "Error fetching product details:",
          err.response?.data || err.message
        );
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = async () => {
    if (!token) {
      return setMsg("⚠️ Login required to add to cart");
    }

    setAdding(true);
    try {
      const payload = qs.stringify({ product_id: product.id, quantity: 1 });
      console.log("Add to cart payload:", payload);

      const res = await api.post("/cart/add.php", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("Add to cart response:", res.data);
      setMsg(res.data.message || "Product added to cart!");
    } catch (err) {
      console.error("Add to Cart Error:", err.response?.data || err.message);
      setMsg(err.response?.data?.error || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (!product)
    return <p className="text-center mt-10">❌ Product not found.</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <img
        src={
          product.image
            ? product.image.startsWith("http")
              ? product.image
              : `https://globosoft.co.uk/ecommerce-api/${product.image}`
            : "https://placehold.co/600x400?text=No+Image"
        }
        alt={product.name}
        className="w-full h-60 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-blue-600 font-semibold mt-2">${product.price}</p>

      <button
        onClick={addToCart}
        disabled={adding}
        className={`${
          adding ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white px-4 py-2 rounded mt-4`}
      >
        {adding ? "Adding..." : "Add to Cart"}
      </button>

      {msg && <p className="mt-2 text-green-600">{msg}</p>}
    </div>
  );
}
