"use client";
import { useEffect, useState } from "react";
import { getUserOrders } from "@/services/firestoreService";
import Header from "@/components/Header";

// Definimos una interfaz para el tipo de Order
interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  address: string;
  paymentMethod: string;
  items: Array<{
    name: string;
    quantity: number;
  }>;
}

const MyAccount = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Especificamos el tipo aquí
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = "user123";
        const userOrders = await getUserOrders(userId);
        setOrders(userOrders as Order[]); // Aseguramos que userOrders es del tipo Order[]
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        setError(
          "No se pudieron cargar los pedidos. Por favor, intenta de nuevo más tarde."
        );
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Header />
      <div className="p-4 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Mi Cuenta</h1>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Historial de Pedidos
        </h2>
        {orders.length === 0 ? (
          <p className="text-gray-700">No tienes pedidos aún.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <p className="text-gray-800">
                Fecha: {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="text-gray-800">Estado: {order.status}</p>
              <p className="text-gray-800">Total: ${order.total.toFixed(2)}</p>
              <p className="text-gray-800">
                Dirección de envío: {order.address}
              </p>
              <p className="text-gray-800">
                Método de pago: {order.paymentMethod}
              </p>
              <h3 className="font-bold mt-2 text-gray-800">Productos:</h3>
              <ul className="text-gray-700">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - Cantidad: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAccount;
