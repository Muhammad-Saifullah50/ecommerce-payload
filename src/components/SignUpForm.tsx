'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signInSchema, signUpSchema } from "@/validations"
import { loginAction, signUp } from '../actions/auth.actions'
import Link from "next/link"
import { SearchParams } from "next/dist/server/request/search-params"
import { Loader2 } from "lucide-react"


interface SignUpFormProps {
    searchParams: SearchParams
}

const SignUpForm = ({ searchParams }: SignUpFormProps) => {
    const { callbackUrl } = use(searchParams)
    const [loading, setloading] = useState(false);
    const router = useRouter();
    const { toast } = useToast()

    const schema = signUpSchema;

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    type SignInFormValues = z.infer<typeof schema>;

    const handleCredentialSubmit: SubmitHandler<SignInFormValues> = async (values) => {
        try {
            setloading(true)

            const result = await signUp({email: values.email, password: values.password})

            if (result && 'user' in result && result.user) {
                router.push(callbackUrl || '/')
                toast({ description: 'Signed up and logged in successfully' })
            } else {
                toast({
                    description: 'Signup failed. Please try again.',
                    variant: 'destructive',
                })
            }
        } catch (error) {
            console.error(error)
            toast({
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setloading(false)
        }
    }


    // const handleOAuthSubmit = async (provider: Provider) => {
    //   try {
    //     setloading(true)
    //     await signInWithOAuthProvider(provider, callbackUrl);

    //   } catch (error) {
    //     setloading(false);
    //     console.error(error);
    //     throw new Error('Failed to sign in')
    //     // TODO: Handle error
    //   }
    //   finally {
    //     setloading(false);
    //   }
    // }
    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={form.handleSubmit(handleCredentialSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Hello and welcome</h1>
                                <p className="text-balance text-muted-foreground">
                                    Create an account to get started
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    {...form.register('name')}
                                    required
                                    placeholder="Someone"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...form.register('email')}
                                    required
                                    placeholder="m@example.com"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    {...form.register('password')}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    {...form.register('confirmPassword')}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (

                                    'Sign up'
                                )}
                            </Button>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                            <div className="flex gap-4">
                                <Button variant="outline" className="w-full">
                                    <Image src={'/apple.svg'} width={20} height={20} alt='apple' />
                                    <span className="sr-only">Login with Apple</span>
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Image src={'/google.svg'} width={20} height={20} alt='google' />
                                    <span className="sr-only">Login with Google</span>
                                </Button>

                            </div>
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/signin" className="underline underline-offset-4">
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <Image
                            src="/auth.png"
                            alt="Image"
                            width={500}
                            height={500}
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}

export default SignUpForm
// have to implememnt middleware
// emial vaklidation
// profile functyionaolty
// responsioveness