// app/TabNavigator.tsx
import HomeScreen from './screens';  // Import your screen components
import MoodHistoryScreen from './screens/MoodHistoryScreen'; // Import other screens
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mood History" component={MoodHistoryScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
