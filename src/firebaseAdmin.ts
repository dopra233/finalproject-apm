import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Asegúrate de tener configuradas las credenciales adecuadas
    projectId: "final-project-apm",
  });
}

export const authAdmin = admin.auth();
