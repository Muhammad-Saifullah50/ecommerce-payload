'use client'

import { forgotPassword, logoutUser } from "@/actions/auth.actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const ResetPasswordButton = ({email}: {email: string}) => {

    const [loading, setLoading] = useState(false);
    const [clicked, setClicked] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        setLoading(true);
        try {
            const result = await forgotPassword(email);
            setClicked(true);
            
            if (result?.success) {
                await logoutUser();
                router.push(`/login?message=${encodeURIComponent('Password reset link sent to your email. Please check your email to reset your password.')}`);
            } else {
                console.error('Password reset failed:', result?.error);
                toast({
                    description: result?.error || 'Failed to send password reset email',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            toast({
                description: 'An error occurred while sending password reset email',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button 
            variant={'destructive'} 
            onClick={handleClick}
            disabled={loading || clicked}
        >
            {loading ? <Loader2 className="animate-spin" /> : 'Reset Password'}
        </Button>
    )
}

export default ResetPasswordButton