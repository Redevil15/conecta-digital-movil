// Pestaña Perfil: muestra el usuario y su rol; permite cerrar sesión.
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSesion } from '../../src/context/SesionContext';
import { colors } from '../../src/theme';

export default function Perfil() {
  const { usuario, cerrarSesion } = useSesion();
  const router = useRouter();

  const salir = () => {
    cerrarSesion();
    router.replace('/');
  };

  const iniciales = (usuario?.nombre || '?')
    .split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

  return (
    <View style={styles.screen}>
      <View style={styles.avatar}>
        <Text style={styles.avatarTxt}>{iniciales}</Text>
      </View>
      <Text style={styles.nombre}>{usuario?.nombre}</Text>
      <Text style={styles.rol}>{usuario?.rol}</Text>

      <View style={styles.row}>
        <Ionicons name="shield-checkmark-outline" size={20} color={colors.navy} />
        <Text style={styles.rowTxt}>Privacidad y seguridad</Text>
      </View>
      <View style={styles.row}>
        <Ionicons name="document-text-outline" size={20} color={colors.navy} />
        <Text style={styles.rowTxt}>Materiales de apoyo</Text>
      </View>

      <Pressable style={styles.btn} onPress={salir}>
        <Ionicons name="log-out-outline" size={18} color="#fff" />
        <Text style={styles.btnTxt}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, alignItems: 'center' },
  avatar: {
    width: 84, height: 84, borderRadius: 42, backgroundColor: colors.navy,
    alignItems: 'center', justifyContent: 'center', marginTop: 20,
  },
  avatarTxt: { color: '#fff', fontSize: 28, fontWeight: '800' },
  nombre: { fontSize: 20, fontWeight: '800', color: colors.navy, marginTop: 12 },
  rol: { fontSize: 14, color: colors.teal, fontWeight: '700', marginBottom: 24 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff',
    borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14,
    width: '100%', marginBottom: 10,
  },
  rowTxt: { fontSize: 14, color: '#333b49' },
  btn: {
    flexDirection: 'row', gap: 8, backgroundColor: colors.danger, borderRadius: 11,
    paddingVertical: 13, paddingHorizontal: 22, alignItems: 'center', marginTop: 24,
  },
  btnTxt: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
