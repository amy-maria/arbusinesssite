'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Carousel({ slides }: { slides: { title: string; featuredImage: { node: { sourceUrl: string; altText: string } } }[] }) {
  return (
    <Swiper spaceBetween={10} slidesPerView={1} loop={true} autoplay={{ delay: 5000 }}>
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <img src={slide.featuredImage.node.sourceUrl} alt={slide.featuredImage.node.altText} />
          <p>{slide.title}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
