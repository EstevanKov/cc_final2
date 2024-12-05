import React, { useEffect } from 'react';
import { fetchAndScheduleNotifications } from './notificationView';

const NotificationComponent = () => {
  useEffect(() => {
    // Configurar un intervalo para obtener notificaciones cada cierto tiempo
    const intervalId = setInterval(() => {
      fetchAndScheduleNotifications();
    }, 60000); // Intervalo de 60 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  return null; // Componente sin UI
};

export default NotificationComponent;
