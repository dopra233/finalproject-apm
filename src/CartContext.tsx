"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { getUserId } from "./services/authService";

// Importar la función para obtener el ID del usuario actual

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number; // Añadir cantidad aquí
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>; // Para poder limpiar el carrito
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartFromFirestore = async () => {
      const userId = await getUserId(); // Esperamos a que se resuelva el ID del usuario
      if (!userId) return; // Si no hay usuario logueado, no hacer nada

      const cartRef = doc(db, "carts", userId); // Ahora userId es un string resuelto
      const cartSnapshot = await getDocs(collection(cartRef, "items"));
      if (!cartSnapshot.empty) {
        const cartData = cartSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // Asegúrate de incluir el id
            name: data.name,
            price: data.price,
            quantity: data.quantity,
          } as CartItem; // Asegúrate de que sea del tipo CartItem
        });
        setCartItems(cartData);
      }
    };

    fetchCartFromFirestore();
  }, []);

  useEffect(() => {
    const saveCartToFirestore = async () => {
      const userId = await getUserId(); // Esperamos a que se resuelva el ID del usuario
      if (!userId) return; // Si no hay usuario logueado, no hacer nada

      const cartRef = doc(db, "carts", userId); // Usamos el ID del usuario resuelto
      await setDoc(cartRef, { items: cartItems });
    };

    if (cartItems.length > 0) {
      saveCartToFirestore();
    }
  }, [cartItems]);

  const addToCart = (item: any) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // Aquí se suma la cantidad existente con la nueva cantidad
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: item.quantity + existingItem.quantity }
            : i
        );
      }
      return [...prevItems, item]; // Agregar nuevo producto
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
