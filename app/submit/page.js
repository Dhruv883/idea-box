"use client";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Globe } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data, status } = useSession();
  const menu = [
    {
      title: "Share your project idea",
      content: "Share your innovative concept with our community",
      icon: <Lightbulb className="h-8 w-8" />,
      tag: "Idea",
      link: "idea",
    },
    {
      title: "Submit your open source project",
      content:
        "Showcase your project and collaborate with developers worldwide",
      icon: <Globe className="h-8 w-8" />,
      tag: "Project",
      link: "project",
    },
  ];

  if (status == "loading") return <div>Loading...</div>;

  return (
    <div className={`flex flex-col min-h-screen relative`}>
      <Navbar />
      <main className="flex-1">
        <section className="min-h-screen w-full flex justify-center pt-24">
          <div className="w-3/4 flex flex-col items-center">
            <h1 className="text-center text-3xl font-semibold sm:text-4xl md:text-5xl py-6">
              Submit Ideas, Projects
            </h1>
            <div className="grid lg:grid-cols-2 gap-16 py-12">
              {menu.map((item, idx) => {
                return (
                  <div key={idx} className="cursor-pointer">
                    <Link href={`/submit/${item.link}`}>
                      <Card
                        className={`group w-96 h-full bg-bgGray text-white border-[#242424]`}
                      >
                        <CardContent className="flex flex-col items-center p-6 h-full text-center">
                          <span className={`p-3 rounded-full mb-4 bg-bgGray2`}>
                            {item.icon}
                          </span>
                          <h2 className="text-xl font-semibold mb-2">
                            {item.title}
                          </h2>
                          <p className="text-textGray">{item.content}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
