'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { LoginSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { loginAccount } from "@/actions/auth.actions"
import Link from "next/link"
import ForgotPassowordForm from "@/components/forms/ForgotPasswordForm"

const loginForm = ({ callbackUrl }: { callbackUrl?: string }) => {

  const [loading, setloading] = useState(false);
  const router = useRouter();
  const { toast } = useToast()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });
  type SignInFormValues = z.infer<typeof LoginSchema>;

  const handleCredentialSubmit: SubmitHandler<SignInFormValues> = async (values) => {
    try {
      setloading(true);
      const result = await loginAccount({
        email: values.email,
        password: values.password,

      });

      if (result?.success) {
        router.push(callbackUrl || '/');
        // have to push to the callback url
        toast({
          description: 'Logged in successfully'
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
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left side - Login section */}
          <div className="flex flex-col justify-center p-6 md:p-8">
            <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your account
                  </p>
                </div>
            {/* Form - only contains email, password, and login button */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCredentialSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="abc@example.com" {...field} />
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
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                      </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  Login
                </Button>
              </form>
            </Form>

            {/* Outside form */}
            <ForgotPassowordForm />

            <div className="relative text-center text-sm mt-6 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>

            <Button variant="outline" className="w-full mt-2">
              <Image src="/google.svg" width={20} height={20} alt="google" />
              <span className="sr-only">Login with Google</span>
            </Button>

            <div className="text-center text-sm mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/create-account" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>

          {/* Right side - Image */}
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

      {/* Terms and Conditions */}
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>

  )
}

export default loginForm