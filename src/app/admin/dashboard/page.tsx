"use client"; // Marcar como Client Component

import Link from "next/link";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3">
          <h1 className="text-2xl font-bold mb-4 text-black">
            Panel de Administración
          </h1>
        </div>
      </nav>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/add-product"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2 text-black">
              Agregar Producto
            </h2>
            <p className="text-gray-600">Añade nuevos productos a tu tienda</p>
          </Link>
          {/* Aquí puedes agregar más opciones del dashboard */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
