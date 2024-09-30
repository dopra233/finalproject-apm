import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Crear un nuevo producto
export const addProduct = async (product: any) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    return docRef.id;
  } catch (e) {
    console.error("Error al añadir el producto: ", e);
    throw e;
  }
};

// Leer todos los productos
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error al obtener productos: ", e);
    throw e;
  }
};

// Actualizar un producto
export const updateProduct = async (id: string, updatedProduct: any) => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedProduct);
  } catch (e) {
    console.error("Error al actualizar producto: ", e);
    throw e;
  }
};

// Eliminar un producto
export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, "products", id));
  } catch (e) {
    console.error("Error al eliminar producto: ", e);
    throw e;
  }
};

// Crear un nuevo pedido
export const addOrder = async (order: any) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), order);
    return docRef.id;
  } catch (e) {
    console.error("Error al añadir el pedido: ", e);
    throw e;
  }
};

// Leer todos los pedidos
export const getOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error al obtener pedidos: ", e);
    throw e;
  }
};

// Actualizar un pedido
export const updateOrder = async (id: string, updatedOrder: any) => {
  try {
    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, updatedOrder);
  } catch (e) {
    console.error("Error al actualizar pedido: ", e);
    throw e;
  }
};

// Eliminar un pedido
export const deleteOrder = async (id: string) => {
  try {
    await deleteDoc(doc(db, "orders", id));
  } catch (e) {
    console.error("Error al eliminar pedido: ", e);
    throw e;
  }
};
