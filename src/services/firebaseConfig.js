// firebaseConfig.js
// Configuración de la conexión con Firebase (Cloud Firestore).
//
// PASOS PARA CONECTAR TU BASE DE DATOS:
// 1. Entra a https://console.firebase.google.com y crea un proyecto (p. ej. "conecta-digital").
// 2. Agrega una app Web (</>) y copia el objeto firebaseConfig que te da la consola.
// 3. Pega tus valores reales abajo (reemplaza los "TU_...").
// 4. En "Firestore Database" crea la base de datos en modo de prueba.
//
// La app funciona sin cambios de código una vez que pegues tus llaves.

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_PROYECTO.firebaseapp.com',
  projectId: 'TU_PROYECTO',
  storageBucket: 'TU_PROYECTO.appspot.com',
  messagingSenderId: 'TU_SENDER_ID',
  appId: 'TU_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Bandera útil para mostrar un aviso en la app si aún no se configuran las llaves.
export const firebaseConfigurado = !firebaseConfig.apiKey.startsWith('TU_');
