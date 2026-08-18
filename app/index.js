// Pantalla de Acceso / Registro: el usuario escribe su nombre y elige su rol.
import { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSesion } from '../src/context/SesionContext';
import { colors } from '../src/theme';

const ROLES = ['Voluntario', 'Beneficiario', 'Coordinador'];

export default function Login() {
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('Voluntario');
  const { iniciarSesion } = useSesion();
  const router = useRouter();

  const entrar = () => {
    if (!nombre.trim()) return;
    iniciarSesion(nombre.trim(), rol);
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logo}>
        <Ionicons name="people" size={38} color="#fff" />
      </View>
      <Text style={styles.brand}>Conecta Digital Móvil</Text>
      <Text style={styles.sub}>Voluntarios Digitales · CEFODEH</Text>

      <Text style={styles.label}>Selecciona tu rol</Text>
      <View style={styles.roles}>
        {ROLES.map((r) => (
          <Pressable
            key={r}
            onPress={() => setRol(r)}
            style={[styles.role, rol === r && styles.roleOn]}
          >
            <Text style={[styles.roleTxt, rol === r && styles.roleTxtOn]}>{r}</Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Tu nombre"
        placeholderTextColor={colors.textMuted}
        value={nombre}
        onChangeText={setNombre}
      />

      <Pressable style={styles.btn} onPress={entrar}>
        <Text style={styles.btnTxt}>Entrar</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 24, justifyContent: 'center' },
  logo: {
    width: 74, height: 74, borderRadius: 18, backgroundColor: colors.navy,
    alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 12,
  },
  brand: { fontSize: 22, fontWeight: '800', color: colors.navy, textAlign: 'center' },
  sub: { fontSize: 13, color: colors.textMuted, textAlign: 'center', marginBottom: 28 },
  label: { fontSize: 13, color: colors.steel, fontWeight: '600', marginBottom: 8 },
  roles: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  role: {
    flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5,
    borderColor: colors.border, alignItems: 'center',
  },
  roleOn: { backgroundColor: '#E7EAF0', borderColor: colors.navy },
  roleTxt: { color: colors.steel, fontWeight: '600', fontSize: 13 },
  roleTxtOn: { color: colors.navy },
  input: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border,
    borderRadius: 11, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, marginBottom: 16,
  },
  btn: {
    backgroundColor: colors.navy, borderRadius: 11, paddingVertical: 14, alignItems: 'center',
  },
  btnTxt: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
