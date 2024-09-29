"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
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
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

const mockIdeas = [
  {
    id: 1,
    title: "Open Source Code Editor",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas tempora. Dolore neque in incidunt",
    tags: ["Desktop", "Developer Tools"],
    likes: 156,
    comments: 23,
    collaborators: [
      {
        id: 1,
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Lead Developer",
      },
      {
        id: 2,
        name: "Bob Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "UX Designer",
      },
    ],
    suggestions: [
      {
        id: 1,
        user: "Charlie Brown",
        content: "Add support for multiple languages",
        votes: 15,
        timestamp: "2023-06-15T10:30:00Z",
      },
      {
        id: 2,
        user: "Diana Prince",
        content: "Implement a plugin system",
        votes: 12,
        timestamp: "2023-06-16T14:45:00Z",
      },
      {
        id: 3,
        user: "Ethan Hunt",
        content: "Create a dark mode theme",
        votes: 8,
        timestamp: "2023-06-17T09:15:00Z",
      },
      {
        id: 4,
        user: "Charlie Brown",
        content: "Add support for multiple languages",
        votes: 15,
        timestamp: "2023-06-15T10:30:00Z",
      },
      {
        id: 5,
        user: "Diana Prince",
        content: "Implement a plugin system",
        votes: 12,
        timestamp: "2023-06-16T14:45:00Z",
      },
      {
        id: 6,
        user: "Ethan Hunt",
        content: "Create a dark mode theme",
        votes: 8,
        timestamp: "2023-06-17T09:15:00Z",
      },
    ],
  },
  {
    id: 2,
    title: "AI-powered Task Manager",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas tempora. Dolore neque in inciduntLorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas tempora. Dolore neque in incidunt",
    tags: ["AI", "Mobile", "Productivity"],
    likes: 89,
    comments: 12,
    collaborators: [
      {
        id: 3,
        name: "Eve Williams",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "AI Specialist",
      },
    ],
    suggestions: [
      {
        id: 4,
        user: "Frank Castle",
        content: "Integrate with popular calendar apps",
        votes: 8,
        timestamp: "2023-06-18T11:20:00Z",
      },
      {
        id: 5,
        user: "Grace Hopper",
        content: "Add voice command feature",
        votes: 6,
        timestamp: "2023-06-19T16:30:00Z",
      },
    ],
  },
  {
    id: 3,
    title: "Decentralized Social Media Platform",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas tempora. Dolore neque in inciduntLorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas tempora. Dolore neque in inciduntLorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas tempora. Dolore neque in incidunt",
    tags: ["Web", "Blockchain", "Social"],
    likes: 201,
    comments: 34,
    collaborators: [
      {
        id: 4,
        name: "Grace Lee",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Blockchain Developer",
      },
      {
        id: 5,
        name: "Henry Ford",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Security Expert",
      },
    ],
    suggestions: [
      {
        id: 6,
        user: "Iris West",
        content: "Implement end-to-end encryption for messages",
        votes: 25,
        timestamp: "2023-06-20T13:10:00Z",
      },
      {
        id: 7,
        user: "Jack Sparrow",
        content: "Add a decentralized file sharing feature",
        votes: 18,
        timestamp: "2023-06-21T10:05:00Z",
      },
      {
        id: 8,
        user: "Kate Bishop",
        content: "Create a user-friendly wallet system",
        votes: 14,
        timestamp: "2023-06-22T15:40:00Z",
      },
    ],
  },
  {
    id: 4,
    title:
      "Open Source Code Editor Open Source Code Editor Open Source Code Editor",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas tempora. Dolore neque in incidunt Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas tempora. Dolore neque in incidunt Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, facere. Debitis hic aspernatur mollitia laboriosam optio qui quam voluptates quas tempora. Dolore neque in incidunt",
    tags: ["Desktop", "Developer Tools"],
    likes: 156,
    comments: 23,
    collaborators: [
      {
        id: 1,
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Lead Developer",
      },
      {
        id: 2,
        name: "Bob Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "UX Designer",
      },
    ],
    suggestions: [
      {
        id: 1,
        user: "Charlie Brown",
        content: "Add support for multiple languages",
        votes: 15,
        timestamp: "2023-06-15T10:30:00Z",
      },
      {
        id: 2,
        user: "Diana Prince",
        content: "Implement a plugin system",
        votes: 12,
        timestamp: "2023-06-16T14:45:00Z",
      },
      {
        id: 3,
        user: "Ethan Hunt",
        content: "Create a dark mode theme",
        votes: 8,
        timestamp: "2023-06-17T09:15:00Z",
      },
    ],
  },
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
  const { data, status } = useSession();
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

  if (status == "loading") return <div>loading</div>;

  return (
    <div className={`flex flex-col min-h-screen text-black relative`}>
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="mx-auto p-4 sm:p-6 lg:p-8 ">
          <h1 className="text-4xl mb-4 font-bold text-center text-gray-800 dark:text-gray-100">
            Explore Project Ideas
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-16 items-center justify-items-center">
            {ideas.map((idea, idx) => (
              <IdeaCard idea={idea} key={idx} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
