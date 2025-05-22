import { ChevronRight } from 'lucide-react'
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
const Route = async ({ searchParams }: { searchParams: SearchParams }) => {
  const usableParams = await searchParams
  const categoryName = usableParams.category
  const subCategoryName = usableParams.subcategory

  const hasAnyParams = Object.values(usableParams).some((value) => value !== undefined)
  return (
    <div className="flex gap-2 text-gray-primary text-base">
      {hasAnyParams && (
        <div className="flex items-center gap-1">
          <p>Home</p>
          <ChevronRight className="w-4" />
          <p>{categoryName}</p>
          <ChevronRight className="w-4" />
          <p>{subCategoryName}</p>
        </div>
      )}
    </div>
  )
}

export default Route
