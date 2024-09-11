import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Zap, Globe, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  const cardDate = [
    {
      title: "Out-of-the-Box Ideas",
      content:
        "Explore unconventional concepts and groundbreaking innovations. Push the boundaries of creativity and inspire others!",
      icon: <Zap className="h-10 w-10 text-white" />,
    },
    {
      title: "Open Source Showcase",
      content:
        "Discover and contribute to groundbreaking open source projects. Showcase your work and collaborate with developers around the world.",
      icon: <Globe className="h-10 w-10 text-white" />,
    },
    {
      title: "Collaboration",
      content:
        "Find the perfect people to work with you. Build your dream team with ease.",
      icon: <Users className="h-10 w-10 text-white" />,
    },
    {
      title: "Idea Validation",
      content:
        "Get instant feedback on your concepts from our community of innovators and industry experts",
      icon: <Target className="h-10 w-10 text-white" />,
    },
  ];

  return (
    <div className={`flex flex-col min-h-screen bg-white text-black relative `}>
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black flex items-center justify-center">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl text-center mb-8 text-white">
              Ideas That Look As Good As
              <br />
              They Innovate
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
              {cardDate.map((card, idx) => {
                return (
                  <Card
                    className="bg-bgGray border-[#242424] max-w-[30rem]"
                    key={idx}
                  >
                    <CardContent className="flex flex-col items-center space-y-4 p-6">
                      <div className="p-4 bg-bgGray2 rounded-full">
                        {card.icon}
                      </div>
                      <h3 className="text-2xl font-semibold text-white">
                        {card.title}
                      </h3>
                      <p className="text-center text-textGray">
                        {card.content}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
