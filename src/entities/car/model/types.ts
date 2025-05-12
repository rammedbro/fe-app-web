import type { Review } from '@/entities/review';

export { CarSteering, CarType } from '@/shared/model/types';
export type { Car, GetCarReturn } from '@/shared/model/types';

export const CarCapacity = {
  '2': 2,
  '4': 4,
  '6': 6,
  '8': 8,
} as const;

export type CarCapacity = keyof typeof CarCapacity;

export interface CarSocketListenEvents {
  addReview: (payload: Review) => void;
}
