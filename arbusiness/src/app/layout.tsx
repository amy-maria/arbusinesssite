import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import HeaderNav from "./ui/headernav";
import FooterNav from "./ui/footernav";
import Loading from "./loading";
import CookieBanner from "./ui/cookiebanner";
import ClientScripts  from "./ui/clientscripts";

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
    <>
    <html lang="en">
      <body>
  
        <HeaderNav />
      
      
        <main className="px-4 py-12 max-w-6xl mx-auto">
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </main>

        <CookieBanner />

        <FooterNav />
        {/* Analytics / Client Scripts */}
        <ClientScripts />
      </body>
    </html>
    </>
  );
}
