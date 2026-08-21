// metro.config.js
// Configuración del empaquetador Metro.
// Firebase v10 se distribuye con módulos ".cjs" y "package exports"; Metro necesita
// estos ajustes para resolverlos correctamente dentro de React Native.

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
