'use client'
import { getCarouselSlides } from './api/carousel/getcarousel'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Carousel from './ui/carousel';

interface CarouselImage {
  sourceUrl: string;
  altText: string;
}

export default function Home() {
  const [slides, setSlides] = useState<{ sourceUrl: string; altText: string }[]>([]);
  const pageSlug = 'troubleshoot-carousel-9-22-25/'; // Replace with your page URI if different

  useEffect(() => {
    async function fetchCarousel() {
      try{
        const data = await getCarouselSlides(pageSlug);
        console.log("Carousel data from WP:", data); 
        // Flatten carouselImage1,2,3 into an array
        setSlides(data);
      } catch (error) {
        console.error('Failed to load carousel:', error);
      }
    }
        fetchCarousel();
  }, []);
    

  return (
    <div>
      <h1>Homepage Carousel</h1>
     
        < Carousel slides={slides} />
      
          </div>
      
  );
}

 