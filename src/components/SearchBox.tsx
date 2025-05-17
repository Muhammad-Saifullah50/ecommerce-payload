import CategoryCombobox from './CategoryCombobox'
import { Button } from './ui/button'
import Form from 'next/form'
import { Input } from './ui/input'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { searchProducts } from '@/actions/product.actions'

const SearchBox = async () => {
  const payload = await getPayload({ config })
  const categories = await payload.find({ collection: 'categories' })

  const handleSearch = async (formData: FormData) => {
    'use server'
    const query = formData.get('query')

    const products = await searchProducts(query)
    console.log(products)
  }
  return (
    <Form action={handleSearch}>
      <div className="flex border border-blue-primary rounded-lg">
        <Input name="query" placeholder="Search" className="border-none" defaultValue={''} />
        <Button type="submit" className="rounded-l-none">
          Search
        </Button>
      </div>
    </Form>
  )
}

export default SearchBox

