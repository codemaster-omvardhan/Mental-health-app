import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const MoodSelector = ({ mood, setMood }) => {
  const moods = [
    { emoji: '😀', label: 'Very Happy' },
    { emoji: '😊', label: 'Happy' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😢', label: 'Very Sad' },
  ];

  return (
    <View style={styles.moodContainer}>
      {moods.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setMood(item.emoji)}
          style={[
            styles.mood,
            mood === item.emoji && styles.selectedMood,
          ]}
        >
          <Text style={styles.moodText}>{item.emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    flexWrap: 'wrap',
  },
  mood: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f1f2f6',
    borderRadius: 10,
  },
  selectedMood: {
    backgroundColor: '#dcdde1',
    borderWidth: 2,
    borderColor: '#487eb0',
  },
  moodText: {
    fontSize: 30,
    textAlign: 'center',
  },
});

export default MoodSelector;
