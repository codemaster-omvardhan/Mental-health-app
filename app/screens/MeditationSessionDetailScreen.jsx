// MeditationSessionDetailScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';

const MeditationSessionDetailScreen = ({ route }) => {
  const { title } = route.params;  // Receive the session title
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  const playAudio = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./../../assets/audio/meditation-audio.mp3')  // Add a path to your meditation audio file
    );
    setSound(sound);
    await sound.playAsync();
    setIsPlaying(true);
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>
        This is a brief description of the meditation session. Follow along to relax and clear your mind.
      </Text>

      <TouchableOpacity style={styles.playButton} onPress={isPlaying ? stopAudio : playAudio}>
        <Text style={styles.playText}>{isPlaying ? 'Stop Meditation' : 'Play Meditation'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  playButton: {
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  playText: {
    color: '#fff',
    fontSize: 18,
  },
  backButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f87171',
    borderRadius: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MeditationSessionDetailScreen;
