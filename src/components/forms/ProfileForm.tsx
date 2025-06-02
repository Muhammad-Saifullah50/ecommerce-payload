'use client'

import { updateUser } from "@/actions/user.actions";
import { useToast } from "@/hooks/use-toast";
import { profileSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Customer } from "payload-types";
import { useState } from "react";
import { z } from "zod";
import { Card, CardContent } from "../ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Image from "next/image";
import { Button } from "../ui/button";
import { User } from "payload";

type UserType = (User & { collection: "users"; }) | (Customer & { collection: "customers"; }) | null | undefined;

const ProfileForm = ({ user }: { user: UserType }) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
        }
    });
    type ProfileFormValues = z.infer<typeof profileSchema>;

    const handleProfileUpdate: SubmitHandler<ProfileFormValues> = async (values) => {
        try {
            setLoading(true);
            const result = await updateUser({
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
            });

            if (result?.success) {
                toast({
                    description: 'Profile updated successfully'
                });
            } else {
                toast({
                    description: result.error || 'An error occurred',
                    variant: 'destructive'
                });
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={"flex flex-col gap-6"}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(handleProfileUpdate)}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Update Your Profile</h1>
                                    <p className="text-balance text-muted-foreground">
                                        Update your account information
                                    </p>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John" {...field} />
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
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Doe" {...field} />
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
                                                <Input placeholder="abc@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={loading}>
                                    Update Profile
                                </Button>
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
    
        </div>
    )
}

export default ProfileForm