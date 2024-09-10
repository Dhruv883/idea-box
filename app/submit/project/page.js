"use client";

import { useState } from "react";
import { X, Github } from "lucide-react";
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
import Navbar from "@/components/Navbar";

export default function Home() {
  const [techStack, setTechStack] = useState([]);
  const [tags, setTags] = useState([]);

  const suggestedTechStack = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "Go",
    "Rust",
    "C++",
    "React",
    "Vue.js",
    "Angular",
    "Node.js",
    "Django",
    "Flask",
    "Spring",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Kubernetes",
    "TensorFlow",
  ];
  const preExistingTags = [
    "Web",
    "Mobile",
    "Desktop",
    "CLI",
    "AI",
    "Data Science",
    "DevOps",
    "Security",
  ];

  const addTechStack = (tech) => {
    if (!techStack.includes(tech)) {
      setTechStack([...techStack, tech]);
    }
  };

  const removeTechStack = (tech) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
      title: event.target.title.value,
      domain: event.target.domain.value,
      description: event.target.description.value,
      guidelines: event.target.guidelines.value,
      url: event.target.url.value,
      techStack,
      tags,
    };
    console.log("Form submitted:", formData);
  };
  return (
    <div className={`flex flex-col min-h-screen bg-white text-black relative`}>
      <Navbar />
      <main className="flex-1">
        <section className="min-h-screen w-full flex justify-center pt-24">
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-2/3 lg:w-1/2 mx-auto p-6 space-y-8"
          >
            <h1 className="text-3xl font-bold mb-6 text-center">
              Submit Your Open Source Project
            </h1>

            <div className="space-y-4">
              <Label htmlFor="name">Project Name</Label>
              <input
                type="text"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="name"
                placeholder="Enter your project name"
                required
                maxLength={25}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <input
                type="text"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="title"
                placeholder="One-line title of your project"
                minLength={15}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="domain">Project Domain</Label>
              <input
                type="text"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="domain"
                placeholder="Domain of your project"
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="description">Project Description</Label>
              <textarea
                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="description"
                placeholder="Describe your open source project"
                rows={4}
                minLength={25}
                required
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="url">Repository URL</Label>
              <div className="flex items-center space-x-2">
                <Github className="h-5 w-5" />
                <input
                  type="url"
                  id="url"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="https://github.com/username/project"
                  pattern="https://github.com.*"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tech Stack</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechStack(tech)}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Select onValueChange={addTechStack}>
                <SelectTrigger>
                  <SelectValue placeholder="Select or add tech" />
                </SelectTrigger>
                <SelectContent>
                  {suggestedTechStack.map((tech) => (
                    <SelectItem key={tech} value={tech}>
                      {tech}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Add custom tech...</SelectItem>
                </SelectContent>
              </Select>
              {techStack.includes("custom") && (
                <input
                  type="text"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter custom tech"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const customTech = e.currentTarget.value;
                      if (customTech && !techStack.includes(customTech)) {
                        setTechStack([
                          ...techStack.filter((t) => t !== "custom"),
                          customTech,
                        ]);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Select onValueChange={addTag}>
                <SelectTrigger>
                  <SelectValue placeholder="Select or add a tag" />
                </SelectTrigger>
                <SelectContent>
                  {preExistingTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Add custom tag...</SelectItem>
                </SelectContent>
              </Select>
              {tags.includes("custom") && (
                <input
                  type="text"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter custom tag"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const customTag = e.currentTarget.value;
                      if (customTag && !tags.includes(customTag)) {
                        setTags([
                          ...tags.filter((t) => t !== "custom"),
                          customTag,
                        ]);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
              )}
            </div>

            <div className="space-y-4">
              <Label htmlFor="guidelines">Contribution Guidelines</Label>
              <textarea
                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="guidelines"
                placeholder="Describe how others can contribute to your project"
                rows={4}
                minLength={25}
              />
            </div>

            <Button type="submit" className="w-full py-6 text-lg">
              Submit Open Source Project
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}