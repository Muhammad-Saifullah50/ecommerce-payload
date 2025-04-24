import FilterSidebar from '@/components/FilterSidebar'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const ShopPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const usableParams = await searchParams

  return (
    <main className='flex flex-col gap-4 h-[calc(100vh-10rem)]'>
      <div className='flex gap-2 text-gray-primary text-base'>
        Home
        {/* <ChevronRight className='w-4' /> {categoryName} <ChevronRight className='w-4' /> {subCategoryName} <ChevronRight className='w-4' /> {product.docs[0].title} */}
      </div>
      <section className='flex gap-8'>
        <FilterSidebar parameters={usableParams} />

        <section>
          <h1>Products</h1>
        </section>
      </section>
    </main>
  )
}

export default ShopPage