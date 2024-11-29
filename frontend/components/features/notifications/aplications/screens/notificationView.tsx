/*import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { config } from "../../../../../config/config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const API_URL = config.API_URL;

async function fetchAndScheduleNotifications() {
  const token = await AsyncStorage.getItem("access_token");
  const id = await AsyncStorage.getItem("id");

  if (!id) {
    console.error("User ID not found");
    return;
  }

  try {
    // Configura los encabezados con el token para la autenticación
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Realiza la petición GET con el token en los encabezados
    const { data: schedules } = await axios.get(
      `${API_URL}shedules/user/${id}`,
      { headers }
    );

    // Recorre los horarios para extraer las notificaciones
    for (const schedule of schedules) {
      for (const notification of schedule.notifications) {
        const trigger = new Date(notification.sentAt); // Usamos 'sentAt' para programar la notificación

        // Verifica si el horario de la notificación es futuro
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

useEffect(() => {
  fetchAndScheduleNotifications();
}, []);
*/import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

async function testNotification() {
    const trigger = new Date();
    trigger.setSeconds(trigger.getSeconds() + 5); // 5 segundos en el futuro
  
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Prueba de Notificación',
        body: 'Esta es una notificación de prueba',
        sound: true,
      },
      trigger,
    });
  
    console.log("Notificación programada para:", trigger);
  }
  
  useEffect(() => {
    testNotification();
  }, []);
  