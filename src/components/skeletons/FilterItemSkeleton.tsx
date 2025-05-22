import { Skeleton } from "../ui/skeleton"

const FilterItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 my-4 w-full">

    <Skeleton className="h-4 w-40 rounded-full "/>
    <Skeleton className="h-4 w-40 rounded-full "/>
    <Skeleton className="h-4 w-40 rounded-full "/>
    <Skeleton className="h-4 w-40 rounded-full "/>
    </div>
  )
}

export default FilterItemSkeleton