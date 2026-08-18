# Plan de implementación — Conecta Digital Móvil

Aplicación móvil del programa **Voluntarios Digitales (CEFODEH)** que conecta a
voluntarios con personas y organizaciones que solicitan apoyo digital. Este
documento define la arquitectura, las pantallas, las operaciones (endpoints) y
los pasos de build, conforme a lo propuesto en las Etapas 1 y 2 del Proyecto
Integrador.

## 1. Stack tecnológico

| Capa | Tecnología |
|------|------------|
| App móvil (multiplataforma) | React Native + Expo (SDK 51) |
| Navegación | expo-router (basada en archivos) |
| Base de datos en la nube | Firebase — Cloud Firestore |
| Íconos | @expo/vector-icons (Ionicons) |
| Build del APK | EAS Build o build local con Android SDK |

## 2. Modelo de datos (Firestore)

Colección **`solicitudes`** — cada documento representa una solicitud de apoyo:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `titulo` | string | Título de la solicitud (ej. "Taller de correo") |
| `habilidad` | string | Habilidad requerida (ej. "Ofimática") |
| `modalidad` | string | "Presencial" o "Remoto" |
| `duracionHrs` | number | Duración estimada en horas |
| `estado` | string | "abierta" o "atendida" |
| `creadaEn` | timestamp | Fecha de creación (serverTimestamp) |

## 3. Operaciones del servicio de datos (endpoints CRUD)

Definidas en `src/services/solicitudesService.js` sobre la colección `solicitudes`:

| Acción CRUD | Función | Operación Firestore |
|-------------|---------|---------------------|
| CREATE — Agregar | `agregarSolicitud(data)` | `addDoc()` |
| READ — Recuperar (lista) | `obtenerSolicitudes()` | `getDocs()` + `orderBy` |
| READ — Recuperar (una) | `obtenerSolicitud(id)` | `getDoc()` |
| UPDATE — Actualizar | `actualizarSolicitud(id, cambios)` | `updateDoc()` |
| DELETE — Borrar | `borrarSolicitud(id)` | `deleteDoc()` |

## 4. Pantallas y navegación

Navegación con expo-router. Flujo: **Acceso → (pestañas) → Detalle**.

| Ruta (archivo) | Pantalla | Función principal |
|----------------|----------|-------------------|
| `app/index.js` | Acceso / Registro | Nombre + selección de rol; inicia sesión |
| `app/(tabs)/index.js` | Solicitudes | **READ** — lista con pull-to-refresh |
| `app/(tabs)/nueva.js` | Nueva | **CREATE** — formulario de alta |
| `app/(tabs)/perfil.js` | Perfil | Datos del usuario y cerrar sesión |
| `app/solicitud/[id].js` | Detalle | **READ** de una, **UPDATE** y **DELETE** |

- Barra inferior de pestañas: Solicitudes · Nueva · Perfil.
- Las pestañas están protegidas: sin sesión, redirigen al acceso.
- El estado de una solicitud se alterna (abierta ↔ atendida) desde el detalle (UPDATE).

## 5. Estructura del proyecto (monorepo de una app)

```
conecta-digital/
├─ app/                      # rutas (expo-router)
│  ├─ _layout.js             # Stack raíz + provider de sesión
│  ├─ index.js               # Acceso / Registro
│  ├─ (tabs)/
│  │  ├─ _layout.js          # barra de pestañas
│  │  ├─ index.js            # Solicitudes (READ)
│  │  ├─ nueva.js            # Nueva (CREATE)
│  │  └─ perfil.js           # Perfil
│  └─ solicitud/[id].js      # Detalle (READ/UPDATE/DELETE)
├─ src/
│  ├─ services/
│  │  ├─ firebaseConfig.js   # conexión a Firebase
│  │  └─ solicitudesService.js  # CRUD
│  ├─ context/SesionContext.js  # sesión y rol
│  └─ theme.js               # paleta
├─ assets/                   # icono y splash
├─ app.json, eas.json, package.json, babel.config.js
```

## 6. Puesta en marcha

```bash
npm install
# Configura tus llaves de Firebase en src/services/firebaseConfig.js
npx expo start        # abre en Expo Go escaneando el QR
```

## 7. Generación del APK

**Opción A — EAS Build (nube de Expo, recomendada):**
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview   # genera un APK descargable
```

**Opción B — Build local (requiere Android SDK, ya instalado en el equipo):**
```bash
npx expo prebuild -p android
cd android && ./gradlew assembleRelease
# APK en android/app/build/outputs/apk/release/app-release.apk
```

## 8. Pruebas de seguridad (Etapa 3)

- **Estáticas:** análisis del APK con MobSF (código, manifiesto y permisos) y
  `npm audit` sobre las dependencias.
- **Dinámicas:** MobSF dynamic analyzer / captura de tráfico para verificar el
  cifrado HTTPS/TLS de la comunicación con Firestore y el manejo de sesión.
