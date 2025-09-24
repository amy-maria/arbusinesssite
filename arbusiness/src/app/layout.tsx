import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';
//import ThemeProvider from './ui/theme-provider';
import { Suspense } from "react";
//import Carousel from './ui/carousel'
import Loading from './loading';
import Image from "next/image";


export const metadata: Metadata = {
  title: "Amy Rowell",
  description: "Amy Rowell, full stack developer",
};

const navigation = [
  { name: 'home', href: '/', current: true },
  { name: 'blog', href: '/blog', current: false },
  { name: 'about', href: '/about', current: false },
  
]


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
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="../assets/bengal-2476933_1280.jpg"
                className="h-8 w-auto"
                width={32}
                height={32}
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
              {navigation.map((item) => (
  <Link
    key={item.name}
    href={item.href}
    aria-current={item.current ? 'page' : undefined}
    className={`
      ${item.current ? 'bg-gray-450/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}
      px-3 py-2 text-sm font-medium
    `}
  >
    {item.name}
  </Link>
))}
                </div>
                </div>
                </div>
                </nav>
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

          <div className="footer-container">
         <footer className="icons">
          <div className="inline-flex w-full justify-center">
            <ul className="footer-nav">
              <li>About</li>
              <li>Blog</li>
              <li>Contact</li>
              <li>Privacy</li>
              <li>Accessibility</li>
            </ul>
            </div>
            <div className="footer-icons">
            <ul >
              <li>
           <a href="/" className="iiz ijc">
            <span className="iil">Insert LinkedIn icon</span>
           </a>
           </li>
            <li>
           <a href="/" className="iiz ijc">
            <span className="iil">Insert GitHub icon</span>
           </a>
           </li>
            <li>
           <a href="/" className="iiz ijc">
            <span className="iil">Insert X icon</span>
           </a>
           </li>
           </ul>
           </div>

           <p >© 2024 Your Company, Inc. All rights reserved.</p>
      
          </footer>
          </div>
        </body>
    </html>
  );
}


