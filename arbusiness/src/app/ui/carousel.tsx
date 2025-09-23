'use client'
import Image from 'next/image';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Scrollbar, A11y} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
//import { builtinModules } from 'module';

export default function Carousel({ slides }: { slides: { sourceUrl: string; altText: string }[] }) {
  if (!slides || !slides.length) return null;
 
  return (
    <Swiper 
    modules={[Navigation, Scrollbar, A11y]}
    spaceBetween={30} 
    centeredSlides={true}
    autoplay={{
      delay:2500,
      disableOnInteraction: false,
    }}
    slidesPerView={1} 
    navigation={true}
    scrollbar={{draggable: true}}
    loop={true}>
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className='relative w-full h-64'>
          <Image src={slide.sourceUrl} 
          alt={slide.altText || `Slide ${i+1}`} 
         fill
          style={{ objectFit: 'cover'}}
          priority
          />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
