import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';

const GuidedMeditationScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const soundRef = useRef(null);

  const playSound = async () => {
    setLoading(true);
    try {
      // Set audio mode without interruptionModeIOS and interruptionModeAndroid
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        require('./../../assets/audio/meditation-audio.mp3'),
        { shouldPlay: true }
      );

      soundRef.current = sound;
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          stopSound();
        }
      });

    } catch (error) {
      console.error('Error playing sound:', error);
    }
    setLoading(false);
  };

  const stopSound = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
        setIsPlaying(false);
      } catch (e) {
        console.error('Error stopping sound:', e);
      }
    }
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4f46e5" />
      <Text style={styles.title}>🧘‍♂️ Guided Meditation</Text>

      <Image source={require('./../../assets/images/meditation.png')} style={styles.image} resizeMode="contain" />

      <Text style={styles.subtitle}>Relax your mind. Breathe deeply. Let go of the stress.</Text>

      {loading ? (
        <ActivityIndicator color="#fff" size="large" />
      ) : !isPlaying ? (
        <TouchableOpacity style={styles.playButton} onPress={playSound}>
          <Text style={styles.buttonText}>▶️ Play</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.stopButton} onPress={stopSound}>
          <Text style={styles.buttonText}>⏹️ Stop</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GuidedMeditationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d7aefc', // Gradient-like background color for calmness
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: '#f8e1e7',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
    fontStyle: 'italic',
  },
  image: {
    width: 220,
    height: 220,
    marginVertical: 20,
    borderRadius: 110, // Circular image
    borderWidth: 4,
    borderColor: '#fff',
  },
  playButton: {
    backgroundColor: '#22c55e', // Play button color
    padding: 16,
    borderRadius: 32,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
    elevation: 5, // Shadow for 3D effect
  },
  stopButton: {
    backgroundColor: '#ef4444', // Stop button color
    padding: 16,
    borderRadius: 32,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
    elevation: 5, // Shadow for 3D effect
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
