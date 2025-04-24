import config from '@/payload.config'
import { getPayload } from 'payload'
import ProductCard from './ProductCard'

const LatestItemsGrid = async () => {
    const payload = await getPayload({ config })


    const products = await payload.find({ collection: 'products', limit: 8 })
    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-2xl">Latest Arrivals</h2>

            <div className='grid grid-cols-4 gap-4'>
                {products.docs.map((product) => (
                    <ProductCard key={product.id} data={product}/>
                ))}
            </div>
        </div>
    )
}

export default LatestItemsGrid

