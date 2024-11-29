import React, { useEffect } from 'react';
import { fetchAndScheduleNotifications } from './notificationView';

const NotificationComponent = () => {
  useEffect(() => {
    fetchAndScheduleNotifications();
  }, []); // Ejecuta la función una sola vez cuando se monta el componente.

  return null; // No necesita renderizar nada.
};

export default NotificationComponent;
