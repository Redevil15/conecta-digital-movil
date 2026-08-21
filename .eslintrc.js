module.exports = {
  root: true,
  extends: 'expo',
  // React Native expone los temporizadores del entorno web.
  globals: {
    setTimeout: 'readonly',
    clearTimeout: 'readonly',
  },
};
