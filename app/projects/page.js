"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const mockProjects = [
  {
    id: 1,
    name: "Sample Name",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit Veritatis facere",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas temporaLorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas tempora",
    domain: "Healthcare",
    url: "https://github.com/Dhruv883/idea-hub",
    techStack: ["Next.js", "PostgreSQL", "TailwindCSS", "Prisma"],
    tags: ["Desktop", "Developer Tools"],
    guidelines:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas temporaLorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas temporaLorem ipsum dolor sit amet consectetur adipisicing elit Veritatis facere",
  },
  {
    id: 2,
    name: "Sample Name",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit Veritatis facere",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas temporaLorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas tempora",
    domain: "Healthcare",
    url: "https://github.com/Dhruv883/idea-hub",
    techStack: ["Next.js", "PostgreSQL", "TailwindCSS", "Prisma"],
    tags: ["Desktop", "Developer Tools"],
    guidelines:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas temporaLorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas temporaLorem ipsum dolor sit amet consectetur adipisicing elit Veritatis facere",
  },
  {
    id: 3,
    name: "Sample Name",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit Veritatis facere",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas temporaLorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas tempora",
    domain: "Healthcare",
    url: "https://github.com/Dhruv883/idea-hub",
    techStack: ["Next.js", "PostgreSQL", "TailwindCSS", "Prisma"],
    tags: ["Desktop", "Developer Tools"],
    guidelines:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas temporaLorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas temporaLorem ipsum dolor sit amet consectetur adipisicing elit Veritatis facere",
  },
  {
    id: 4,
    name: "Sample Name",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit Veritatis facere",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas temporaLorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas tempora",
    domain: "Healthcare",
    url: "https://github.com/Dhruv883/idea-hub",
    techStack: ["Next.js", "PostgreSQL", "TailwindCSS", "Prisma"],
    tags: ["Desktop", "Developer Tools"],
    guidelines:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas temporaLorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas temporaLorem ipsum dolor sit amet consectetur adipisicing elit Veritatis facere",
  },
];

const tagOptions = [
  "Web",
  "Mobile",
  "Desktop",
  "CLI",
  "AI",
  "Data Science",
  "DevOps",
  "Security",
  "Blockchain",
  "Social",
];

export default function Home() {
  const [projects, setProjects] = useState(mockProjects);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const filterIdeas = () => {
    return mockIdeas.filter((idea) => {
      const matchesType = !selectedType || idea.projectType === selectedType;
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => idea.tags.includes(tag));

      return matchesType && matchesTags;
    });
  };

  const applyFilters = () => {
    setIdeas(filterIdeas());
    setIsFilterOpen(false);
  };
  return (
    <div className={`flex flex-col min-h-screen text-black relative`}>
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="mx-auto p-4 sm:p-6 lg:p-8 ">
          <h1 className="text-4xl mb-4 font-bold text-center text-gray-800 dark:text-gray-100">
            Explore Open Source Projects
          </h1>

          <div className="flex justify-end mb-4">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2" size={20} />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Ideas</SheetTitle>
                  <SheetDescription>
                    Apply filters to narrow down project ideas
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-200px)] mt-6 pr-4">
                  <div className="space-y-6">
                    {/* <div>
                      <Label
                        htmlFor="projectType"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Project Type
                      </Label>
                      <Select onValueChange={(value) => setSelectedType(value)}>
                        <SelectTrigger id="projectType" className="mt-1">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div> */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tags
                      </Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tagOptions.map((tag) => (
                          <Badge
                            key={tag}
                            variant={
                              selectedTags.includes(tag) ? "default" : "outline"
                            }
                            className="cursor-pointer transition-all duration-200 ease-in-out hover:scale-105"
                            onClick={() => {
                              setSelectedTags((prev) =>
                                prev.includes(tag)
                                  ? prev.filter((t) => t !== tag)
                                  : [...prev, tag]
                              );
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <div className="mt-6">
                  <Button onClick={applyFilters} className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </main>
    </div>
  );
}
