// App.js
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  PanResponder,
  Modal,
  Pressable,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const THUMB_SIZE = 46; 

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const progress = useRef(new Animated.Value(0)).current;
  const slideX = useRef(new Animated.Value(0)).current;
  const SLIDE_WIDTH = 260;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const newX = Math.max(0, Math.min(gestureState.dx, SLIDE_WIDTH - THUMB_SIZE));
        slideX.setValue(newX);
      },
      onPanResponderRelease: (e, gestureState) => {
        const threshold = SLIDE_WIDTH - THUMB_SIZE - 10;
        if (gestureState.dx >= threshold) {
          slideX.setValue(SLIDE_WIDTH - THUMB_SIZE);
          setTimeout(() => setConfirmVisible(true), 150);
        } else {
          Animated.spring(slideX, { toValue: 0, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  const startProgress = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start();
  };

  async function fetchData() {
    setErrorMessage(null);
    setConfirmVisible(false);
    setLoading(true);
    startProgress();

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      if (!Array.isArray(data)) throw new Error('Invalid data format');

      setItems(data.slice(0, 20)); 
      Animated.timing(progress, { toValue: 1, duration: 300, useNativeDriver: false }).start(() => {
        setLoading(false);
        setSuccessVisible(true);
        Animated.timing(slideX, { toValue: 0, duration: 300, useNativeDriver: false }).start();
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setLoading(false);
      setErrorMessage(err.message);
      Alert.alert('Fetch Failed', err.message);
      Animated.timing(slideX, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    }
  }

  const onPressFetchButton = () => {
    Alert.alert('Fetch Data?', 'Do you want to fetch posts from the API?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => fetchData() },
    ]);
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Expo Mini-App — Fetch & Slide</Text>

      
      {loading && (
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>
      )}

      <View style={styles.slideWrapper}>
        <Text style={styles.label}>Slide to fetch</Text>
        <View style={[styles.slideTrack, { width: SLIDE_WIDTH }]}>
          <Animated.View
            style={[styles.slideThumb, { transform: [{ translateX: slideX }] }]}
            {...panResponder.panHandlers}
          >
            <Text style={styles.thumbText}>➜</Text>
          </Animated.View>
        </View>
        <Text style={styles.hint}>Drag the thumb to the right to trigger a fetch</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPressFetchButton}>
        <Text style={styles.buttonText}>Fetch (Button)</Text>
      </TouchableOpacity>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <View style={styles.listContainer}>
        <Text style={styles.subHeader}>Results ({items.length})</Text>

        <FlatList
          data={Array.isArray(items) ? items : []}
          keyExtractor={(item, index) => String(item?.id ?? index)}
          renderItem={({ item }) =>
            item ? (
              <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.title ?? 'No title'}</Text>
                <Text numberOfLines={2} style={styles.itemBody}>
                  {item.body ?? 'No content'}
                </Text>
              </View>
            ) : null
          }
        />
      </View>

      <Modal visible={confirmVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Confirm Fetch</Text>
            <Text style={styles.modalText}>Fetch posts from the API now?</Text>
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, styles.modalCancel]}
                onPress={() => {
                  setConfirmVisible(false);
                  Animated.timing(slideX, { toValue: 0, duration: 300, useNativeDriver: false }).start();
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, styles.modalOk]} onPress={() => fetchData()}>
                <Text style={styles.modalButtonText}>Fetch</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={successVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalText}>Fetched {items.length} items successfully.</Text>
            <Pressable
              style={[styles.modalButton, styles.modalOk, { alignSelf: 'flex-end' }]}
              onPress={() => setSuccessVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#4b7cff" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f7f7fb' },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  subHeader: { fontSize: 16, fontWeight: '600', marginBottom: 6 },

  progressContainer: {
    height: 8,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: { height: '100%', backgroundColor: '#5b9dff' },

  slideWrapper: { marginVertical: 12, alignItems: 'center' },
  slideTrack: {
    height: 60,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  slideThumb: {
    position: 'absolute',
    left: 0,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#4b7cff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  thumbText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  label: { fontSize: 14, marginBottom: 8 },
  hint: { fontSize: 12, color: '#666', marginTop: 6 },

  button: {
    marginTop: 16,
    backgroundColor: '#2d8cff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },

  listContainer: { flex: 1, marginTop: 10 },
  item: { padding: 10, backgroundColor: '#fff', marginBottom: 8, borderRadius: 8 },
  itemTitle: { fontWeight: '700', marginBottom: 4 },
  itemBody: { color: '#444' },
  errorText: { color: '#c44343', marginTop: 8 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { width: '85%', backgroundColor: '#fff', padding: 18, borderRadius: 12 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  modalText: { fontSize: 14, color: '#333', marginBottom: 12 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end' },
  modalButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginLeft: 8 },
  modalCancel: { backgroundColor: '#eee' },
  modalOk: { backgroundColor: '#2d8cff' },
  modalButtonText: { color: '#fff', fontWeight: '600' },

  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
