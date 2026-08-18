// Pestaña Nueva: CREATE — formulario para agregar una solicitud de apoyo.
import { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { agregarSolicitud } from '../../src/services/solicitudesService';
import { colors } from '../../src/theme';

const MODALIDADES = ['Presencial', 'Remoto'];

export default function Nueva() {
  const [titulo, setTitulo] = useState('');
  const [habilidad, setHabilidad] = useState('');
  const [modalidad, setModalidad] = useState('Presencial');
  const [duracion, setDuracion] = useState('');
  const [guardando, setGuardando] = useState(false);
  const router = useRouter();

  const guardar = async () => {
    if (!titulo.trim() || !habilidad.trim()) {
      Alert.alert('Faltan datos', 'El título y la habilidad son obligatorios.');
      return;
    }
    try {
      setGuardando(true);
      await agregarSolicitud({
        titulo: titulo.trim(),
        habilidad: habilidad.trim(),
        modalidad,
        duracionHrs: Number(duracion) || 1,
      });
      setTitulo(''); setHabilidad(''); setDuracion(''); setModalidad('Presencial');
      Alert.alert('Listo', 'Solicitud registrada correctamente.');
      router.push('/(tabs)');
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar. Revisa la conexión con Firebase.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.form}>
      <Text style={styles.label}>Título de la solicitud</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo}
        placeholder="Ej. Taller de correo y trámites" placeholderTextColor={colors.textMuted} />

      <Text style={styles.label}>Habilidad requerida</Text>
      <TextInput style={styles.input} value={habilidad} onChangeText={setHabilidad}
        placeholder="Ej. Ofimática" placeholderTextColor={colors.textMuted} />

      <Text style={styles.label}>Modalidad</Text>
      <View style={styles.row}>
        {MODALIDADES.map((m) => (
          <Pressable key={m} onPress={() => setModalidad(m)}
            style={[styles.chip, modalidad === m && styles.chipOn]}>
            <Text style={[styles.chipTxt, modalidad === m && styles.chipTxtOn]}>{m}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Duración (horas)</Text>
      <TextInput style={styles.input} value={duracion} onChangeText={setDuracion}
        keyboardType="numeric" placeholder="2" placeholderTextColor={colors.textMuted} />

      <Pressable style={[styles.btn, guardando && { opacity: 0.6 }]} onPress={guardar} disabled={guardando}>
        <Text style={styles.btnTxt}>{guardando ? 'Guardando…' : 'Guardar solicitud'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: { padding: 20 },
  label: { fontSize: 13, color: colors.steel, fontWeight: '600', marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border, borderRadius: 11,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15,
  },
  row: { flexDirection: 'row', gap: 8 },
  chip: {
    flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5,
    borderColor: colors.border, alignItems: 'center',
  },
  chipOn: { backgroundColor: '#E7EAF0', borderColor: colors.navy },
  chipTxt: { color: colors.steel, fontWeight: '600' },
  chipTxtOn: { color: colors.navy },
  btn: {
    backgroundColor: colors.navy, borderRadius: 11, paddingVertical: 14,
    alignItems: 'center', marginTop: 24,
  },
  btnTxt: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
