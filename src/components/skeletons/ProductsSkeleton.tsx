import ProductSkeleton from "./ProductSkeleton"

const ProductsSkeleton = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-4 items-center justify-start">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    </div>
  )
}

export default ProductsSkeleton
