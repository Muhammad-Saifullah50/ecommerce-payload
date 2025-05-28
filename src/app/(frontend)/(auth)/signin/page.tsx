import LoginForm from "@/components/loginForm"
import { SearchParams } from "next/dist/server/request/search-params"

const LoginPage = ({searchParams}: {searchParams: SearchParams}) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 w-full">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm searchParams={searchParams}/>
      </div>
    </div>
  )
}

export default LoginPage