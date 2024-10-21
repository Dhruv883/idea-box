import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className={`flex flex-col min-h-screen bg-black text-white relative `}>
      <Navbar />
      {/* <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="2" fill="rgba(255,255,255,0.3)">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="90" cy="90" r="2" fill="rgba(255,255,255,0.3)">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="4s"
                begin="2s"
                repeatCount="indefinite"
              />
            </circle>
            <path
              d="M10 10 L90 90"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,90;90,0"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg> */}

      {/* <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div> */}
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
