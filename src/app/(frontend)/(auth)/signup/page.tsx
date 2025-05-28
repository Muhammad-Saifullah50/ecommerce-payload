import LoginForm from "@/components/loginForm"
import SignUpForm from "@/components/SignUpForm"
import { SearchParams } from "next/dist/server/request/search-params"

const SignUpPage = ({searchParams}: {searchParams: SearchParams}) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 w-full">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignUpForm searchParams={searchParams}/>
      </div>
    </div>
  )
}

export default SignUpPage