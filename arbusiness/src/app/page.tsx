'use client'
import { getCarouselSlides } from './api/carousel/getcarousel'
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface CarouselImage {
  sourceUrl: string;
  altText: string;
}

export default function Home() {
  const [carousel, setCarousel] = useState<CarouselImage[]>([]);
  const pageSlug = '/'; // Replace with your page URI if different

  useEffect(() => {
    async function fetchCarousel() {
      try {
        const carouselData = await getCarouselSlides(pageSlug);

        // Flatten carouselImage1,2,3 into an array
        const images: CarouselImage[] = [];
        ['carouselImage1', 'carouselImage2', 'carouselImage3'].forEach(key => {
          const imgNode = carouselData[key];
          if (imgNode && imgNode.node) {
            images.push({
              sourceUrl: imgNode.node.sourceUrl,
              altText: imgNode.node.altText || 'Carousel Image',
            });
          }
        });

        setCarousel(images);
      } catch (error) {
        console.error('Failed to load carousel:', error);
      }
    }

    fetchCarousel();
  }, []);

  return (
    <div>
      <h1>Homepage Carousel</h1>
      <div className="carousel">
        {carousel.map((img, idx) => (
          <div key={idx} className="carousel-slide">
            <Image
              src={img.sourceUrl}
              alt={img.altText}
              width={800}
              height={400}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}

 