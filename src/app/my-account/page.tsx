"use client";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";

const MyAccountPage = () => {
  const [orders, setOrders] = useState<any[]>([]);

  // Cargar los pedidos desde localStorage al iniciar la página
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="p-4 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Mi Cuenta - Historial de Pedidos
        </h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">No hay pedidos realizados.</p>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-md">
            {orders.map((order, index) => (
              <div key={index} className="mb-4 border-b pb-4">
                <h3 className="text-lg font-bold">Pedido #{order.id}</h3>
                <p className="text-gray-700">Fecha: {order.date}</p>
                <p className="text-gray-700">Estado: {order.status}</p>
                <p className="text-gray-700">Dirección: {order.address}</p>
                <p className="text-gray-700">
                  Método de Pago: {order.paymentMethod}
                </p>
                <div className="mt-2">
                  <h4 className="font-bold">Productos:</h4>
                  <ul className="list-disc list-inside">
                    {order.items.map((item: any, itemIndex: number) => (
                      <li key={itemIndex} className="text-gray-700">
                        {item.name} - ${item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-gray-700 font-bold mt-2">
                  Total: ${order.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccountPage;
