import { footerLinks } from "@/constants"
import Image from "next/image"

const Footer = () => {
    return (
        <footer className="flex flex-wrap justify-between items-center px-6 py-4  gap-8">

            <div className="flex flex-col gap-4 max-w-3xs">
                <Image
                    src={'/logo.svg'}
                    alt="logo"
                    width={150}
                    height={50}
                />

                <p>Best information about the company gies here but now lorem ipsum is</p>

                <div>
                    {/* social icons */}
                </div>
            </div>

            {footerLinks.map((link) => (
                <div key={link.title}>
                    <h3 className="font-semibold">{link.title}</h3>
                    {link.links.map((item) => (
                        <a key={item.name} href={item.href} className="block py-1 text-base hover:text-black text-gray-primary">
                            {item.name}
                        </a>
                    ))}
                </div>
            ))}

            <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Get App</h3>
                <div className="flex flex-col gap-2">

                    <Image
                        src={'/appstoreicon.svg'}
                        width={120}
                        height={40}
                        alt="appstore"

                    />                
                    <Image
                        src={'/playstoreicon.svg'}
                        width={120}
                        height={40}
                        alt="appstore"

                    />                
                    </div>
            </div>
        </footer>
    )
}

export default Footer