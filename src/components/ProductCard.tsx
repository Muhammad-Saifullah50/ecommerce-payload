import Image from "next/image"
import { Media, Product } from "../../payload-types"
import Link from "next/link"

type ProductCardProps = {
    data: Product
}
const ProductCard = ({ data }: ProductCardProps) => {
    if (!data) return
    return (
        <Link href={`/products/${data.slug}`}>
            <article className="flex flex-col gap-4 items-center justify-center border rounded-lg  bg-white max-h-[310px] max-w-[220px]">
                <Image
                    src={(data?.images[0] as Media).url!}
                    width={200}
                    height={200}
                    alt={data.title}
                    className=" object-cover h-[200px] w-[200px]" 
                />

                <div className="p-4">
                    <p className="font-medium">PKR {data.price}</p>
                    <p className="text-gray-primary text-base">{data.title}</p>
                </div>
            </article>
        </Link>
    )
}

export default ProductCard