'use client'

import React, { useState } from 'react'
import PayWithOneLink from '@/payments/1link/payWithOneLink'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaymentFormSchema } from '@/validations'
import { toast } from '@/hooks/use-toast'
import { z } from 'zod'

const Checkout = ({ order_id }: { order_id: string }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  // Render the payment method based on selection
  const renderPaymentMethod = () => {
    switch (selectedPaymentMethod) {
      case '1link-raast':
        return <PayWithOneLink orderId={order_id} />
      // Add other payment methods here
      default:
        return null
    }
  }

  const form = useForm<z.infer<typeof PaymentFormSchema>>({
    resolver: zodResolver(PaymentFormSchema),
  })

  function onSubmit(data: z.infer<typeof PaymentFormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
 
  return (
    <div className="bg-white  rounded-lg border p-4">
      {/* Order summary */}
      <div className="">{/* Your order summary code */}</div>

      {/* Payment method selection */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <div className="">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value)
                        setSelectedPaymentMethod(value)
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1link-raast" />
                        </FormControl>
                        <FormLabel className="font-normal">Pay with 1 Link Raast</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="cod" />
                        </FormControl>
                        <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      {/* Render selected payment method */}
      {renderPaymentMethod()}
    </div>
  )
}

export default Checkout

// have to persist the form data even in refresh
// have to imtegrate on e4link and cod