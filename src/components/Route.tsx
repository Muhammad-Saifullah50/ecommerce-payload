import { ChevronRight } from 'lucide-react'
import { use } from 'react'
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
const Route = ({ searchParams }: { searchParams: SearchParams }) => {
  const usableParams = use(searchParams)
  const categoryName = usableParams.category
  const subCategoryName = usableParams.subcategory
  const brand = usableParams.brand

  const hasAnyParams = Object.values(usableParams).some((value) => value !== undefined)
  return (
    <>
      {hasAnyParams && (
        <div className="flex items-center gap-1">
          <p>Home</p>
          {categoryName && (
            <>
              <ChevronRight className="w-4" />
              <p>{categoryName}</p>
            </>
          )}

          {subCategoryName && (
            <>
              <ChevronRight className="w-4" />
              <p>{subCategoryName}</p>
            </>
          )}
          {subCategoryName && (
            <>
              <ChevronRight className="w-4" />
              <p>{brand}</p>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Route
