import { z } from 'zod';

export const SignInValidationSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});
