import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import CartList from './CartList'
import Link from 'next/link'

const CartSheet = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="!min-w-[500px] flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle>Your cart</SheetTitle>
          </SheetHeader>
          <CartList />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Link href={'/cart'} className='w-full'>
              <Button className="w-full">Proceed</Button>
            </Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet
