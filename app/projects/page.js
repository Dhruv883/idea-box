"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
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

import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/ProjectCard";
import { useSession } from "next-auth/react";
import axios from "axios";

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
  const { data, status } = useSession();
  const [projects, setProjects] = useState();
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

  const fetchProjects = async () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
      const response = await axios.get(`${BACKEND_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${data?.accessToken}`,
        },
      });
      
      setProjects(response.data.projects);
    } catch (error) {
      console.log("Error while fetching projects: ", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (status == "loading") return <div>loading</div>;

  return (
    <div className={`flex flex-col min-h-screen  relative`}>
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="mx-auto p-4 sm:p-6 lg:p-8 ">
          <h1 className="text-4xl mb-4 font-bold text-center ">
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-16 items-center justify-items-center">
            {projects?.map((project, idx) => (
              <ProjectCard project={project} key={idx} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
