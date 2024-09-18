"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

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
    // Cargar carrito desde localStorage al inicializar el contexto
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Guardar carrito en localStorage cada vez que cambia el estado cartItems
    localStorage.setItem("cart", JSON.stringify(cartItems));
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
