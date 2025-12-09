import React from 'react';
import { Toast as BootstrapToast, Button } from 'react-bootstrap';

const Toast = ({ id, type, message, onClose }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return 'fa-check-circle';
      case 'error':
        return 'fa-exclamation-circle';
      case 'info':
        return 'fa-info-circle';
      default:
        return 'fa-info-circle';
    }
  };

  const getVariant = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  };

  return (
    <BootstrapToast
      className="position-fixed bottom-0 end-0 mb-3 me-3"
      style={{ zIndex: 9999, minWidth: '300px' }}
      onClose={() => onClose(id)}
      delay={5000}
      autohide
    >
      <BootstrapToast.Header className={`bg-${getVariant(type)} text-white`}>
        <i className={`fas ${getIcon(type)} me-2`}></i>
        <strong className="me-auto">
          {type === 'success' && 'Success'}
          {type === 'error' && 'Error'}
          {type === 'info' && 'Info'}
        </strong>
        <Button
          variant="outline-light"
          size="sm"
          className="border-0"
          onClick={() => onClose(id)}
        >
          ×
        </Button>
      </BootstrapToast.Header>
      <BootstrapToast.Body>
        {message}
      </BootstrapToast.Body>
    </BootstrapToast>
  );
};

export default Toast;
