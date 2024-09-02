// hooks/useNotificationMessage.ts
import { message } from 'antd';

const useNotificationMessage = () => {
  const success = (content: string) => message.success(content);
  const error = (content: string) => message.error(content);
  const info = (content: string) => message.info(content);
  const warning = (content: string) => message.warning(content);

  return {
    success,
    error,
    info,
    warning,
  };
};

export default useNotificationMessage;
