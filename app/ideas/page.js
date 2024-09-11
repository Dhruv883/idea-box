"use client";

import { useState } from "react";
import { Filter, ThumbsUp, ChevronUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import IdeaCard from "@/components/IdeaCard";

const mockIdeas = [
  {
    id: 1,
    title: "Open Source Code Editor",
    description: "A lightweight, extensible code editor for web development",
    projectType: "Application",
    tags: ["Desktop", "Developer Tools"],
    likes: 156,
    comments: 23,
  },
  {
    id: 2,
    title: "AI-powered Task Manager",
    description:
      "Task management app that uses AI to prioritize and schedule tasks",
    projectType: "Application",
    tags: ["AI", "Mobile", "Productivity"],
    likes: 89,
    comments: 12,
  },
  {
    id: 3,
    title: "Decentralized Social Media Platform",
    description: "A blockchain-based social media platform focused on privacy",
    projectType: "Application",
    tags: ["Web", "Blockchain", "Social"],
    likes: 201,
    comments: 34,
  },
  {
    id: 4,
    title:
      "Open Source Code Editor Open Source Code Editor Open Source Code Editor",
    description: "A lightweight, extensible code editor for web development",
    projectType: "Application",
    tags: ["Desktop", "Developer Tools"],
    likes: 156,
    comments: 23,
  },
  // Add more mock ideas here...
];

const projectTypes = [
  "Library",
  "Framework",
  "Application",
  "Tool",
  "Plugin",
  "Other",
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
  const [ideas, setIdeas] = useState(mockIdeas);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const handleLike = (id) => {
    setIdeas(
      ideas.map((idea) =>
        idea.id === id ? { ...idea, likes: idea.likes + 1 } : idea
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
          Explore Project Ideas
        </h1>

        <div className="flex justify-end mb-8">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="rounded-full">
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
                  </div>
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

        <div className="flex flex-wrap w-full gap-8">
          {ideas.map((idea, idx) => (
            <IdeaCard idea={idea} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
