import Image from "next/image"
import { Media, Product } from "../../payload-types"

const HorizontalProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="flex gap-2 w-full">
            <div 
            className="flex gap-2 p-2 border rounded-lg cursor-pointer w-[80px] items-center justify-center  ">
                                
                <Image
                    src={(product.images[0] as Media).url!}
                    width={80}
                    height={80}
                    alt={product.title}
                    className="w-[70px] h-[70px] object-cover"
                />
            </div>

            <div className="flex flex-col gap-2 justify-start">
                <h3 className=" font-semibold">{product.title}</h3>
                <p className=" text-gray-primary"> PKR ${product.price}</p>
            </div>
        </div>
    )
}

export default HorizontalProductCard