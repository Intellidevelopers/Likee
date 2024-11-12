import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Set up notification handler with sound, vibration, and other configurations
Notifications.setNotificationHandler({
  handleNotification: async (notification) => ({
    shouldShowAlert: true,  // Show the notification alert
    shouldPlaySound: true,  // Play sound for the notification
    shouldSetBadge: false,  // Optional: Don't update the badge count
    vibrationPattern: [0, 250, 250, 250],  // Custom vibration pattern
  }),
});

// Function to register for push notifications and get the push token
export async function registerForPushNotificationsAsync() {
  let token;

  // Set up notification channel for Android (optional)
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],  // Vibration pattern
      lightColor: '#FF231F7C',
      sound: 'default',  // You can specify a custom sound here
    });
  }

  const { status } = await Notifications.getPermissionsAsync();

  if (status !== 'granted') {
    alert('You need to enable notifications to receive them');
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

// Function to trigger a push notification with custom sound, vibration, and icon
export const sendPushNotification = async (message) => {
  try {
    const notification = {
      to: message.userPushToken,  // Push token of the recipient user
      sound: 'default',  // Play the default notification sound (or specify a custom sound)
      title: `New message from ${message.name}`,  // Custom from name
      body: `You have a new message: "${message.message}"`,  // Body of the message
      data: { messageId: message.id },  // Additional data to be passed to the notification
      icon: 'https://example.com/custom-icon.png',  // URL to the custom icon (replace with your image URL)
      vibrationPattern: [0, 500, 200, 500],  // Custom vibration pattern (adjust as needed)
    };

    // Send the notification immediately
    await Notifications.scheduleNotificationAsync({
      content: notification,
      trigger: null,  // This sends the notification immediately
    });
  } catch (error) {
    console.error('Failed to send push notification:', error);
  }
};
