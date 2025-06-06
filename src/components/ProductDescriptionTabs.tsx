import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import FeatureTable from './FeatureTable'
import { Description } from '@radix-ui/react-toast'
import ProductDescription from './ProductDescription'

const ProductDescriptionTabs = ({
  description,
  features,
}: {
  description: SerializedEditorState
  features: any
}) => {
  return (
    <Tabs defaultValue="description" className="relative mr-auto w-full">
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="description"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold  shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:shadow-none data-[state=active]:!text-blue-primary text-gray-primary text-base"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold  shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:shadow-none  data-[state=active]:!text-blue-primary text-gray-primary text-base"
        >
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description" className='flex flex-col gap-8'>
        <FeatureTable features={features} />
        <ProductDescription  data={description}/>
      </TabsContent>
      <TabsContent value="reviews">Change your password here.</TabsContent>
    </Tabs>
  )
}

export default ProductDescriptionTabs
