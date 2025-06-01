import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const resources = [
  {
    title: 'Mental Health America',
    description: 'Mental Health America is a community-based nonprofit organization that promotes mental health as a critical part of overall wellness.',
    link: 'https://www.mhanational.org/',
  },
  {
    title: 'National Suicide Prevention Lifeline',
    description: 'The National Suicide Prevention Lifeline provides free, confidential support for people in distress, 24/7.',
    link: 'https://suicidepreventionlifeline.org/',
  },
  {
    title: 'Calm - Guided Meditation & Relaxation',
    description: 'Calm provides meditation, sleep, and relaxation techniques for managing anxiety and stress.',
    link: 'https://www.calm.com/',
  },
  {
    title: 'Headspace - Meditation & Mindfulness',
    description: 'Headspace offers guided meditation and mindfulness exercises to help reduce stress and improve mental well-being.',
    link: 'https://www.headspace.com/',
  },
  {
    title: 'National Alliance on Mental Illness (NAMI)',
    description: 'Offers support, education, and advocacy for mental health.',
    link: 'https://www.nami.org/',
  },
  {
    title: 'The Trevor Project',
    description: 'Provides support to LGBTQ+ youth experiencing mental health challenges.',
    link: 'https://www.thetrevorproject.org/',
  },
  {
    title: 'BetterHelp',
    description: 'Online therapy service with licensed professionals to support mental health.',
    link: 'https://www.betterhelp.com/',
  },
  {
    title: 'Talkspace',
    description: 'Provides online therapy and counseling through text, audio, and video sessions.',
    link: 'https://www.talkspace.com/',
  },
  {
    title: 'Mindful Schools',
    description: 'Offers mindfulness training for children and educators to promote mental well-being.',
    link: 'https://www.mindfulschools.org/',
  },
  {
    title: 'Psychology Today',
    description: 'Therapist directory to find licensed mental health professionals.',
    link: 'https://www.psychologytoday.com/',
  },
  {
    title: 'Crisis Text Line',
    description: 'Provides free 24/7 crisis support through text messaging.',
    link: 'https://www.crisistextline.org/',
  },
  {
    title: 'SAMHSA (Substance Abuse and Mental Health Services Administration)',
    description: 'Offers mental health resources, including helplines and treatment options.',
    link: 'https://www.samhsa.gov/',
  },
  {
    title: 'Mental Health Foundation',
    description: 'A UK-based charity that promotes mental health awareness and provides educational resources.',
    link: 'https://www.mentalhealth.org.uk/',
  },
  {
    title: 'Rethink Mental Illness',
    description: 'Provides support, information, and advice to people affected by mental illness.',
    link: 'https://www.rethink.org/',
  },
  {
    title: 'Depression and Bipolar Support Alliance (DBSA)',
    description: 'Supports individuals with mood disorders and their families.',
    link: 'https://www.dbsalliance.org/',
  },
  {
    title: 'Mayo Clinic - Mental Health',
    description: 'Offers expert articles and advice on managing mental health conditions.',
    link: 'https://www.mayoclinic.org/healthy-lifestyle/stress-management/expert-answers',
  },
  {
    title: 'Mind (UK)',
    description: 'Provides information, advice, and support on mental health issues.',
    link: 'https://www.mind.org.uk/',
  },
  {
    title: '7 Cups',
    description: 'Provides emotional support and online therapy from trained listeners.',
    link: 'https://www.7cups.com/',
  },
  {
    title: 'National Institute of Mental Health (NIMH)',
    description: 'Offers reliable information on mental health research, treatments, and conditions.',
    link: 'https://www.nimh.nih.gov/',
  },
  {
    title: 'Headspace for Work',
    description: 'A workplace mental health platform offering mindfulness tools.',
    link: 'https://www.headspace.com/work',
  },
  {
    title: 'The National Eating Disorders Association (NEDA)',
    description: 'Provides resources and support for those affected by eating disorders.',
    link: 'https://www.nationaleatingdisorders.org/',
  },
  {
    title: 'Therapists on Demand',
    description: 'Access licensed therapists online for mental health therapy sessions.',
    link: 'https://www.therapy.com/',
  },
  {
    title: 'Calm Harm',
    description: 'An app designed to help individuals resist the urge to self-harm.',
    link: 'https://calmharm.co.uk/',
  },
  {
    title: 'Stress Management Society',
    description: 'Offers resources to help reduce stress and improve overall mental well-being.',
    link: 'https://www.stress.org.uk/',
  },
];

const ResourcesScreen = () => {
  const handleLinkClick = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧘‍♀️ Mental Health Resources</Text>

      {resources.map((resource, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{resource.title}</Text>
          <Text style={styles.cardDesc}>{resource.description}</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleLinkClick(resource.link)}>
            <Text style={styles.buttonText}>Open Resource</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

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
    marginBottom: 25,
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

export default ResourcesScreen;
