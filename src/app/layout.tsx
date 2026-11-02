import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Applies the persisted (or system) theme before first paint to avoid a flash.
// const themeInit = `try{var t=localStorage.getItem('theme');if(t==='dark'||(t!== 'light'&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`;
// dangerouslySetInnerHTML={{ __html: themeInit }} 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ServeTogether",
  description:
    "Social impact platform connecting volunteers with local social drives across Dhaka.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* <script /> */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
