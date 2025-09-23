'use client'
import Image from 'next/image';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Scrollbar, A11y} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
//import { builtinModules } from 'module';

export default function Carousel({ slides }: { slides: { sourceUrl: string; altText: string }[] }) {
  if (!slides || !slides.length) return null;
  return (
    <Swiper 
    modules={[Navigation, Scrollbar, A11y]}
    spaceBetween={30} 
    slidesPerView={2} 
 
    loop={true}>
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <Image src={slide.sourceUrl} alt={slide.altText || `Slide ${i+1}`} 
          width={300}
          height={100}
          priority/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
