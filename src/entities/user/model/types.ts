import type { Notification } from '@/entities/notification';
import type { GetUserReturn } from '@/shared/model/types';

export type User = GetUserReturn;

export interface UserSocketListenEvents {
  signOut: () => void;
  addNotification: (payload: Notification) => void;
}
