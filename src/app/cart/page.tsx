"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Importar el hook de navegación
import Header from "@/components/Header";
import { useCart } from "@/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter(); // Usar el hook de navegación

  return (
    <div>
      <Header />
      <div className="p-4 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Carrito de Compras
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">El carrito está vacío.</p>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-md">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between mb-4">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                router.push("/checkout"); // Navegar al checkout
              }}
              className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-200"
            >
              Proceder al Pago
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
