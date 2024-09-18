"use client";
import React, { useState } from "react";

// Producto de ejemplo para simular el carrito
const cartItems = [
  {
    id: 1,
    name: "Producto 1",
    price: 19.99,
    quantity: 2,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Producto 2",
    price: 9.99,
    quantity: 1,
    image: "https://via.placeholder.com/150",
  },
];

const OrderSummary = () => {
  const [message, setMessage] = useState("");

  // Calcular el total del carrito
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Manejar la confirmación del pedido
  const handleConfirmOrder = () => {
    setMessage("Pedido confirmado. ¡Gracias por tu compra!");
    // Aquí es donde se enviaría la solicitud al backend
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Resumen del Pedido
        </h2>
        <div className="mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-600">Cantidad: {item.quantity}</p>
                <p className="text-gray-600">
                  Precio: ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-right mb-6">
          <p className="text-xl font-semibold">
            Total: ${totalAmount.toFixed(2)}
          </p>
        </div>
        <button
          onClick={handleConfirmOrder}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Confirmar Pedido
        </button>
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default OrderSummary;
