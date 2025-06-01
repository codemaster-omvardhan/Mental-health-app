import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  TextInput
} from 'react-native';

const allResources = [
  {
    title: 'Mental Health America',
    description: 'Community-based nonprofit promoting mental health.',
    link: 'https://www.mhanational.org/',
  },
  {
    title: 'National Suicide Prevention Lifeline',
    description: 'Free, confidential support for people in distress, 24/7.',
    link: 'https://suicidepreventionlifeline.org/',
  },
  {
    title: 'Calm - Guided Meditation & Relaxation',
    description: 'Meditation, sleep, and relaxation for stress relief.',
    link: 'https://www.calm.com/',
  },
  {
    title: 'Headspace - Meditation & Mindfulness',
    description: 'Guided meditation and mindfulness to reduce stress.',
    link: 'https://www.headspace.com/',
  },
  {
    title: 'BetterHelp - Online Counseling',
    description: 'Professional online therapy from licensed counselors.',
    link: 'https://www.betterhelp.com/',
  },
  {
    title: '7 Cups - Emotional Support',
    description: 'Free online chat with trained listeners and therapists.',
    link: 'https://www.7cups.com/',
  },
  // Add more if needed
];

const ResourcesScreen = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLinkClick = (url) => {
    Linking.openURL(url);
  };

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isBottom && visibleCount < filteredResources.length) {
      setVisibleCount((prev) => prev + 2);
    }
  };

  const filteredResources = allResources.filter((res) =>
    res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={400}
    >
      <Text style={styles.title}>🧘‍♀️ Mental Health Resources</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Search resources..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredResources.length === 0 ? (
        <Text style={styles.noResult}>No resources found.</Text>
      ) : (
        filteredResources.slice(0, visibleCount).map((resource, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{resource.title}</Text>
            <Text style={styles.cardDesc}>{resource.description}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleLinkClick(resource.link)}>
              <Text style={styles.buttonText}>Visit Resource</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default ResourcesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eef2ff',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#cbd5e1',
    borderWidth: 1,
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    color: '#64748b',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 12,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
