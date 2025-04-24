import { getPayload } from "payload"
import config from '@/payload.config'
import Image from "next/image"
import { Media, Subcategory } from "../../payload-types"
import Link from "next/link"
import { Button } from "./ui/button"
const CategoryGrid = async () => {

    const payload = await getPayload({ config })

    const categories = await payload.find({ collection: 'categories', depth: 1, limit: 2 })

    return (
        <div className="w-full flex flex-col gap-4">
            {
                categories.docs.map((category) => {

                    const subcategories = category?.subcategories as Subcategory[]
                    return (

                        <div className="grid lg:grid-cols-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-2 "
                            key={category.id}>
                            <div className="col-span-2 row-span-2 relative">
                                <Image
                                    src={(category.image as Media).url!}
                                    width={250}
                                    height={250}
                                    alt={(category.image as Media).alt! || 'image'}
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute top-0 p-8 flex flex-col gap-6">
                                    <h4 className="font-semibold text-xl max-w-1/2">{category.label}</h4>
                                    <Link href={category.link}>
                                        <Button
                                            className="bg-white text-black hover:bg-white/55 "
                                            size={'lg'}
                                        >Shop Now</Button>
                                    </Link>
                                </div>
                            </div>

                            {subcategories.map(async (subcategory, index) => {
                                const subcategoryImage = await payload.findByID({
                                    collection: 'media',
                                    id: subcategory.image as string
                                })

                                return (

                                    <div
                                        key={index}
                                        className="border w-full flex"
                                    >
                                      

                                        <div className=" p-4 flex flex-col gap-4 w-1/2 justify-start" >
                                            <h5>{subcategory.label}</h5>
                                            <p className="text-gray-primary text-sm">From USD 19</p>
                                            {/* have to make this dynamic */}
                                        </div>
                                        <div className="w-1/2 flex items-end py-4">
                                            <Image
                                                src={subcategoryImage.url!}
                                                width={220}
                                                height={120}
                                                alt={subcategoryImage.alt || 'image'}
                                            />
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                    )
                })
            }
        </div>

    )
}

export default CategoryGrid

