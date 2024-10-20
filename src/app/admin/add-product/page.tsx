"use client"; // Marcar como Client Component

import { useState } from "react";
import { addProduct } from "@/services/firestoreService"; // Importar el servicio para agregar productos
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      name,
      description,
      price: parseFloat(price), // Asegúrate de que el precio sea un número
    };

    try {
      await addProduct(product); // Llamar al servicio para agregar el producto
      alert("Producto agregado con éxito");
      router.push("/admin/dashboard"); // Redirigir al dashboard después de agregar el producto
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert("Error al agregar el producto. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3">
          <h1 className="text-2xl font-bold text-black">Agregar Producto</h1>
        </div>
      </nav>
      <div className="container mx-auto px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Nombre del producto
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-black"
              rows={4}
              required
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="price" className="block text-gray-700 mb-2">
              Precio
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Agregar Producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
