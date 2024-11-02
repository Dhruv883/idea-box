import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import NextAuthProvider from "./NextAuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaBox",
  description: "Share Ideas, Build Projects, Collaborate",
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <meta
          name="google-site-verification"
          content={`${process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}`}
        />
      </head>
      <html lang="en">
        <body className={`${poppins.className} antialiased scroll-smooth`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
        <GoogleAnalytics
          gaId={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        />
      </html>
    </NextAuthProvider>
  );
}
