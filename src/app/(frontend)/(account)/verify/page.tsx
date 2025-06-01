import { getPayload } from "payload";
import config from '@/payload.config'
import { redirect } from "next/navigation";
interface SearchParams {
    [key: string]: string | undefined;
}
const VerifyPage = async ({ searchParams }: { searchParams: SearchParams }) => {

    const {token} = await searchParams;
    const payload = await getPayload({config})

    if (!token) {
        redirect(`/login?message=${encodeURIComponent('No verification token found')}`);
    } else {
            const result = await payload.verifyEmail({
            collection: 'customers',
            token
            });

        if (result) {
            redirect(`/login?message=${encodeURIComponent('Email verified successfully. Please login')}`);
        }
     
    }
    return (
        <div>VerifyPage</div>
    )
}

export default VerifyPage