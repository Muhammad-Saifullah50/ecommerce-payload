'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import { Banner, Media } from '../../payload-types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

type BannerCarouselProps = {
  banners: Banner[]
}

const BannerCarousel = ({ banners }: BannerCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (banners.length === 0) return
  return (
    <div className="w-full relative">
      <Carousel setApi={setApi} className="w-full relative">
        <CarouselContent>
          {banners.map((banner) => {
            const lastTwoWords = banner.title.split(' ').slice(-2).join(' ')
            const firstWords = banner.title.split(' ').slice(0, -2).join(' ')
            return (
              <CarouselItem key={banner.id} className="">
                <Image
                  src={(banner?.image as Media)?.url! || null}
                  width={500}
                  height={280}
                  alt={banner.title}
                  className="h-full w-full rounded-md object-cover"
                  placeholder={(banner?.image as Media)?.blurhash ? 'blur' : 'empty'}
                  blurDataURL={(banner?.image as Media)?.blurhash || undefined}
                />

                <div className="p-16 absolute z-50 text-black top-0">
                  <h3 className="text-[28px] font-normal">
                    {firstWords} <br />
                    <span className="font-bold text-[32px]">{lastTwoWords}</span>
                  </h3>

                  <Button
                    onClick={() => router.push(banner.link)}
                    size={'lg'}
                    className="mt-8 bg-white hover:bg-white/55 text-black"
                  >
                    Shop Now
                  </Button>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-5" />
        <CarouselNext className="absolute right-5" />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground absolute bottom-2 left-1/2 -translate-x-1/2">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`mx-1 inline-block h-2 w-2 rounded-full ${
              index === current - 1 ? 'bg-white' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default BannerCarousel
