import { RichText } from '@payloadcms/richtext-lexical/react'

const ProductDescription = ({ data }: { data: any }) => {
  return (
    <div className='flex flex-col'>
      <h4 className='h-10 text-left align-middle font-medium text-muted-foreground text-sm'>Description</h4>
      <RichText data={data} />
    </div>
  )
}

export default ProductDescription
