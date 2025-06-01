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

export const createAccountSchema = z.object({
  firstName: z.string().min(2, {
      message: "First name must be at least 3 characters.",
  }),
  lastName: z.string().min(2, {
      message: "Last name must be at least 3 characters.",
  }),
  email: z.string().email("Invalid email address."),
  password: z.string().min(2, {
      message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
  }),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Password and confirm password do not match.",
  path: ["confirmPassword"],
})
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(2, {
      message: "Please enter a password.",
  }),

})

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address."),
})