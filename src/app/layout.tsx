import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Set MetaData for Page.
export const metadata: Metadata = {
  title: "RaceDay",
  description: "The RaceDay App.",
};


// Set Viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false
}

// Root layout for application
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="flex items-center justify-center">
      {/* User Context Provider*/}
      <body className="bg-white h-full w-full">
        <Toaster />
        {/* Main Section*/}
        <main className="flex-grow h-full w-full ">
          {children}
        </main>
      </body>
    </html >
  );
}

