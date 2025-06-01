'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { createAccountSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createAccount } from "@/actions/auth.actions"
import Link from "next/link"

const CreateAccountForm = ({
    className,
    ...props
}: React.ComponentProps<"div">) => {

    const [loading, setloading] = useState(false);
    const router = useRouter();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof createAccountSchema>>({
        resolver: zodResolver(createAccountSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    });
    type SignInFormValues = z.infer<typeof createAccountSchema>;

    const handleCredentialSubmit: SubmitHandler<SignInFormValues> = async (values) => {
        try {
            setloading(true);
            const result = await createAccount({
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
            });

            if (result?.success)
             {
                router.push(`/login?message=${encodeURIComponent('Check your email to verify')}`);
                // continue from 14:49
                toast({
                    description: 'Signed in successfully'
                });
            }
            else {

                toast({
                    description: result.error || 'An error occurred',
                    variant: 'destructive'
                });
            }

        } catch (error) {
            setloading(false);
            console.error(error);
        } finally {
            setloading(false);
        }
    }

    // const handleOAuthSubmit = async (provider: Provider) => {
    //     try {
    //         setloading(true)
    //          await signInWithOAuthProvider(provider, callbackUrl);

    //     } catch (error) {
    //         setloading(false);
    //         console.error(error);
    //         throw new Error('Failed to sign in')
    //         // TODO: Handle error
    //     }
    //     finally {
    //         setloading(false);
    //     }
    // }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>

                        <form className="p-6 md:p-8"
                            onSubmit={form.handleSubmit(handleCredentialSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Hello and Welcome</h1>
                                    <p className="text-balance text-muted-foreground">
                                        Create a new account
                                    </p>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John"

                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Doe"

                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="abc@example.com"

                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                type="password"
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    Create Account
                                </Button>
                                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>

                                    <Button variant="outline" className="w-full">
                                        <Image
                                            src={'/google.svg'}
                                            width={20}
                                            height={20}
                                            alt="google"
                                        />
                                        <span className="sr-only">Login with Google</span>
                                    </Button>
                                <div className="text-center text-sm">
                                    ALready have an account?{" "}
                                    <Link href="/login" className="underline underline-offset-4">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
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

export default CreateAccountForm