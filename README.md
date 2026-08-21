# Conecta Digital Móvil

Aplicación móvil del programa **Voluntarios Digitales (CEFODEH)** que conecta a
voluntarios con personas y organizaciones que solicitan apoyo para desarrollar
competencias digitales. Proyecto Integrador — Soluciones de Programación Móvil (UVM).

Construida con **React Native + Expo** y **Firebase (Cloud Firestore)**. Implementa
las acciones básicas **CRUD** sobre las solicitudes de apoyo.

## Requisitos

- Node.js 18+
- Expo CLI (`npx expo`)
- Una cuenta y proyecto de Firebase (gratuito)

## Instalación

```bash
npm install
```

Configura tus llaves de Firebase en `src/services/firebaseConfig.js` (ver los
pasos comentados en ese archivo). Después:

```bash
npx expo start
```

Escanea el código QR con la app **Expo Go** (Android/iOS) para probarla.

## Funcionalidad (CRUD + Firebase)

| Acción | Pantalla |
|--------|----------|
| Crear solicitud (CREATE) | Pestaña «Nueva» |
| Ver solicitudes (READ) | Pestaña «Solicitudes» |
| Editar / cambiar estado (UPDATE) | Detalle de solicitud |
| Borrar (DELETE) | Detalle de solicitud |


