import CategoryCombobox from "./CategoryCombobox"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import config from '@/payload.config'
import { getPayload } from 'payload'

const SearchBox = async  () => {

    const payload = await getPayload({ config })

    const categories = await payload.find({ collection: 'categories' })

    return (
        <div className="flex border border-blue-primary rounded-lg">

            <Input placeholder="Search" className="border-none"/>
            <CategoryCombobox categories={categories.docs} />
            <Button 
            className="rounded-l-none "
            >Search</Button>
        </div>
    )
}

export default SearchBox