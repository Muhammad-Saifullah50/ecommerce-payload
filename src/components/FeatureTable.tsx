import { Check } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Feature = {
  label: string
  value: string
  id: string
}

 const FeatureTable = ({ features }: { features: Feature[] }) => {

  if (features?.length == 0) return null
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Features</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {features.map((feature, index) => (
          <TableRow key={index}>
            <TableCell className="flex items-center gap-3">
              <Check className="h-4 w-4 text-gray-500" />
              {feature.label}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default FeatureTable
