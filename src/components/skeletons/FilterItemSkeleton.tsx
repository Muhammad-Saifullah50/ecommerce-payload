import { Skeleton } from "../ui/skeleton"

const FilterItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">

    <Skeleton className="h-4 w-10 rounded-full "/>
    <Skeleton className="h-4 w-10 rounded-full "/>
    <Skeleton className="h-4 w-10 rounded-full "/>
    <Skeleton className="h-4 w-10 rounded-full "/>
    </div>
  )
}

export default FilterItemSkeleton