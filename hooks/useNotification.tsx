import { createStyles } from '@mantine/core';
import { showNotification as show, updateNotification as update } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons-react';
import { IconAlertTriangle, IconX } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';
import { $language } from 'store';

type NotificationType = 'success' | 'error' | 'warning' | 'info';
type NotificationColors = {
  success: 'green';
  error: 'red';
  warning: 'yellow';
  info: 'indigo';
};

const icons = {
  success: <IconCheck />,
  error: <IconX />,
  warning: <IconAlertTriangle />,
  info: <IconAlertCircle />
};

const colors: NotificationColors = {
  success: 'green',
  error: 'red',
  warning: 'yellow',
  info: 'indigo'
};

export type NotificationProps = {
  id?: string;
  title?: string;
  message?: string;
  type?: NotificationType;
  loading?: boolean;
  autoClose?: number;
};

export type UpdateNotificationProps = {
  id: string;
  title?: string;
  message?: string;
  type?: NotificationType;
  loading?: boolean;
  autoClose?: number;
};

const useStyles = createStyles((theme) => ({
  green: {
    boxShadow: `0 4px 6px -1px ${theme.colors.green[9]}, 0 2px 4px -2px ${theme.colors.green[9]}`
  },

  red: {
    boxShadow: `0 4px 6px -1px ${theme.colors.red[9]}, 0 2px 4px -2px ${theme.colors.red[9]}`
  },

  indigo: {
    boxShadow: `0 4px 6px -1px ${theme.colors.indigo[9]}, 0 2px 4px -2px ${theme.colors.indigo[9]}`
  },

  yellow: {
    boxShadow: `0 4px 6px -1px ${theme.colors.yellow[9]}, 0 2px 4px -2px ${theme.colors.yellow[9]}`
  }
}));

export const notificationSignal = (data?: NotificationProps) => {
  const text = $language.value.text;

  show({
    id: data?.id,
    autoClose: data?.autoClose,
    title: data?.title || text[data?.type || 'success'],
    message: data?.message || 'Leave the building immediately',
    color: colors[data?.type || 'success'],
    icon: icons[data?.type || 'success'],
    loading: data?.loading,
    styles: (tm) => ({
      root: {
        boxShadow: `0 4px 6px -1px ${tm.colors[colors[data?.type || 'success']][9]}, 0 2px 4px -2px ${tm.colors[colors[data?.type || 'success']][9]}`
      }
    })
  });
};

export function useNotification() {
  const text = $language.value.text;
  const { classes } = useStyles();

  const showNotification = (data?: NotificationProps) => {
    show({
      id: data?.id,
      autoClose: data?.autoClose,
      title: data?.title || text[data?.type || 'success'],
      message: data?.message || 'Leave the building immediately',
      color: colors[data?.type || 'success'],
      icon: icons[data?.type || 'success'],
      loading: data?.loading,
      classNames: {
        root: classes[colors[data?.type || 'success']]
      }
    });
  };

  const updateNotification = (data: UpdateNotificationProps) => {
    update({
      id: data.id,
      autoClose: data.autoClose,
      title: data?.title || text[data?.type || 'success'],
      message: data?.message || 'Leave the building immediately',
      color: colors[data?.type || 'success'],
      icon: icons[data?.type || 'success'],
      loading: data?.loading
    });
  };

  return { showNotification, updateNotification };
}
