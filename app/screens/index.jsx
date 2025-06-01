// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { useRouter } from 'expo-router';
// import { auth } from './utils/firebaseConfig';
// import { signOut } from 'firebase/auth';

// const Index = () => {
//   const router = useRouter();
//   const [quote, setQuote] = useState('');
//   const [loading, setLoading] = useState(false);
//   const user = auth.currentUser;

//   const fetchQuote = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch('https://zenquotes.io/api/random');
//       const data = await res.json();
//       setQuote(`${data[0].q} — ${data[0].a}`);
//     } catch (e) {
//       setQuote('Stay strong. Keep going!');
//     }
//     setLoading(false);
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     router.replace('/auth/login');
//   };

//   useEffect(() => {
//     fetchQuote();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome 👋</Text>

//       <View style={styles.quoteBox}>
//         {loading ? <ActivityIndicator color="#888" /> : <Text style={styles.quote}>{quote}</Text>}
//       </View>

//       <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/checkin')}>
//         <Text style={styles.buttonText}>Mood Check-In</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/MoodHistoryScreen')}>
//         <Text style={styles.buttonText}>Mood History</Text>
//       </TouchableOpacity>

//       {/* ✅ YEH HAI NAYA BUTTON */}
//       <TouchableOpacity style={styles.button} onPress={() => router.push('/resources')}>
//         <Text style={styles.buttonText}>Mental Health Resources</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Index;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f3f4f6',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//   quoteBox: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginBottom: 30,
//   },
//   quote: { fontStyle: 'italic', fontSize: 16, textAlign: 'center' },
//   button: {
//     width: '100%',
//     padding: 15,
//     backgroundColor: '#4f46e5',
//     borderRadius: 10,
//     marginVertical: 8,
//     alignItems: 'center',
//   },
//   buttonText: { color: 'white', fontWeight: '600' },
//   logoutButton: {
//     marginTop: 30,
//     padding: 12,
//     backgroundColor: '#ef4444',
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//   },
//   logoutText: { color: '#fff', fontWeight: 'bold' },
// });
