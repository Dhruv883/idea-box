import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import NextAuthProvider from "./NextAuthProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Idea Hub",
  description: "Share Ideas, Build Projects, Collaborate",
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <head>
        <link rel="icon" href="/favicon2.png" sizes="any" />
      </head>
      <html lang="en">
        <body className={`${poppins.className} antialiased scroll-smooth`}>
          <Toaster />
          {children}
        </body>
      </html>
    </NextAuthProvider>
  );
}
