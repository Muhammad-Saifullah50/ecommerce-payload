import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json()
    const payload = await getPayload({ config })

    const order = await payload.create({
      collection: 'orders',
      data: {
        name: data.name,
        email: data.email,
        contactnumber: data.contactnumber,
        address: data.address,
        city: data.city,
        notes: data.notes,
        totalPrice: data.totalPrice,
        cartItems: data.cartItems,
      },
    })

    return NextResponse.json({ message: 'Order created successfully', data: order, status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Something went wrong', error: error, status: 500 })
  }
}
