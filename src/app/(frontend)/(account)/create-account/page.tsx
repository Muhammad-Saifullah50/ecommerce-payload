import CreateAccountForm from '@/components/forms/CreateAccountForm'
import React from 'react'

const CreateAccountPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 w-full">
    <div className="w-full max-w-sm md:max-w-3xl">
      <CreateAccountForm />
    </div>
  </div>
  )
}

export default CreateAccountPage