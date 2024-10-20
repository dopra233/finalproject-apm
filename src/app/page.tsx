"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/firestoreService";
import Header from "@/components/Header";
import { useCart } from "@/CartContext";

// Definimos una interfaz para el tipo de Product
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity?: number; // Añadir el campo quantity
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const { addToCart } = useCart(); // Obtener la función addToCart

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts as Product[]);
      setLoading(false); // Cambiar el estado de carga a false
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: any) => {
    const quantity =
      parseInt(
        (document.getElementById(`quantity-${product.id}`) as HTMLInputElement)
          ?.value
      ) || 1; // Obtener la cantidad del input
    console.log("quantity", quantity);
    addToCart({ ...product, quantity }); // Asegúrate de que estás pasando la cantidad
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Cargando productos...</p>
      </div>
    ); // Mostrar un mensaje de carga
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold my-8 text-gray-800">Productos</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {product.name}
              </h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="font-bold mt-2 text-gray-900">${product.price}</p>
              <div className="mt-4">
                <label
                  htmlFor={`quantity-${product.id}`}
                  className="block text-gray-700 mb-2"
                >
                  Cantidad:
                </label>
                <input
                  type="number"
                  id={`quantity-${product.id}`}
                  min="1"
                  defaultValue="1"
                  className="w-full px-3 py-2 border rounded-lg text-black"
                />
              </div>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() => {
                  const quantity =
                    parseInt(
                      (
                        document.getElementById(
                          `quantity-${product.id}`
                        ) as HTMLInputElement
                      )?.value
                    ) || 1; // Obtener la cantidad del input
                  console.log(quantity);

                  handleAddToCart(product); // Agregar al carrito con la cantidad seleccionada
                }}
              >
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
