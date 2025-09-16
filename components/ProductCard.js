import Link from "next/link";

export default function ProductCard({ product }) {
  // ✅ Fallback handling for missing/relative images
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `https://globosoft.co.uk/ecommerce-api/${product.image}`
    : "https://placehold.co/300x200?text=No+Image"; // fallback

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-blue-600">${product.price}</p>
      <Link
        href={`/products/${product.id}`}
        className="inline-block mt-2 text-sm text-blue-500 underline"
      >
        View Details
      </Link>
    </div>
  );
}
