import { getPayload } from "payload"
import { Category, Product } from "../../payload-types"
import config from '@/payload.config'
import ProductCard from "./ProductCard"
const RelatedProducts = async ({ category, currentProduct }: { category: Category | string, currentProduct: Product }) => {
    const payload = await getPayload({ config })

    const categoryItems = (await payload.find({
        collection: 'products', limit: 5,
        where: {
            category: {
                equals: category
            }
        }
    })).docs.filter(item => item.id !== (currentProduct as Product).id);

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold mb-2">Related Products</h3>

            <div className="flex gap-4">
                {categoryItems.map((item) => (
                    <ProductCard key={item.id} data={item} />
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts