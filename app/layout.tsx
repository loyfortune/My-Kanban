import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ToasterContext from "@/context/ToasterContext";
import Theme from "@/providers/Theme";


const ubuntu = Ubuntu({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});
//const geistSans = Geist({
//  variable: "--font-geist-sans",
//  subsets: ["latin"],
//});

//const geistMono = Geist_Mono({
//  variable: "--font-geist-mono",
//  subsets: ["latin"],
//});

export const metadata: Metadata = {
  title: "My Kanban",
  description: "Personal Kanban Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
      suppressHydrationWarning>
      <body className={`${ubuntu.className} min-h-full flex flex-col dark:bg-gray-900`}>
        <Theme>
        <ToasterContext />
        <Navbar/>
        {children}          
        </Theme>
        </body>
    </html>
  );
}
