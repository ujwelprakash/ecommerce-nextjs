import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
      <img
        src={product.image}
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
