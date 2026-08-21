// firebaseConfig.js
// Configuración de la conexión con Firebase (Cloud Firestore).
//
// Estas llaves corresponden a la app Web registrada en el proyecto
// "conecta-digital-b6879" de la consola de Firebase. En Firebase las llaves de
// cliente no son secretas: viajan dentro de la app y el acceso real se controla
// con las reglas de seguridad de Firestore.

import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAyFhLvBzsbYU8B2KavyewVlSH10TbW8TA',
  authDomain: 'conecta-digital-b6879.firebaseapp.com',
  projectId: 'conecta-digital-b6879',
  storageBucket: 'conecta-digital-b6879.firebasestorage.app',
  messagingSenderId: '631194437544',
  appId: '1:631194437544:web:7f7659fb880e52ce80ff9d',
};

const app = initializeApp(firebaseConfig);

// En React Native el canal WebChannel de Firestore no siempre está disponible,
// por lo que se fuerza el transporte por long-polling (HTTPS) para que el CRUD
// funcione igual en el dispositivo que en el navegador.
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

// Bandera útil para mostrar un aviso en la app si aún no se configuran las llaves.
export const firebaseConfigurado = !firebaseConfig.apiKey.startsWith('TU_');
