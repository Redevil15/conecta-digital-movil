# HANDOFF — Conecta Digital Móvil (para continuar en Claude Code)

Documento de traspaso del Proyecto Integrador de **Soluciones de Programación
Móvil (UVM)**. Resume qué es el proyecto, qué debe hacer según las Etapas 1 y 2,
el estado actual del código, y las tareas que faltan (configurar Firebase,
subir a GitHub y generar el APK). Úsalo como contexto para continuar el trabajo.

---

## 1. Contexto del proyecto (Etapas previas)

**Organización:** Programa *Voluntarios Digitales* del Centro de Formación y
Desarrollo Humano (**CEFODEH**).

**Problema (Etapa 1 – Levantamiento de requisitos):** dificultad para coordinar
de forma ágil a los voluntarios con las personas y organizaciones que solicitan
apoyo para desarrollar competencias digitales, y para dar seguimiento a las
sesiones y la participación.

**Solución propuesta:** app móvil **Conecta Digital Móvil**, multiplataforma y
accesible, que conecta voluntarios y beneficiarios, con registro por rol,
catálogo de solicitudes, agenda de sesiones y seguimiento.

**Usuarios (3 roles):**
- **Voluntario:** ofrece su tiempo y habilidades.
- **Beneficiario:** solicita apoyo digital.
- **Coordinador:** gestiona y da seguimiento (personal de CEFODEH).

**Diseño (Etapa 2):**
- Tecnología: **React Native (Expo)** — un solo código base para Android e iOS.
- Backend/datos en la nube: **Firebase (Cloud Firestore)**.
- Interfaces definidas: Acceso/Registro, Catálogo de solicitudes, Detalle de
  solicitud, Perfil.
- Navegación: flujo lineal de entrada (Splash → Acceso → Inicio) + navegación
  por pestañas (Solicitudes, Nueva, Perfil).

**Etapa 3 (actual) — Desarrollo:** construir la app con:
- **CRUD** (Agregar, Recuperar, Actualizar, Borrar) emparejado con un servicio
  en la nube (Firebase).
- Implementación de los componentes de software.
- **Pruebas de seguridad** estáticas y dinámicas (MobSF).
- **Productos a entregar:** diagrama de funcionalidad, capturas de
  implementación, capturas de pruebas de seguridad, **repositorio en GitHub**,
  y **archivo APK** funcional.

---

## 2. Qué debe hacer la app (funcionalidad)

La app gestiona **solicitudes de apoyo** mediante operaciones CRUD sobre
Firestore:

- **Acceso:** el usuario escribe su nombre y elige su rol; entra a la app.
- **Solicitudes (READ):** lista todas las solicitudes con pull-to-refresh.
- **Nueva (CREATE):** formulario para registrar una solicitud (título,
  habilidad, modalidad, duración).
- **Detalle (READ/UPDATE/DELETE):** ver una solicitud, editar sus campos,
  alternar su estado (abierta ↔ atendida) y borrarla.
- **Perfil:** datos del usuario/rol y cerrar sesión.
- Los datos se **sincronizan en la nube** (Firestore) en tiempo real.

### Modelo de datos — colección `solicitudes`

| Campo | Tipo | Ejemplo |
|-------|------|---------|
| `titulo` | string | "Taller de correo y trámites" |
| `habilidad` | string | "Ofimática" |
| `modalidad` | string | "Presencial" / "Remoto" |
| `duracionHrs` | number | 2 |
| `estado` | string | "abierta" / "atendida" |
| `creadaEn` | timestamp | serverTimestamp() |

### Operaciones (endpoints CRUD) — `src/services/solicitudesService.js`

| Acción | Función | Firestore |
|--------|---------|-----------|
| CREATE | `agregarSolicitud(data)` | `addDoc()` |
| READ (lista) | `obtenerSolicitudes()` | `getDocs()` + `orderBy` |
| READ (una) | `obtenerSolicitud(id)` | `getDoc()` |
| UPDATE | `actualizarSolicitud(id, cambios)` | `updateDoc()` |
| DELETE | `borrarSolicitud(id)` | `deleteDoc()` |

### Pantallas y rutas (expo-router)

| Archivo | Pantalla | Función |
|---------|----------|---------|
| `app/index.js` | Acceso / Registro | nombre + rol, inicia sesión |
| `app/(tabs)/index.js` | Solicitudes | READ (lista) |
| `app/(tabs)/nueva.js` | Nueva | CREATE |
| `app/(tabs)/perfil.js` | Perfil | usuario/rol, cerrar sesión |
| `app/solicitud/[id].js` | Detalle | READ/UPDATE/DELETE |

---

## 3. Stack y estructura

- **Expo SDK 51**, React Native 0.74, **expo-router** (navegación por archivos).
- **firebase** ^10 (Cloud Firestore).
- **@expo/vector-icons** (Ionicons).

```
conecta-digital/
├─ app/
│  ├─ _layout.js            # Stack raíz + SesionProvider
│  ├─ index.js              # Acceso / Registro
│  ├─ (tabs)/
│  │  ├─ _layout.js         # pestañas (protegidas por sesión)
│  │  ├─ index.js           # Solicitudes (READ)
│  │  ├─ nueva.js           # Nueva (CREATE)
│  │  └─ perfil.js          # Perfil
│  └─ solicitud/[id].js     # Detalle (READ/UPDATE/DELETE)
├─ src/
│  ├─ services/firebaseConfig.js      # conexión Firebase (pega tus llaves)
│  ├─ services/solicitudesService.js  # CRUD
│  ├─ context/SesionContext.js        # sesión y rol
│  └─ theme.js                        # paleta (navy #1F3864)
├─ assets/                 # icon.png, adaptive-icon.png, splash.png
├─ app.json, eas.json, package.json, babel.config.js, .eslintrc.js
├─ IMPLEMENTATION_PLAN.md  # plan detallado
└─ README.md
```

---

## 4. Estado actual (hecho ✓ / pendiente ☐)

**Hecho:**
- ✓ Proyecto Expo + expo-router completo y **compilando** (bundle Metro de
  Android sin errores).
- ✓ CRUD implementado contra Firestore.
- ✓ Todas las pantallas de las Etapas 1 y 2.
- ✓ Íconos y splash.
- ✓ Repo git inicializado con **8 commits en convención estándar
  (feat/chore/docs), sin co-author**; autor
  `Brandon Figueroa Figueroa <brandonf2345@gmail.com>`.

**Pendiente (requiere cuentas del usuario):**
- ☐ Pegar las llaves reales de **Firebase** en `src/services/firebaseConfig.js`
  y crear la base Firestore.
- ☐ Crear el repo y hacer **push a GitHub**.
- ☐ Generar el **APK**.
- ☐ Ejecutar **pruebas de seguridad** (MobSF) y guardar capturas.

---

## 5. Tareas para completar (comandos)

### 5.1 Instalar dependencias
```bash
npm install
```
> `node_modules/` NO está en el repo (está en `.gitignore`).

### 5.2 Configurar Firebase (para que el CRUD funcione en la nube)
1. https://console.firebase.google.com → crear proyecto (p. ej. `conecta-digital`).
2. Agregar app **Web** (</>) y copiar el objeto `firebaseConfig`.
3. Pegar los valores en `src/services/firebaseConfig.js`.
4. **Firestore Database** → crear base en modo de prueba.
5. Probar: `npx expo start` y abrir con **Expo Go** (QR).

### 5.3 Subir a GitHub (commits ya hechos)
```bash
gh repo create conecta-digital --public --source=. --remote=origin --push
```
> Requiere `gh auth login` previo. Convención de commits: `feat:`, `fix:`,
> `chore:`, `docs:`. **Sin** trailer `Co-Authored-By`.

### 5.4 Generar el APK

**Opción A — EAS Build (recomendada):**
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview   # produce un APK descargable
```

**Opción B — Build local (Android SDK ya instalado en el equipo):**
```bash
npx expo prebuild -p android
cd android && ./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/app-release.apk
```

### 5.5 Pruebas de seguridad (Etapa 3)
- **Estáticas:** subir el APK a **MobSF** (revisa código, manifiesto y permisos);
  también `npm audit`.
- **Dinámicas:** MobSF dynamic analyzer / captura de tráfico para verificar el
  cifrado HTTPS/TLS con Firestore y el manejo de sesión.
- Guardar **capturas** de ambos resultados para el documento de la Etapa 3.

---

## 6. Entregables de la actividad (Etapa 3)

1. Documento PDF `A8_BFF.pdf` (ya elaborado: introducción con Etapas 1 y 2 +
   3.1 funcionalidad, 3.2 implementación, 3.3 pruebas de seguridad + conclusiones
   y fuentes en APA).
2. Enlace al **repositorio de GitHub**.
3. Archivo **APK**.
4. Capturas de implementación y de pruebas de seguridad.

---

## 7. Notas para Claude Code (siguientes pasos sugeridos)

- Al continuar, primero `npm install` y verificar con `npx expo export -p android`
  (debe bundlear sin errores) o `npx expo start`.
- Posibles mejoras si se pide extender el alcance de las Etapas 1–2:
  autenticación real con **Firebase Auth** (por rol), colección `sesiones`
  (agenda) y `voluntarios`, notificaciones push con **Firebase Cloud Messaging**,
  y reglas de seguridad de Firestore por rol.
- Mantener la convención de commits y **no** agregar co-author.
