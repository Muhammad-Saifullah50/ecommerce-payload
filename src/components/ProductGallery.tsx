'use client'

import Image from "next/image"
import { Media } from "../../payload-types"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

const ProductGallery = ({ images }: { images: (Media | string)[] }) => {
    const [selectedImage, setSelectedImage] = useState(images[0])
    const [api, setApi] = useState<CarouselApi>();
    const [bottomCarouselApi, setbottomCarouselApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)


    useEffect(() => {
        if (!api || !bottomCarouselApi) {
            return
        }
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            const index = api.selectedScrollSnap()
            setCurrent(index)
            setSelectedImage(images[index])
            bottomCarouselApi?.scrollTo(index)


        })

    }, [api, images])

    const handleGalleryItemClick = (image: Media | string, index: number) => {
        setSelectedImage(image)
        setCurrent(index)
        api?.scrollTo(index)
        bottomCarouselApi?.scrollTo(index)

    }
    return (
        <div className="flex flex-col gap-4">

            <Carousel
                setApi={setApi}
                className="flex flex-col gap-4 w-[380px] h-[380px] p-2 border rounded-lg">
                <CarouselContent>

                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <Image
                                src={(image as Media).url!}
                                width={345}
                                height={345}
                                alt={(image as Media).alt || ''}
                                className="object-contain w-[345px] h-[345px]"
                            />
                        </CarouselItem>
                    ))}

                </CarouselContent>
                <CarouselPrevious className="left-[-4px]"/>
                <CarouselNext className="right-[-4px]"/>
            </Carousel>

            <Carousel className="flex gap-2" setApi={setbottomCarouselApi}>
                <CarouselContent className=" w-[380px] flex gap-2 px-4">

                    {images.map((image, index) => (
                        <CarouselItem
                            key={index}
                            className={cn("flex gap-2 p-2 border rounded-lg cursor-pointer basis-1/4", {
                                "border-2 border-gray-primary": selectedImage === image
                            })}
                            onClick={() => handleGalleryItemClick(image, index)}>
                            <Image
                                src={(image as Media).url!}
                                width={80}
                                height={80}
                                alt={(image as Media).alt || ''}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                
            </Carousel>
        </div>
    )
}

export default ProductGallery
