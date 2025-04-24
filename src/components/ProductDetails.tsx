import Image from "next/image"
import { Category, Product, Subcategory } from "../../payload-types"
import { Button } from "./ui/button"

const ProductDetails = ({ product }: { product: Product }) => {
    const inStock = product.inStock
    return (
        <section className=" w-full flex flex-col gap-4">
            <div>
                {inStock ? (
                    <div className="flex gap-2">

                        <Image
                            src={'/tick.svg'}

                            alt="tick"
                            width={20}
                            height={20}
                        />
                        <p className="text-[#00B517]">In Stock</p>
                    </div>
                ) : (
                    <div className="flex gap-2">

                        <Image
                            src={'/cross.svg'}

                            alt="tick"
                            width={20}
                            height={20}
                        />
                        <p className="text-[#FA3434]">Out of Stock</p>
                    </div>
                )}
            </div>

            <h1 className="font-semibold text-2xl">{product.title}</h1>


            <div className="flex flex-col gap-4">

                <div className="flex justify-between w-full ">
                    <p className="text-gray-primary text-base">Price:</p>
                    <p className="flex w-1/2 text-left justify-start text-gray-600">PKR {product.price}</p>
                </div>
                <hr />
                <div className="flex justify-between w-full">
                    <p className="text-gray-primary text-base">Category:</p>
                    <p className="flex w-1/2 text-left justify-start text-gray-600"> {(product.category as Category).label}</p>
                </div>
                <div className="flex justify-between w-full">
                    <p className="text-gray-primary text-base">Sub Category:</p>
                    <p className="flex w-1/2 text-left justify-start text-gray-600">{(product.subcategory as Subcategory).label}</p>
                </div>
                <hr />

                <div className="flex justify-between w-full">
                    <p className="text-gray-primary text-base"> Protection:</p>
                    <p className="flex w-1/2 text-left justify-start text-gray-600">Refund Policy</p>
                </div>
                <div className="flex justify-between w-full">
                    <p className="text-gray-primary text-base">Sub Warranty:</p>
                    <p className="flex w-1/2 text-left justify-start text-gray-600">2 years </p>
                </div>

                <hr />
            </div>

            {/* add to cart */}

            <Button>Add to cart</Button>
        </section>
    )
}

export default ProductDetails