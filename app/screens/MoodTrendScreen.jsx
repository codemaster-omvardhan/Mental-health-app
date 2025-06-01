import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from './../utils/firebaseConfig';
import { useAuth } from './../context/AuthContext';

const MoodTrendsScreen = () => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchMoodData = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'moodCheckins'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'asc')
        );
        const querySnapshot = await getDocs(q);

        const moodMap = { '😀': 5, '😊': 4, '😐': 3, '😔': 2, '😢': 1 };

        const moodCount = { '😀': 0, '😊': 0, '😐': 0, '😔': 0, '😢': 0 };

        querySnapshot.forEach((doc) => {
          const entry = doc.data();
          const moodValue = entry.mood;

          if (moodCount[moodValue] !== undefined) {
            moodCount[moodValue] += 1;
          }
        });

        // Transform the data for PieChart
        const pieChartData = Object.keys(moodCount).map((key) => ({
          name: key,
          population: moodCount[key],
          color: getColorForMood(key),
          legendFontColor: '#7F7F7F',
          legendFontSize: 15
        }));

        setChartData(pieChartData);
      } catch (error) {
        console.error('Error loading mood trend data:', error);
      }
    };

    fetchMoodData();
  }, [user]);

  const getColorForMood = (mood) => {
    switch (mood) {
      case '😀':
        return '#27ae60';
      case '😊':
        return '#f39c12';
      case '😐':
        return '#95a5a6';
      case '😔':
        return '#e74c3c';
      case '😢':
        return '#c0392b';
      default:
        return '#bdc3c7';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Mood Distribution</Text>
        <Text style={styles.subTitle}>Check how your mood has been trending!</Text>
      </View>

      {/* No Data Message */}
      {chartData.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No mood data yet. Start checking in daily!</Text>
        </View>
      ) : (
        <View style={styles.chartContainer}>
          <PieChart
            data={chartData}
            width={Dimensions.get('window').width - 20}
            height={220}
            chartConfig={{
              backgroundColor: '#f5f6fa',
              backgroundGradientFrom: '#f5f6fa',
              backgroundGradientTo: '#dfe4ea',
              color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      )}

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Remember, your mood matters! Track it daily for better self-awareness.</Text>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f1f5f9',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subTitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  noDataText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 18,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default MoodTrendsScreen;
