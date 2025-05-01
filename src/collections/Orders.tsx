import PaymentField from '@/components/PaymentField'
import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'contactnumber',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'notes',
      type: 'text',
      required: true,
    },
    {
      name: 'totalPrice',
      type: 'number',
      required: true,
    },
    {
      name: 'cartItems',
      type: 'relationship',
      required: true,
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { label: 'Cash on Delivery', value: 'cod' },
        { label: '1Link RAAST', value: '1link-raast' },
        // Other payment methods...
      ],
    },
    {
      name: 'paymentStatus',
      defaultValue: 'pending',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
      ],
    },
    {
      name: 'paymentData',
      type: 'json',
      admin: {
        readOnly: true,
        components: {
          Field: PaymentField,
        },
      },
    },
  ],
}
