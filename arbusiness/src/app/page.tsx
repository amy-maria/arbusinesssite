'use client'
import { getCarouselSlides } from './api/carousel/getcarousel'
import { useEffect, useState } from 'react';
import Carousel from './ui/carousel';
import CTA from './ui/cta';
import Hero from './ui/hero'
import ReviewSchema from './ui/reviewschema';

const AVERAGE_RATING = 4.7; // Replace with actual fetched rating
const REVIEW_COUNT = 150; // Replace with actual fetched count
const BUSINESS_NAME = "Your Client's Business Name";
const CLIENT_SITE_URL= process.env.NEXT_PUBLIC_WP_SITE_URL;


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
       <ReviewSchema 
        businessName={BUSINESS_NAME}
        ratingValue={AVERAGE_RATING}
        reviewCount={REVIEW_COUNT}
        url={CLIENT_SITE_URL} // Use the site's main URL or the post's canonical URL
         />
        <Hero  />
        <CTA /> 
        < Carousel slides={slides} />
        
      </div>
      
  );
}

 