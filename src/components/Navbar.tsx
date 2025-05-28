import Image from 'next/image'
import SearchBox from './SearchBox'
import Link from 'next/link'

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center py-4 ">
        <Link href={'/'}>
          <Image src={'/logo.svg'} width={150} height={46} alt="logo" />
        </Link>
        <SearchBox />
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col gap-1 items-center">
            <Image src={'/profile.svg'} width={20} height={20} alt="profile" />
            <p className="text-xs text-gray-primary">Profile</p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <Image src={'/message.svg'} width={20} height={20} alt="profile" />
            <p className="text-xs text-gray-primary">Messages</p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <Image src={'/heart.svg'} width={20} height={20} alt="profile" />
            <p className="text-xs text-gray-primary">Orders</p>
          </div>
          <Link href={'/cart'} className="flex flex-col gap-1 items-center">
            <Image src={'/cart.svg'} width={20} height={20} alt="profile" />
            <p className="text-xs text-gray-primary">My cart</p>
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
