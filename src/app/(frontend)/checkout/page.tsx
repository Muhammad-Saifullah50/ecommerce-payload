
import CheckoutForm from '@/components/CheckoutForm'
import { Suspense } from 'react'

const CheckoutPage = () => {
  return (
    <section className="flex gap-4 w-full justify-between p-2 py-8">
      <Suspense fallback={<p>Loading</p>}>

        <CheckoutForm />
      </Suspense>
    </section>
  )
}

export default CheckoutPage
