"use client";
import { useCart } from "@/CartContext";
import Header from "@/components/Header";
import React, { useState } from "react";
import { addOrder } from "@/services/firestoreService";

const CheckoutPage = () => {
  const { cartItems, setCartItems } = useCart(); // Obtener cartItems y setCartItems del contexto
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta de Crédito");
  const [message, setMessage] = useState("");

  // Calcular el total del pedido
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  // Manejar la confirmación del pedido
  const handleConfirmOrder = async () => {
    if (!address) {
      setMessage("Por favor, ingresa una dirección de envío.");
      return;
    }

    try {
      const userId = "user123"; // Reemplaza esto con el ID real del usuario

      // Crear el pedido
      const newOrder = {
        userId,
        date: new Date().toISOString(),
        status: "En proceso",
        total: totalAmount,
        address,
        paymentMethod,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity || 1,
          price: item.price,
        })),
      };

      // Guardar el pedido en Firestore
      const orderId = await addOrder(newOrder);

      // Limpiar el carrito
      setCartItems([]);

      setMessage(
        `Pedido confirmado con ID: ${orderId}. ¡Gracias por tu compra!`
      );
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      setMessage(
        "Hubo un error al procesar tu pedido. Por favor, intenta de nuevo."
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
        {" "}
        {/* Centrar el contenido */}
        <div className="bg-white p-4 rounded-lg shadow-md max-w-md w-full">
          {" "}
          {/* Ajustar el ancho de la tarjeta */}
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Proceso de Pago
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">No hay productos en el carrito.</p>
          ) : (
            <div>
              <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <span className="text-black">{item.name}</span>{" "}
                  {/* Cambiado a text-black */}
                  <span className="text-black">
                    ${item.price.toFixed(2)}
                  </span>{" "}
                  {/* Cambiado a text-black */}
                </div>
              ))}
              <div className="flex justify-between mt-4 font-bold">
                <span>Total:</span>
                <span className="text-black">
                  ${totalAmount.toFixed(2)}
                </span>{" "}
                {/* Cambiado a text-black */}
              </div>

              {/* Formulario para dirección y método de pago */}
              <div className="mt-6">
                <label className="block text-gray-700 mb-2">
                  Dirección de Envío
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500" // Cambiado a text-black
                  placeholder="Ingresa tu dirección de envío"
                />

                <label className="block text-gray-700 mb-2 mt-4">
                  Método de Pago
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500" // Cambiado a text-black
                >
                  <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Transferencia Bancaria">
                    Transferencia Bancaria
                  </option>
                </select>

                <button
                  onClick={handleConfirmOrder}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg mt-6 hover:bg-blue-600 transition duration-200"
                >
                  Confirmar Pedido
                </button>

                {message && <p className="text-green-500 mt-4">{message}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
