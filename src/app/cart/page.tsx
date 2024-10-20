"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Importar el hook de navegación
import Header from "@/components/Header";
import { useCart } from "@/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter(); // Usar el hook de navegación

  // Agrupar los productos por ID y sumar las cantidades
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity =
        (existingItem.quantity || 0) + (item.quantity || 1);
    } else {
      acc.push({ ...item }); // Agregar nuevo producto
    }
    return acc;
  }, [] as any[]);

  // Asegúrate de que la cantidad se esté utilizando correctamente
  return (
    <div>
      <Header />
      <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Carrito de Compras
          </h2>
          {groupedItems.length === 0 ? (
            <p className="text-gray-600">El carrito está vacío.</p>
          ) : (
            <div>
              {groupedItems.map((item, index) => (
                <div key={index} className="flex justify-between mb-4">
                  <span className="text-black">{item.name}</span>{" "}
                  {/* Nombre del producto */}
                  <span className="text-black">
                    ${(item.price * item.quantity).toFixed(2)}{" "}
                    {/* Precio total basado en la cantidad */}
                  </span>
                  <span className="text-black">x{item.quantity}</span>{" "}
                  {/* Cantidad */}
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
    </div>
  );
};

export default CartPage;
