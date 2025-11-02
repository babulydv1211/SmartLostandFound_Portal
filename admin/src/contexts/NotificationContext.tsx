
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface NotificationCounts {
  users: number;
  lostItems: number;
  foundItems: number;
  matchingItems: number;
}

interface NotificationContextType {
  notificationCounts: NotificationCounts;
  resetNotification: (key: keyof NotificationCounts) => void;
  updateNotificationCount: (key: keyof NotificationCounts, count: number) => void;
  incrementNotification: (key: keyof NotificationCounts) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notificationCounts, setNotificationCounts] = useState<NotificationCounts>({
    users: 0,
    lostItems: 0,
    foundItems: 0,
    matchingItems: 0
  });

  // Load counts from localStorage on component mount
  useEffect(() => {
    const savedCounts = localStorage.getItem('admin-notification-counts');
    if (savedCounts) {
      try {
        setNotificationCounts(JSON.parse(savedCounts));
      } catch (error) {
        console.error('Error loading notification counts:', error);
      }
    }
  }, []);

  // Save counts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('admin-notification-counts', JSON.stringify(notificationCounts));
  }, [notificationCounts]);

  // Memoize the functions to prevent infinite re-renders
  const resetNotification = useCallback((key: keyof NotificationCounts) => {
    setNotificationCounts(prev => ({
      ...prev,
      [key]: 0
    }));
  }, []);

  const updateNotificationCount = useCallback((key: keyof NotificationCounts, count: number) => {
    setNotificationCounts(prev => ({
      ...prev,
      [key]: count
    }));
  }, []);

  const incrementNotification = useCallback((key: keyof NotificationCounts) => {
    setNotificationCounts(prev => ({
      ...prev,
      [key]: prev[key] + 1
    }));
  }, []);

  const value = {
    notificationCounts,
    resetNotification,
    updateNotificationCount,
    incrementNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};




