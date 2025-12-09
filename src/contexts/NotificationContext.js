import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type, message) => {
    const id = Date.now() + Math.random();
    const notification = { id, type, message };

    setNotifications(prev => [...prev, notification]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const showSuccess = (message) => addNotification('success', message);
  const showError = (message) => addNotification('error', message);
  const showInfo = (message) => addNotification('info', message);

  return (
    <NotificationContext.Provider value={{
      notifications,
      showSuccess,
      showError,
      showInfo,
      removeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
