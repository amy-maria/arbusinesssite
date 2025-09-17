import Carousel from "./ui/carousel";
import { getCarouselSlides } from "./api/carousel/getcarousel";


export default async function Home() {
  const slides = await getCarouselSlides();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Main app page 
      
      <Carousel slides={slides} />
    </div>
  );
}
