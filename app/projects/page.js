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
import ProjectCard from "@/components/ProjectCard";

const mockProjects = [
  {
    id: 1,
    name: "E-Learning Platform",
    title: "Interactive course creation platform",
    description:
      "Platform to create and share online courses with quizzes and video support.",
    domain: "Education",
    repoUrl: "https://github.com/example/ELearningPlatform",
    techStack: ["Django", "React.js", "PostgreSQL", "Redis"],
    tags: ["Education", "E-Learning", "Web"],
    contributorGuidelines:
      "Contributions should follow the existing coding style and include documentation for new features.",
    submittedBy: "Emily Clark",
    upvotes: 305,
  },
  {
    id: 2,
    name: "CollabMind",
    title: "Real-time collaboration platform",
    description:
      "Tool for teams to collaborate on documents, projects, and presentations with version control.",
    domain: "Web",
    repoUrl: "https://github.com/example/CollabMind",
    techStack: ["React.js", "Node.js", "WebSocket", "PostgreSQL"],
    tags: ["Collaboration", "Productivity", "Web"],
    contributorGuidelines:
      "Fork the repository, make changes in your local branch, and submit a PR. Include tests for new features.",
    submittedBy: "John Doe",
    upvotes: 215,
  },
  {
    id: 3,
    name: "DevOps Automation Tool",
    title: "Infrastructure automation tool",
    description:
      "Automates infrastructure deployment, monitoring, and scaling using a single configuration file.",
    domain: "Infrastructure",
    repoUrl: "https://github.com/example/DevOpsTool",
    techStack: ["Terraform", "Docker", "AWS", "Kubernetes"],
    tags: ["Automation", "DevOps", "Infrastructure"],
    contributorGuidelines:
      "Follow the contribution guidelines and ensure changes pass all CI/CD checks before submitting a PR.",
    submittedBy: "Jane Smith",
    upvotes: 320,
  },
  {
    id: 4,
    name: "AI-Powered Chatbot",
    title: "NLP-based intelligent chatbot",
    description:
      "Open-source chatbot using natural language processing to provide intelligent responses.",
    domain: "AI",
    repoUrl: "https://github.com/example/AIPoweredChatbot",
    techStack: ["Python", "TensorFlow", "NLTK", "Flask"],
    tags: ["AI", "Chatbot", "Natural Language Processing"],
    contributorGuidelines:
      "Contributions are welcome! Ensure code adheres to PEP8 standards and include test cases for new features.",
    submittedBy: "Samuel Lee",
    upvotes: 178,
  },
  {
    id: 5,
    name: "Crypto Wallet",
    title: "Secure multi-asset cryptocurrency wallet",
    description:
      "Open-source wallet supporting multiple digital assets with enhanced security.",
    domain: "Blockchain",
    repoUrl: "https://github.com/example/CryptoWallet",
    techStack: ["React Native", "Solidity", "Ethereum", "Web3.js"],
    tags: ["Blockchain", "Cryptocurrency", "Mobile"],
    contributorGuidelines:
      "Submit PRs for security patches or feature enhancements. Ensure the wallet code complies with the latest security standards.",
    submittedBy: "Lucy Adams",
    upvotes: 145,
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-16 items-center justify-items-center">
            {projects.map((project, idx) => (
              <ProjectCard project={project} key={idx} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
