import { Product } from "payload-types"
import ProductCard from "./ProductCard"
import { PaginatedDocs } from "payload"
import { use } from "react"

const ProductGrid = ({  productsPromise }:  { productsPromise: PaginatedDocs<Product> | undefined }) => {

  const products = use(productsPromise)
  return (
     <ul className="flex flex-wrap gap-4 items-center justify-center">
              {products && products.docs.length > 0 ? (
                products?.docs.map((product: Product) => (
                  <ProductCard key={product.id} data={product} />
                ))
              ) : (
                <p>No products found</p>
              )}
            </ul>
  )
}

export default ProductGrid