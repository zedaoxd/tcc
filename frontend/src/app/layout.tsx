import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/footer";
import { Toaster } from "sonner";
import AppProvider from "@/lib/app-provider";

const exo = Exo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "BLFLearn",
    template: "BLFLearn - %s",
  },
  description: "BLFLearn - This is your platform to learn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(exo.className)}>
        <AppProvider>
          <Navbar />

          {children}

          <Footer />

          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
