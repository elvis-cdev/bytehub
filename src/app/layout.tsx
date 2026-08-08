import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.bytehub.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ByteHub — Real Projects for Student Developers",
    template: "%s | ByteHub",
  },
  description:
    "ByteHub connects student developers in Kenya with real-world software projects. Build your portfolio, gain experience, and get discovered by companies hiring student talent.",
  keywords: [
    "student developers Kenya",
    "student developer marketplace",
    "hire student developers",
    "software projects for students",
    "Kenya tech talent",
    "developer portfolio Kenya",
  ],
  authors: [{ name: "ByteHub" }],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: "ByteHub",
    title: "ByteHub — Real Projects for Student Developers",
    description:
      "Connecting student developers in Kenya with real-world software projects. Build your portfolio and get discovered.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ByteHub — Real Projects for Student Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ByteHub — Real Projects for Student Developers",
    description:
      "Connecting student developers in Kenya with real-world software projects.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
