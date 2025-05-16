import { logError } from '@/shared/lib/log';
import type { ManagerOptions, SocketOptions } from 'socket.io-client';
import { io } from 'socket.io-client';

export type SocketClientOptions = ManagerOptions & SocketOptions;

export function createSocketClient(namespace: string, options?: Partial<SocketClientOptions>) {
  const socket = io(namespace, {
    path: import.meta.env.SOCKET_PATH,
    autoConnect: false,
    reconnectionAttempts: 5,
    transports: ['websocket'],
    ...options,
  });

  socket.on('connect_error', logError);

  return socket;
}
