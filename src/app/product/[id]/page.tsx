"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/CartContext";
import { products } from "@/productsData";
import Header from "@/components/Header";

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const productId = parseInt(params.id, 10); // Obtener el ID del producto de la URL
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div>
        <Header />
        <div className="p-4 bg-gray-100 min-h-screen">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Producto no encontrado
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="p-4 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-4">Categoría: {product.category}</p>
          <button
            onClick={() => {
              addToCart({ ...product, quantity: 1, id: String(product.id) }); // Convertir id a string
              alert("Producto añadido al carrito.");
              router.push("/cart"); // Opcional: Navegar al carrito después de añadir el producto
            }}
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-200"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
