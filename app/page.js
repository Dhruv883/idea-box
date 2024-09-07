import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Lightbulb,
  Palette,
  Tag,
  Users,
  Link as LinkIcon,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black relative">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
          <div className="w-3/4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 ">
                <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-7xl/none">
                  Share Ideas, Build Projects, Collaborate
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Submit your project ideas, discover exciting concepts, and
                  collaborate with innovators worldwide. Turn visions into
                  reality.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Submit an Idea</Button>
                <Button variant="outline">Explore Projects</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Ideas That Look As Good As
              <br />
              They Innovate
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white border-gray-200">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="p-3 bg-black rounded-full">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Eye-Catching Ideas</h3>
                  <p className="text-center text-gray-500">
                    Turn boring concepts into brilliant ones. Your ideas will be
                    so good, people will want to build them!
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="p-3 bg-black rounded-full">
                    <Palette className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Easy Design Tools</h3>
                  <p className="text-center text-gray-500">
                    No tech skills needed! Just drag and drop to create stunning
                    project presentations in minutes.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="p-3 bg-black rounded-full">
                    <Tag className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Your Brand, Your Style</h3>
                  <p className="text-center text-gray-500">
                    Add your logo and colors with a click. Make ideas that match
                    your company's look.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="p-3 bg-black rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Collaboration Tools</h3>
                  <p className="text-center text-gray-500">
                    Connect with like-minded innovators. Build your dream team
                    for any project.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="p-3 bg-black rounded-full">
                    <LinkIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Shareable Links</h3>
                  <p className="text-center text-gray-500">
                    Generate and share links to your project ideas. Gather
                    feedback and support easily.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="p-3 bg-black rounded-full">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Ideas For Every Need</h3>
                  <p className="text-center text-gray-500">
                    From startups to established businesses, find the perfect
                    project idea for any scenario.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
