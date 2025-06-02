'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { PasswordResetSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { resetPassword } from "@/actions/auth.actions"
import {  Loader2 } from "lucide-react"

const PasswordResetForm = ({
  token
}: { token: string }) => {

  const [loading, setloading] = useState(false);
  const router = useRouter();
  const { toast } = useToast()

  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  });
  type SignInFormValues = z.infer<typeof PasswordResetSchema>;

  const handleCredentialSubmit: SubmitHandler<SignInFormValues> = async (values) => {
    try {
      setloading(true);
      const result = await resetPassword({
        token,
        password: values.password,

      });

      if (result?.success) {
        router.push(`/login?message=${encodeURIComponent('Password reset successfully')}`);

        toast({
          description: 'Password reset successfully',
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


  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>

            <form className="p-6 md:p-8"
              onSubmit={form.handleSubmit(handleCredentialSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Reset your password</h1>

                </div>
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
                  {loading ? (
                     <Loader2
                      className=" h-4 w-4 animate-spin" />
                  ): (
                    'Reset Password'
                  )}
                </Button>

              </div>
            </form>
          </Form>

        </CardContent>
      </Card>
    </div>
  )
}

export default PasswordResetForm