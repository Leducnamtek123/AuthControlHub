// components/NotificationAlert.tsx
import React from 'react';
import { Alert } from 'antd';

interface NotificationAlertProps {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description?: string;
}

const NotificationAlert: React.FC<NotificationAlertProps> = ({ type, message, description }) => {
  return (
    <Alert
      message={message}
      description={description}
      type={type}
      showIcon
      style={{ marginBottom: '16px' }}
    />
  );
};

export default NotificationAlert;
