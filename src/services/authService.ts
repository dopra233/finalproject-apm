import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const getUserId = () => {
  return new Promise<string | null>((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid); // Retorna el ID del usuario si está autenticado
      } else {
        resolve(null); // No hay usuario autenticado
      }
    });
  });
};
