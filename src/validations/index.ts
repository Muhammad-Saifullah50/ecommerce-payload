'use client'

import { z } from 'zod'

export const checkoutFormSchema = z.object({
  name: z.string().min(2).max(50),
  address: z.string().min(2).max(100),
  city: z.string().min(2).max(50),
  contactnumber: z.string().min(2).max(50).regex(/^\d{4}-\d{7}$/, 'Contact number must be in the format 1234-1234567'),

  email: z.string().email().optional(),
  notes: z.string().min(2).max(1000).optional(),
})

export const PaymentFormSchema = z.object({
  paymentMethod: z.enum(["1link-raast", "cod"], {
    required_error: "You need to select a payment method.",
  }),
})