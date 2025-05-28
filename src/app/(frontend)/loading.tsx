import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
            <Loader2 className="animate-spin text-blue-primary" />

    </div>
  )
}

export default loading