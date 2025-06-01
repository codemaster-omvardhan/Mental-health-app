// BreathingExerciseScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const BreathingExerciseScreen = () => {
  const [expand, setExpand] = useState(new Animated.Value(1));

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(expand, {
          toValue: 1.5,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(expand, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]).start();
    }, 8000);

    return () => clearInterval(interval);
  }, [expand]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercise</Text>
      <Text style={styles.instructions}>
        Breathe in as the circle expands, and breathe out as it contracts.
      </Text>

      <Animated.View
        style={[styles.circle, { transform: [{ scale: expand }] }]}
      />
      <Text style={styles.footer}>Follow the breath cycle for 5 minutes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
  },
  circle: {
    width: 150,
    height: 150,
    backgroundColor: '#6366f1',
    borderRadius: 75,
    marginBottom: 20,
  },
  footer: {
    fontSize: 18,
    color: '#555',
  },
});

export default BreathingExerciseScreen;
