import type { UserSocketListenEvents } from '@/entities/user/model/types';
import { createSocketClient } from '@/shared/api';
import type { Socket } from 'socket.io-client';

export const userSocket: Socket<UserSocketListenEvents> = createSocketClient('/user', {
  withCredentials: true,
});
