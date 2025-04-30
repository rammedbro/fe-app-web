import { z } from 'zod';

export const AddReviewValidationSchema = z.object({
  title: z.string(),
  content: z.string(),
  rating: z.number().min(1).max(5),
});
