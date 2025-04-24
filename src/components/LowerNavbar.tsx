import Image from "next/image"
import CategoryCombobox from "./CategoryCombobox"
import { getPayload } from "payload"
import config from '@/payload.config'
import Link from "next/link"


const LowerNavbar = async () => {
    const payload = await getPayload({ config })

    const categories = await payload.find({ collection: 'categories' })
    return (
        <nav className="flex items-center justify-start gap-4 text-base  py-2 border-y">

            <Image
                src={'/menu.svg'}
                width={24}
                height={24}
                alt="menu"
            />
            <CategoryCombobox categories={categories.docs} classNames='border-none text-base text-sm !w-[250px]' />

            <Link href={'/'}>Hot Offers</Link>
            <Link href={'/'}>Projects</Link>
            <Link href={'/'}>Help</Link>
        </nav>
    )
}

export default LowerNavbar