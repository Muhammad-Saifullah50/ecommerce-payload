import BannerCarousel from "./BannerCarousel"
import config from '@/payload.config'
import { getPayload } from 'payload'


const Hero = async () => {
    const payload = await getPayload({ config })

    const banners = await payload.find({ collection: 'banners' })

    return (
        <div className="flex gap-4 p-4 bg-white border rounded-lg">
            <BannerCarousel banners={banners.docs} />
        </div>
    )
}

export default Hero