import { Skeleton } from '@/components/ui/skeleton'

const ProductSkeleton = () => {
  return (
    <div>
      <Skeleton className="flex flex-col gap-4 items-center justify-center border rounded-lg max-h-[310px] max-w-[220px]">
        <Skeleton className=" h-[200px] w-[200px]" />

        <div className="p-4 gap-4 flex flex-col">
          <Skeleton className="rounded-lg h-4 w-40"/> 
          <Skeleton className="rounded-lg h-4 w-40"/>
        </div>
      </Skeleton>
    </div>
  )
}

export default ProductSkeleton
