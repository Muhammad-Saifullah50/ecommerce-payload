import { use } from "react"
import FeatureCheckbox from "./FeatureCheckbox"
import { AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
type Feature = {
  id?: string | null | undefined
  name: string
  value: string
  label: string
}
const FeaturesFilter = ({ featuresPromise }: { featuresPromise: Promise<Feature[]> }) => {

    const {allFeatures: features} = use(featuresPromise)
  return (
<AccordionItem value="item-3">
          <AccordionTrigger className="font-semibold text-base">Features</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {features &&
              features.map((feature: Feature) => {
                return <FeatureCheckbox key={feature.id} feature={feature} />
              })}
            {/* . also disoplay the features in the product page*/}
          </AccordionContent>
        </AccordionItem>  )
}

export default FeaturesFilter