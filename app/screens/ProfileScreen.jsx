import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from './../context/AuthContext';  // Custom Auth Context
import { db } from './../utils/firebaseConfig';  // Firebase configuration
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';  // Firestore methods

const ProfileScreen = () => {
  const { user } = useAuth();  // Get the authenticated user
  const [name, setName] = useState(user?.displayName || '');  // Track the user's name
  const [email, setEmail] = useState(user?.email || '');  // Track the user's email

  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!user) {
      alert('You must be logged in to update profile!');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);

      // Check if the document exists
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        // If the document does not exist, create it
        await setDoc(userRef, {
          displayName: name,
          email,
        });
      } else {
        // If the document exists, update it
        await updateDoc(userRef, {
          displayName: name,
          email,
        });
      }

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile: ', error);
      alert('Failed to update profile');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        editable={false}  // Email is read-only
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ProfileScreen;
