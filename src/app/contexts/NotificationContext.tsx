// context/NotificationContext.tsx
import React, { createContext, useContext } from 'react';
import { message } from 'antd';

const NotificationContext = createContext({
  success: (content: string) => {},
  error: (content: string) => {},
  info: (content: string) => {},
  warning: (content: string) => {},
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const success = (content: string) => message.success(content);
  const error = (content: string) => message.error(content);
  const info = (content: string) => message.info(content);
  const warning = (content: string) => message.warning(content);

  return (
    <NotificationContext.Provider value={{ success, error, info, warning }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
