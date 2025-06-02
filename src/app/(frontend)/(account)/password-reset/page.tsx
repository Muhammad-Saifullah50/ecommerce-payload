import { getCurrentUser } from "@/actions/user.actions"
import PasswordResetForm from "@/components/forms/PasswordResetForm";
import { CheckCircle } from "lucide-react";
import { redirect } from "next/navigation";

const PasswordResetPage = async ({ searchParams }: { searchParams: { token: string, message: string } }) => {

    const user = await getCurrentUser();

    if (user) {
        redirect("/");
    };

    const { message, token } = await searchParams;

    if (token) {
        return (
            <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 w-full ">
                <div className="w-full max-w-sm md:max-w-3xl flex flex-col gap-8">
                    {message && (
                        <div className="w-full mx-auto px-6 py-3 bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                <p className="text-emerald-800 text-sm font-medium leading-relaxed">{message}</p>
                            </div>
                        </div>
                    )}
                    <PasswordResetForm token={token} />
                </div>
            </div>
        )
    } else {
        redirect(`/login?message=${encodeURIComponent('No reset token found')}`);
    }

}

export default PasswordResetPage