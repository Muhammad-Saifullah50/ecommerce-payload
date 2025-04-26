import { useCart } from '@/context/CartContext'
import { Button } from './ui/button'

const Counter = ({
  itemId,
  count,
  setCount,
}: {
  itemId: string
  count: number
  setCount: (count: number) => void
}) => {
  const { updateQuantity } = useCart()

  const handleUpdateQuantity = (newQuantity: number) => {
    setCount(newQuantity)
    updateQuantity(itemId, newQuantity)
  }
  return (
    <div className="flex gap-2 items-center justify-center">
      <Button variant={'outline'} size={'sm'} onClick={() => handleUpdateQuantity(count + 1)}>
        +
      </Button>
      <span>{count}</span>
      <Button
        variant={'outline'}
        size={'sm'}
        disabled={count === 1}
        onClick={() => handleUpdateQuantity(count - 1)}
      >
        -
      </Button>
    </div>
  )
}

export default Counter
