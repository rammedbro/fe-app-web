import type { CarSocketListenEvents } from '@/entities/car/model/types';
import { createSocketClient } from '@/shared/api';
import type { Socket } from 'socket.io-client';

export function useCarSocket(carId: number) {
  const socket: Socket<CarSocketListenEvents> = createSocketClient('/cars', {
    forceNew: true,
    query: { carId },
  });

  onMounted(() => {
    socket.connect();
  });

  onUnmounted(() => {
    socket.disconnect();
  });

  return socket;
}
