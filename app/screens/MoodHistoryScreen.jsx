import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from './../utils/firebaseConfig';
import { useAuth } from './../context/AuthContext';

const MoodHistoryScreen = () => {
  const { user } = useAuth();
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoodData = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'moodCheckins'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setMoodData(data);
      } catch (error) {
        console.error('Error fetching mood data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodData();
  }, [user]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.date}>{new Date(item.timestamp.toDate()).toLocaleString()}</Text>
      <Text style={styles.mood}>Mood: {item.mood}</Text>
      <Text style={styles.note}>{item.note ? `📝 ${item.note}` : 'No note added.'}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading mood entries...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🗓️ Your Mood History</Text>
      <FlatList
        data={moodData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No mood check-ins yet.</Text>}
      />
    </View>
  );
};

export default MoodHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f9ff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  date: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 4,
  },
  mood: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 6,
  },
  note: {
    fontSize: 14,
    color: '#475569',
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#94a3b8',
  },
  loadingText: {
    marginTop: 15,
    color: '#64748b',
    fontSize: 15,
  },
});
