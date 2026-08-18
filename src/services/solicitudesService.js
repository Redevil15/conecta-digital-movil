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

// CREATE — Agregar una nueva solicitud de apoyo
export async function agregarSolicitud(solicitud) {
  const ref = await addDoc(collection(db, COL), {
    ...solicitud,
    estado: solicitud.estado || 'abierta',
    creadaEn: serverTimestamp(),
  });
  return { id: ref.id, ...solicitud };
}

// READ (lista) — Recuperar todas las solicitudes
export async function obtenerSolicitudes() {
  const q = query(collection(db, COL), orderBy('creadaEn', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// READ (una) — Recuperar el detalle de una solicitud
export async function obtenerSolicitud(id) {
  const snap = await getDoc(doc(db, COL, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// UPDATE — Actualizar los datos o el estado de una solicitud
export async function actualizarSolicitud(id, cambios) {
  await updateDoc(doc(db, COL, id), cambios);
  return { id, ...cambios };
}

// DELETE — Borrar una solicitud
export async function borrarSolicitud(id) {
  await deleteDoc(doc(db, COL, id));
  return id;
}
