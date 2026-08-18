// SesionContext.js
// Contexto simple de sesión: guarda el usuario y su rol (voluntario, beneficiario o coordinador)
// seleccionados en la pantalla de acceso. Mantiene el estado en memoria durante la sesión.

import { createContext, useContext, useState } from 'react';

const SesionContext = createContext(null);

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // { nombre, rol }

  const iniciarSesion = (nombre, rol) => setUsuario({ nombre, rol });
  const cerrarSesion = () => setUsuario(null);

  return (
    <SesionContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </SesionContext.Provider>
  );
}

export const useSesion = () => useContext(SesionContext);
