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
import CartItem from './CartItem'


const CartSheet = async () => {
  return (
    <Sheet open >
      <SheetTrigger asChild>{/* <Button variant="outline">Open</Button> */}</SheetTrigger>
      <SheetContent className="!min-w-[500px]">
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 w-full pt-4">
        <CartItem/>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet
