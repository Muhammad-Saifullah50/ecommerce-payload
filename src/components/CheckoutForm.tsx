'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Order } from '../../payload-types'

import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { checkoutFormSchema } from '@/validations'
import { Textarea } from './ui/textarea'
import CheckoutCard from './CheckoutCard'
import Checkout from './Checkout'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

export const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams()

  const order_id = searchParams.get('order_id')
  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: '',
      email: '',
      contactnumber: '',
      address: '',
      city: '',
      notes: '',
    },
  })

  const { finalPriceAfterDiscount, items } = useCart()

  async function onSubmit(data: z.infer<typeof checkoutFormSchema>) {
    setIsLoading(true)
    try {
      const databody = {
        ...data,
        totalPrice: finalPriceAfterDiscount(),
        cartItems: items,
      }
      const request = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(databody),
      })

      const response = await request.json()

      const order = response.data

      if (response.status === 200) {
        toast({
          title: 'Order created successfully',
          description: 'Your order has been created successfully.',
        })

        setIsLoading(false)
        router.push(`/checkout/?order_id=${order.id}`)
      } else {
        toast({
          title: 'Something went wrong.',
          description: 'Your order could not be created. Please try again.',
          variant: 'destructive',
        })
        setIsLoading(false)
      }
    } catch {
      toast({
        title: 'Something went wrong.',
        description: 'Your order could not be created. Please try again.',
        variant: 'destructive',
      })
      setIsLoading(false)
    }
  }

  return (
    <section className="flex w-full gap-4 justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-between w-1/2 gap-4 space-y-6 bg-white rounded-lg border p-4 "
        >
          <div className="w-full space-y-6 flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="House number, Street name, Sector/Area, City, Postal code

"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g Karachi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactnumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234-1234567" {...field} type="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="abc@example.com" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Additional notes about the order" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Order'}
            </Button>
          </div>

        </form>
      </Form>
          <div className="flex flex-col gap-4 w-1/2">
            <CheckoutCard />
            {order_id && <Checkout order_id={order_id} />}
          </div>
    </section>
  )
}

export default CheckoutForm

