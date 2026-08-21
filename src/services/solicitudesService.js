// solicitudesService.js
// Capa de acceso a datos: acciones CRUD sobre la colección "solicitudes" en Cloud Firestore.
// Cada función es una "operación" (endpoint) del servicio de datos de la app.

import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const COL = 'solicitudes';

// Tiempo maximo de espera para una operacion en la nube. Si Firestore no
// responde (sin red, base sin crear o reglas que bloquean), el SDK reintenta de
// forma indefinida; este limite convierte esa espera en un error visible para
// el usuario en lugar de dejar la pantalla cargando para siempre.
const TIEMPO_LIMITE_MS = 10000;

function conTiempoLimite(promesa) {
  let temporizador;
  const limite = new Promise((_, rechazar) => {
    temporizador = setTimeout(
      () => rechazar(new Error('Firestore no respondio a tiempo.')),
      TIEMPO_LIMITE_MS
    );
  });
  return Promise.race([promesa, limite]).finally(() => clearTimeout(temporizador));
}

// CREATE — Agregar una nueva solicitud de apoyo
export async function agregarSolicitud(solicitud) {
  const ref = await conTiempoLimite(
    addDoc(collection(db, COL), {
      ...solicitud,
      estado: solicitud.estado || 'abierta',
      creadaEn: serverTimestamp(),
    })
  );
  return { id: ref.id, ...solicitud };
}

// READ (lista) — Recuperar todas las solicitudes
export async function obtenerSolicitudes() {
  const q = query(collection(db, COL), orderBy('creadaEn', 'desc'));
  const snap = await conTiempoLimite(getDocs(q));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// READ (una) — Recuperar el detalle de una solicitud
export async function obtenerSolicitud(id) {
  const snap = await conTiempoLimite(getDoc(doc(db, COL, id)));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// UPDATE — Actualizar los datos o el estado de una solicitud
export async function actualizarSolicitud(id, cambios) {
  await conTiempoLimite(updateDoc(doc(db, COL, id), cambios));
  return { id, ...cambios };
}

// DELETE — Borrar una solicitud
export async function borrarSolicitud(id) {
  await conTiempoLimite(deleteDoc(doc(db, COL, id)));
  return id;
}
