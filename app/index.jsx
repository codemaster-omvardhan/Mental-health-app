import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from './utils/firebaseConfig';
import { signOut } from 'firebase/auth';

const Index = () => {
  const router = useRouter();
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://zenquotes.io/api/random');
      const data = await res.json();
      setQuote(`${data[0].q} — ${data[0].a}`);
    } catch (e) {
      setQuote('Stay strong. Keep going!');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Do you really want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            await signOut(auth);
            router.replace('/auth/login');
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#c7d2fe" />

      <Text style={styles.title}>Welcome 👋</Text>

      <View style={styles.quoteBox}>
        {loading ? (
          <ActivityIndicator color="#6b7280" />
        ) : (
          <Text style={styles.quote}>{quote}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/checkin')}>
        <Text style={styles.buttonText}>📝 Mood Check-In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/MoodHistoryScreen')}>
        <Text style={styles.buttonText}>📊 Mood History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/resources')}>
        <Text style={styles.buttonText}>📚 Mental Health Resources</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/GuidedMeditationScreen')}>
        <Text style={styles.buttonText}>🧘 Guided Meditation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 28,
  },
  quoteBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginBottom: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  quote: {
    fontStyle: 'italic',
    fontSize: 17,
    textAlign: 'center',
    color: '#334155',
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#6366f1',
    borderRadius: 16,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 30,
    padding: 14,
    backgroundColor: '#ef4444',
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
