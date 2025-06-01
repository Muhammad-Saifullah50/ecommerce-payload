'use client';

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgotPasswordSchema } from "@/validations";
import { forgotPassword } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const ForgotPassowordForm = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        }
    });
    type SignInFormValues = z.infer<typeof forgotPasswordSchema>;


    const handleSubmit = async (values: SignInFormValues) => {
        try {

            setLoading(true);
            const result = await forgotPassword(values.email);

            if (result.success) {
                setOpen(false)
                setOpen(false);
                router.push(`/login?message=${encodeURIComponent('Instructions to reset your password have been sent to your email.')}`);
            } else {
                setOpen(false);
                console.error('Forgot password error on client', result.error);
                toast({
                    description: result.error,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Forgot password error on client', error);

        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="link"
                    className="w-full text-sm underline-offset-2 hover:underline "
                >
                    Forgot your password?
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Forgot Password</DialogTitle>
                    <DialogDescription>
                        Enter your email to receive a password reset link.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >

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

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Send Reset Link</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};


export default ForgotPassowordForm