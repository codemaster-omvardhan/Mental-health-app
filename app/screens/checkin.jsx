import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './../utils/firebaseConfig';
import { useAuth } from './../context/AuthContext';
import MoodSelector from './../components/MoodSelector';

const CheckInScreen = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const navigateToMoodTrends = () => {
    router.push('/screens/MoodTrendScreen');
  };

  const handleCheckIn = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to check in!');
      return;
    }
    if (!mood) {
      Alert.alert('Hold on!', 'Please select your mood before checking in.');
      return;
    }
    try {
      await addDoc(collection(db, 'moodCheckins'), {
        userId: user.uid,
        mood,
        note,
        timestamp: new Date(),
      });
      Alert.alert('Success', 'Mood checked in successfully!');
      router.replace('/');
    } catch (error) {
      console.error('Error adding mood check-in: ', error);
      Alert.alert('Error', 'Failed to check in mood');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 Check-in Your Mood</Text>

      <MoodSelector mood={mood} setMood={setMood} />

      <TextInput
        style={styles.input}
        placeholder="Write a note..."
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleCheckIn}>
        <Text style={styles.buttonText}>✅ Check In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={navigateToMoodTrends}>
        <Text style={styles.secondaryButtonText}>📈 View Mood Trends</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#e0f2fe',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginTop: 10,
    marginBottom: 24,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#334155',
  },
  button: {
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 2,
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
