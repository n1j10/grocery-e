import React from 'react'
import Image from 'next/image'
import Api from '../_utils/Api'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
function Slider({ sliderList }) {
  return (

    <Carousel>
      <CarouselContent>
        {
          sliderList.map((slider, index) => (

            <CarouselItem key={index}>

              <Image src={`https://grocery-strapi-lhum.onrender.com${slider?.image[0]?.url}`}
                alt={slider?.title || 'slider'}
                width={1000}
                height={400}
                className='w-full h-[200px]  md:h-[600px]  object-cover rounded-2xl'
                unoptimized={true}
              />
            </CarouselItem>

          )

          )
        }

      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>


  )
}

export default Slider