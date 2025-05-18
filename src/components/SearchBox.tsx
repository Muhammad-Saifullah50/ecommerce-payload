'use client'

import { useState, useEffect } from 'react'
import { Input } from './ui/input'
import { searchProducts } from '@/actions/product.actions'
import { debounce } from 'lodash'
import { Product } from 'payload-types'
import ProductCard from './ProductCard'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const SearchBox = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[] | undefined>([])
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  // Debounced search function
  const debouncedSearch = debounce(async (searchTerm: string) => {
    if (searchTerm.trim() === '') {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    const products = await searchProducts(searchTerm)
    setResults(products?.docs)
    setLoading(false)
  }, 100)

  useEffect(() => {
    setLoading(true)
    debouncedSearch(query)

    // Cleanup debounce on unmount
    return () => {
      debouncedSearch.cancel()
    }
  }, [query])

  useEffect(() => {
    setQuery('')
    setResults([])
  }, [pathname])
  return (
    <div className="flex flex-col gap-2  w-1/2 items-center">
      <div className="flex border border-blue-primary rounded-lg w-full">
        <Input
          name="query"
          placeholder="Search"
          className="border-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div
        className={cn(
          'absolute z-50 bg-white top-20 mx-auto p-6 rounded-lg border flex flex-col gap-4 w-4/5',
          {
            hidden: query === '',
          },
        )}
      >
        <h4 className="font-semibold text-lg">Search Results for: &apos;{query}&apos;</h4>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin text-blue-primary" />
          </div>
        ) : results && results.length > 0 ? (
          <ul className="flex flex-wrap gap-4 items-center justify-center">
            {results.map((product: Product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </ul>
        ) : query.trim() !== '' ? (
          <p>No results</p>
        ) : null}
      </div>
    </div>
  )
}

export default SearchBox
