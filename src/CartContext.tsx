"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { getUserId } from "./services/authService";

// Importar la función para obtener el ID del usuario actual

interface CartContextType {
  cartItems: any[];
  addToCart: (product: any) => void;
  removeFromCart: (index: number) => void;
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchCartFromFirestore = async () => {
      const userId = await getUserId(); // Esperamos a que se resuelva el ID del usuario
      if (!userId) return; // Si no hay usuario logueado, no hacer nada

      const cartRef = doc(db, "carts", userId); // Ahora userId es un string resuelto
      const cartSnapshot = await getDocs(collection(cartRef, "items"));
      if (!cartSnapshot.empty) {
        const cartData = cartSnapshot.docs.map((doc) => doc.data());
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

  const addToCart = (product: any) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
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
