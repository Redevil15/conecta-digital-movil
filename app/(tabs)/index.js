// Pestaña Solicitudes: READ — lista todas las solicitudes desde Firestore.
import { useState, useCallback } from 'react';
import {
  View, Text, FlatList, Pressable, StyleSheet, RefreshControl, ActivityIndicator,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { obtenerSolicitudes } from '../../src/services/solicitudesService';
import { firebaseConfigurado } from '../../src/services/firebaseConfig';
import { colors } from '../../src/theme';

export default function Solicitudes() {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const cargar = useCallback(async () => {
    try {
      setError(null);
      const lista = await obtenerSolicitudes();
      setData(lista);
    } catch (e) {
      setError('No se pudieron cargar las solicitudes. Revisa la configuración de Firebase.');
    } finally {
      setCargando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setCargando(true);
      cargar();
    }, [cargar])
  );

  if (!firebaseConfigurado) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline-outline" size={40} color={colors.textMuted} />
        <Text style={styles.aviso}>
          Configura tus llaves de Firebase en{'\n'}
          src/services/firebaseConfig.js para conectar la base de datos.
        </Text>
      </View>
    );
  }

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.navy} />
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      keyExtractor={(item) => item.id}
      refreshControl={<RefreshControl refreshing={false} onRefresh={cargar} />}
      ListEmptyComponent={
        <Text style={styles.vacio}>
          {error || 'Aún no hay solicitudes. Crea una desde la pestaña «Nueva».'}
        </Text>
      }
      renderItem={({ item }) => (
        <Pressable style={styles.card} onPress={() => router.push(`/solicitud/${item.id}`)}>
          <View style={{ flex: 1 }}>
            <Text style={styles.ct}>{item.titulo}</Text>
            <Text style={styles.cd}>{item.habilidad} · {item.modalidad}</Text>
            <View style={styles.tags}>
              <Text style={styles.tag}>{item.estado}</Text>
              {item.duracionHrs ? (
                <Text style={styles.tagTeal}>{item.duracionHrs} h</Text>
              ) : null}
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  aviso: { textAlign: 'center', color: colors.textMuted, fontSize: 14, lineHeight: 21 },
  vacio: { textAlign: 'center', color: colors.textMuted, marginTop: 40, fontSize: 14 },
  card: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border, borderRadius: 12,
    padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center',
  },
  ct: { fontSize: 15, fontWeight: '700', color: colors.navy },
  cd: { fontSize: 13, color: colors.steel, marginTop: 3 },
  tags: { flexDirection: 'row', gap: 6, marginTop: 8 },
  tag: {
    fontSize: 11, backgroundColor: '#E7EAF0', color: colors.navy, fontWeight: '600',
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, overflow: 'hidden',
  },
  tagTeal: {
    fontSize: 11, backgroundColor: '#E2EFEC', color: colors.teal, fontWeight: '600',
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, overflow: 'hidden',
  },
});
