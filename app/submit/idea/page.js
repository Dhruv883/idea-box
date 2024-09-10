"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { X, Edit } from "lucide-react";
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

export default function Home() {
  const [features, setFeatures] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [tags, setTags] = useState([]);
  const [newFeature, setNewFeature] = useState("");

  const [editingFeatureIndex, setEditingFeatureIndex] = useState(null);
  const preExistingTags = [
    "AI",
    "Full Stack",
    "Mobile",
    "Web",
    "IoT",
    "Blockchain",
  ];

  const addFeature = (event) => {
    event.preventDefault();
    if (newFeature) {
      if (editingFeatureIndex !== null) {
        const updatedFeatures = [...features];
        updatedFeatures[editingFeatureIndex] = newFeature;
        setFeatures(updatedFeatures);
        setEditingFeatureIndex(null);
      } else {
        setFeatures([...features, newFeature]);
      }
      setNewFeature("");
    }
  };

  const editFeature = (index) => {
    setNewFeature(features[index]);
    setEditingFeatureIndex(index);
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
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
      title: event.target.title.value,
      domain: event.target.domain.value,
      description: event.target.description.value,
      audience: event.target.audience.value,
      features,
      documents,
      tags,
    };
    console.log("Form submitted:", formData);
  };

  return (
    <div className={`flex flex-col min-h-screen bg-white text-black relative`}>
      <Navbar />
      <main className="flex-1">
        <section className="border border-black min-h-screen w-full flex justify-center pt-24">
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-2/3 lg:w-1/2 mx-auto p-6 space-y-8"
          >
            <h1 className="text-3xl font-bold mb-6 text-center">
              Submit Your Project Idea
            </h1>

            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <input
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
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="domain"
                placeholder="Domain of your project"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>

              <textarea
                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="description"
                placeholder="Brief Description of your project"
                required
                minLength={25}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="audience"
                placeholder="Describe your target audience"
              />
            </div>

            <div className="space-y-2">
              <div className="space-y-4">
                <Label>Features</Label>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-secondary p-2 rounded"
                    >
                      <span>{feature}</span>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editFeature(index)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeature(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center space-x-2">
                  <input
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Enter a feature"
                  />
                  <Button onClick={addFeature}>
                    {editingFeatureIndex !== null ? "Update" : "Add"}
                  </Button>
                </div>
              </div>
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

            <Button type="submit" className="w-full py-6 text-lg">
              Submit Project Idea
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}
