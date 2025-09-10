import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';
//import ThemeProvider from './ui/theme-provider';
import { Suspense } from "react";
//import Carousel from './ui/carousel'
import Loading from './loading';


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
      <nav>
          {/* Prefetched when the link is hovered or enters the viewport */}
           <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          {/* No prefetching */}
          <Link href="/contact">Contact</Link>
        </nav>
        </header>
        {/* Place children where you want to render a page or nested layout */}
        <main>
          <Suspense fallback={ < Loading />}>
          </Suspense>
          <div>{children}</div>
          <div>
            {/*  Works, since Carousel is a Client Component */}
            
            {/*{<Carousel />}*/}
            <section>
             {/*{<side column />}*/}
             </section>
          </div>
          </main>
          <footer>
            <ul>
              <li><Link href="/" ></Link></li>
             <li><Link href="/" ></Link></li>
             <li><Link href="/" ></Link></li>
            </ul>
          </footer>
      </body>
    </html>
  );
}
