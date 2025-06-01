import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './../utils/firebaseConfig';
import { useAuth } from './../context/AuthContext';
import MoodSelector from './../components/MoodSelector'; // ✅ Import MoodSelector

const MoodCheckinScreen = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const handleCheckIn = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to check in!');
      return;
    }

    if (!mood) {
      Alert.alert('Select a mood', 'Please choose a mood before checking in.');
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
      router.replace('/HomeScreen');
    } catch (error) {
      console.error('Error adding mood check-in: ', error);
      Alert.alert('Error', 'Failed to check in mood');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-in Your Mood</Text>

      <MoodSelector mood={mood} setMood={setMood} /> {/* ✅ Mood Selector */}

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Write a note..."
        value={note}
        onChangeText={setNote}
        multiline
      />

      <Button title="Check In" onPress={handleCheckIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f6fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default MoodCheckinScreen;
