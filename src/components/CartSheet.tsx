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
import Image from 'next/image'
const CartSheet = async () => {
  return (
    <Sheet open >
      <SheetTrigger asChild>{/* <Button variant="outline">Open</Button> */}</SheetTrigger>
      <SheetContent className="!min-w-[500px]">
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 w-full pt-4">
          <div className={'flex gap-2 border rounded-lg cursor-pointer '}>
            <Image
              src={'/api/media/file/daniel-korpai-hbTKIbuMmBI-unsplash-1024x1280-1.jpg'}
              width={80}
              height={80}
              alt={'dsds'}
              className="w-1/4"
            />

            <div className="flex flex-col gap-2 w-2/4 py-1">
              <h2 className="text-ellipsis line-clamp-1 font-medium">
                T-shirts with multiple colors, for men and lady
              </h2>
              <p className="text-ellipsis line-clamp-2 text-gray-primary text-base">
                Size: medium, Color: blue, Material: Plastic Seller: Artel Market
              </p>

              <div className="flex gap-2">
                <Button size={'sm'} variant={'destructive'}>
                  Remove
                </Button>
                <Button size={'sm'} variant={'outline'} className='text-blue-primary'>
                  Add to wishlist
                </Button>

              </div>
            </div>

            <div className="flex flex-col gap-2 w-1/4 py-1">
            <p>
      
               PKR 5000
              </p>
              <div className="flex gap-2 items-center justify-center">
                  
                  <span>+</span>
                  <span>1</span>
                  <span>-</span>
                </div> 
            </div>
          </div>
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
