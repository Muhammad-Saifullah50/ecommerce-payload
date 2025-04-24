import { getPayload } from "payload"
import { Product, Subcategory } from "../../payload-types"
import config from '@/payload.config'
import HorizontalProductCard from "./HorizontalProductCard"

const MayLikeProducts = async ({ subcategory, currentProduct }: { subcategory: Subcategory | string, currentProduct: Product }) => {

    const payload = await getPayload({ config })

    const subcategoryItems = (await payload.find({
        collection: 'products', limit: 5,
        where: {
            subcategory: {
                equals: subcategory
            }
        }
    })).docs.filter(item => item.id !== (currentProduct as Product).id)

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold mb-2">You may also like</h3>

            <div className="flex flex-col gap-4">
                {subcategoryItems.map((item) => (
                    <HorizontalProductCard key={item.id} product={item} />
                ))}
            </div>
        </div>
    )
}

export default MayLikeProducts