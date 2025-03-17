import { z } from 'zod';

const Location = z.object({
  lat: z.number(),
  lng: z.number(),
  label: z.string().optional(),
});

export const AddOrderValidationSchema = z.object({
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  pickup: z.object({
    location: Location,
    date: z.date(),
  }),
  dropoff: z.object({
    location: Location,
    date: z.date(),
  }),
  payment: z.discriminatedUnion('method', [
    z.object({
      method: z.literal('credit-card'),
      data: z.object({
        number: z.string().length(16),
        expires: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/),
        cvc: z.string().length(3),
      }),
    }),
    z.object({
      method: z.literal('paypal'),
    }),
    z.object({
      method: z.literal('bitcoin'),
    }),
  ]),
  confirmation: z.object({
    newsletter: z.boolean(),
    policies: z.literal<boolean>(true, {
      errorMap: () => ({
        message: 'You need to agree with our service rules and policies to proceed with payment process',
      }),
    }),
  }),
});
