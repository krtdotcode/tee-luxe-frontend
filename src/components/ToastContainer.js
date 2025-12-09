import React from 'react';
import { Toast } from 'react-bootstrap';
import { useNotification } from '../contexts/NotificationContext';
import ToastComponent from './Toast';

const ToastContainer = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1060 }}>
      {notifications.map((notification) => (
        <ToastComponent
          key={notification.id}
          id={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
