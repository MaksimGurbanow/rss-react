import { createContext, ReactNode, useContext, useState } from 'react';

const NotificationContext = createContext<{
  visible: boolean;
  setVisible: (v: boolean) => void;
}>({
  visible: false,
  setVisible: (_v: boolean) => _v,
});

export const useNotification = () => useContext(NotificationContext);

const NotificationPorvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  return (
    <NotificationContext.Provider value={{ visible, setVisible }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationPorvider;
