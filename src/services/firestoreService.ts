import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { setDoc, getDoc } from "firebase/firestore";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { Product } from "@/app/page";

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
export const getProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Product)
    );
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

export const getUserOrders = async (userId: string) => {
  try {
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    console.error("Error al obtener pedidos del usuario: ", e);
    throw e;
  }
};

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  role: string = "CLIENT"
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      name: name,
      role: role,
    });
    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Configura la cookie de sesión
    const idToken = await user.getIdToken();
    document.cookie = `session=${idToken}; path=/; max-age=3600; SameSite=Strict; Secure`;

    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const getUserRole = async (user: User): Promise<string | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    console.log("El documento del usuario no existe");
    return null;
  } catch (error) {
    console.error("Error getting user role:", error);
    if (error instanceof Error) {
      if (error.message.includes("offline")) {
        throw new Error(
          "La aplicación está offline. Por favor, verifica tu conexión a Internet."
        );
      }
    }
    throw error;
  }
};
