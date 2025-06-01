// app/notifications/NotificationService.js

import * as Notifications from 'expo-notifications';

// Function to ask for notification permissions
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync(); // Check permissions
  if (status !== 'granted') {
    const permissionResponse = await Notifications.requestPermissionsAsync(); // Request permission if not granted
    if (permissionResponse.status === 'granted') {
      const token = await Notifications.getExpoPushTokenAsync();
      console.log("Push Token: ", token);
      // Store the token in your database or context
      return token;
    } else {
      console.log('Notification permissions not granted');
    }
  } else {
    const token = await Notifications.getExpoPushTokenAsync();
    console.log("Push Token: ", token);
    return token;
  }
};

// Function to schedule daily check-in notification
export const scheduleDailyNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Mental Health Check-In",
      body: "It's time to check in and track your mood!",
    },
    trigger: {
      hour: 9, // Set your desired hour
      minute: 0, // Set your desired minute
      repeats: true, // Notification will repeat every day
    },
  });
};

// Function to handle notification responses
export const handleNotificationResponse = () => {
  Notifications.addNotificationResponseReceivedListener(response => {
    // Handle what happens when user taps on notification
    console.log("Notification Response: ", response);
  });
};
