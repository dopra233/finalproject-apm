// src/productsData.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Producto 1",
    price: 19.99,
    category: "Electrónica",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Producto 2",
    price: 39.99,
    category: "Ropa",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Producto 3",
    price: 29.99,
    category: "Hogar",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Producto 4",
    price: 49.99,
    category: "Electrónica",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Producto 5",
    price: 9.99,
    category: "Ropa",
    image: "https://via.placeholder.com/150",
  },
];
