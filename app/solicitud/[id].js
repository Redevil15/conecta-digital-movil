// Pantalla Detalle de solicitud: READ (una), UPDATE (editar/cambiar estado) y DELETE (borrar).
import { useState, useCallback } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  obtenerSolicitud, actualizarSolicitud, borrarSolicitud,
} from '../../src/services/solicitudesService';
import { colors } from '../../src/theme';

export default function Detalle() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [sol, setSol] = useState(null);
  const [cargando, setCargando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setCargando(true);
        setSol(await obtenerSolicitud(id));
        setCargando(false);
      })();
    }, [id])
  );

  const guardarCambios = async () => {
    await actualizarSolicitud(id, {
      titulo: sol.titulo,
      habilidad: sol.habilidad,
      modalidad: sol.modalidad,
      duracionHrs: Number(sol.duracionHrs) || 1,
    });
    Alert.alert('Actualizado', 'La solicitud se actualizó correctamente.');
  };

  const cambiarEstado = async () => {
    const nuevo = sol.estado === 'abierta' ? 'atendida' : 'abierta';
    await actualizarSolicitud(id, { estado: nuevo });
    setSol({ ...sol, estado: nuevo });
  };

  const eliminar = () => {
    Alert.alert('Eliminar solicitud', '¿Seguro que deseas borrar esta solicitud?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Borrar', style: 'destructive',
        onPress: async () => {
          await borrarSolicitud(id);
          router.replace('/(tabs)');
        },
      },
    ]);
  };

  if (cargando) {
    return <View style={styles.center}><ActivityIndicator size="large" color={colors.navy} /></View>;
  }
  if (!sol) {
    return <View style={styles.center}><Text style={styles.vacio}>Solicitud no encontrada.</Text></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.form}>
      <View style={styles.estadoRow}>
        <Text style={styles.estadoLbl}>Estado:</Text>
        <Pressable onPress={cambiarEstado} style={styles.estadoChip}>
          <Text style={styles.estadoTxt}>{sol.estado}</Text>
          <Ionicons name="swap-horizontal" size={14} color={colors.navy} />
        </Pressable>
      </View>

      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={sol.titulo}
        onChangeText={(t) => setSol({ ...sol, titulo: t })} />

      <Text style={styles.label}>Habilidad</Text>
      <TextInput style={styles.input} value={sol.habilidad}
        onChangeText={(t) => setSol({ ...sol, habilidad: t })} />

      <Text style={styles.label}>Modalidad</Text>
      <TextInput style={styles.input} value={sol.modalidad}
        onChangeText={(t) => setSol({ ...sol, modalidad: t })} />

      <Text style={styles.label}>Duración (horas)</Text>
      <TextInput style={styles.input} value={String(sol.duracionHrs ?? '')}
        keyboardType="numeric" onChangeText={(t) => setSol({ ...sol, duracionHrs: t })} />

      <Pressable style={styles.btn} onPress={guardarCambios}>
        <Text style={styles.btnTxt}>Guardar cambios</Text>
      </Pressable>
      <Pressable style={[styles.btn, styles.btnDel]} onPress={eliminar}>
        <Ionicons name="trash-outline" size={18} color="#fff" />
        <Text style={styles.btnTxt}>Borrar solicitud</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: { padding: 20 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  vacio: { color: colors.textMuted },
  estadoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  estadoLbl: { color: colors.steel, fontWeight: '600' },
  estadoChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#E7EAF0',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
  },
  estadoTxt: { color: colors.navy, fontWeight: '700', textTransform: 'capitalize' },
  label: { fontSize: 13, color: colors.steel, fontWeight: '600', marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border, borderRadius: 11,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15,
  },
  btn: {
    flexDirection: 'row', gap: 8, backgroundColor: colors.navy, borderRadius: 11,
    paddingVertical: 14, alignItems: 'center', justifyContent: 'center', marginTop: 20,
  },
  btnDel: { backgroundColor: colors.danger, marginTop: 12 },
  btnTxt: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
