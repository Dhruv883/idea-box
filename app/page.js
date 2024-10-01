import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Zap, Globe, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className={`flex flex-col min-h-screen bg-black text-white relative `}>
      <Navbar />
      <main className="flex-1">
        <section className="h-screen w-full flex items-center justify-center">
          <div className="w-3/4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-[5.25rem]/none">
                  Share Ideas, Build Projects, Collaborate
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Submit your project ideas, discover exciting projects, and
                  collaborate with innovators worldwide. Turn visions into
                  reality.
                </p>
              </div>
              <div className="flex items-center justify-center flex-wrap gap-y-3 gap-x-4">
                <Link href="/submit" className="rounded-2xl">
                  <Button className="text-xl px-4 py-6 rounded-2xl">
                    Submit an Idea
                  </Button>
                </Link>
                <Link href="/ideas" className="rounded-2xl">
                  <Button
                    variant="outline"
                    className="text-xl px-4 py-6 rounded-2xl"
                  >
                    Explore Ideas
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
