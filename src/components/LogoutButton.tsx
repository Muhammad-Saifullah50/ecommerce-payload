'use client'

import { logoutUser } from "@/actions/auth.actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const LogoutButton = () => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);
        try {
            const result = await logoutUser();


            if (result.success) {
                router.push('/login');
            } else {
                console.error('Logout failed:', result.error);
                toast({
                    description: result.error,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Button variant={'destructive'} onClick={handleLogout}>
            {loading ? <Loader2 className="animate-spin" /> : 'Logout'}
        </Button>
    )
}

export default LogoutButton