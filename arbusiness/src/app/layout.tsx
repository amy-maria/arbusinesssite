import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';
//import ThemeProvider from './ui/theme-provider';
import { Suspense } from "react";
//import Carousel from './ui/carousel'
import Loading from './loading';
import Image from "next/image";
import HeaderNav from "./ui/headernav";
import FooterNav from "./ui/footernav";


export const metadata: Metadata = {
  title: "Amy Rowell",
  description: "Amy Rowell, full stack developer",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <header>
      <HeaderNav  />
        </header>
        {/* Place children where you want to render a page or nested layout */}
        <main>
          <Suspense fallback={ < Loading />}>
          {children}
          </Suspense>
          
          <div>
            {/*  Works, since Carousel is a Client Component */}
            
            {/*{<Carousel />}*/}
            <section>
             {/*{<side column />}*/}
             </section>
          </div>
          </main>
          <FooterNav  />
         
        </body>
    </html>
  );
}


