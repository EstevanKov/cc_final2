import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { config } from "../../../../../config/config";

import Loginstorage from '@/components/features/storage';
const API_URL = config.API_URL;

// Solicitar permisos para notificaciones
import { Platform, Alert, Linking } from 'react-native';

// Solicitar permisos de notificación con manejo multiplataforma
export async function requestNotificationPermissions() {
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();

    if (newStatus !== 'granted') {
      if (Platform.OS === 'web') {
        // Mensaje en Web
        console.warn('Notification permissions are not available on Web. Please use a mobile device.');
        Alert.alert(
          'Permisos no otorgados',
          'Las notificaciones no están disponibles en el navegador. Intenta usar un dispositivo móvil.',
        );
      } else {
        // Abrir configuración en móviles
        Alert.alert(
          'Permisos no otorgados',
          'Por favor, habilita las notificaciones en la configuración del dispositivo.',
          [
            {
              text: 'Abrir configuración',
              onPress: async () => {
                if (Linking.openSettings) {
                  await Linking.openSettings();
                } else {
                  console.error('openSettings no está disponible en este entorno.');
                }
              },
            },
            { text: 'Cancelar', style: 'cancel' },
          ]
        );
      }
      return false;
    }
  }

  console.log('Notification permissions granted');
  return true;
}

// Solicitar permisos de notificación
export async function fetchAndScheduleNotifications() {
  console.log("Fetching notifications from the backend...");
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  const token = await Loginstorage.getItem("access_token");
  const id = await Loginstorage.getItem("id");

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

    console.log("Notifications fetched:", schedules);

    for (const schedule of schedules) {
      for (const notification of schedule.notifications) {
        const trigger = new Date(notification.sentAt);

        if (trigger > new Date()) {
          console.log("Scheduling notification:", notification.message);
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
