import io from 'socket.io-client';

export function useSocket(url: string, path: string): void {
  io(url, {
    secure: true,
    transports: ['websocket'],
    path,
  });
}
