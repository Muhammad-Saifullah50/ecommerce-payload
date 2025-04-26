import CartList from '@/components/CartList'
import CheckoutCard from '@/components/CheckoutCard'

const cartPage = () => {

  return (
    <section className="flex gap-4 px-6 py-4">
      <section className="w-3/4">
        <CartList />
      </section>

      <CheckoutCard/>
    </section>
  )
}

export default cartPage