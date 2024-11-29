import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { config } from "../../../../../config/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = config.API_URL;

export async function fetchAndScheduleNotifications() {
  const token = await AsyncStorage.getItem("access_token");
  const id = await AsyncStorage.getItem("id");

  if (!id) {
    console.error("User ID not found");
    return;
  }

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const { data: schedules } = await axios.get(
      `${API_URL}shedules/user/${id}`,
      { headers }
    );

    for (const schedule of schedules) {
      for (const notification of schedule.notifications) {
        const trigger = new Date(notification.sentAt);

        if (trigger > new Date()) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Recordatorio',
              body: notification.message,
              sound: true,
            },
            trigger,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
}
