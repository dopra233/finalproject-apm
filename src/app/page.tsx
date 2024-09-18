"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "../productsData";
import Header from "../components/Header";
import { useCart } from "../CartContext";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sortOrder, setSortOrder] = useState("default");
  const router = useRouter();
  const { addToCart } = useCart();

  // Filtrar y ordenar los productos
  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory === "Todas" || product.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else if (sortOrder === "desc") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div>
      <Header />
      <div className="p-4 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Productos Disponibles
        </h2>

        {/* Filtros */}
        <div className="flex justify-between mb-6">
          {/* Código para los filtros */}
        </div>

        {/* Listado de productos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
              onClick={() => router.push(`/product/${product.id}`)} // Navegar al detalle del producto
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
