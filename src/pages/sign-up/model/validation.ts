import { z } from 'zod';

export const SignUpValidationSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(10).max(128),
    confirm: z.string().min(10).max(128),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });
