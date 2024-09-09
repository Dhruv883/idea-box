"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocFile, setNewDocFile] = useState(null);

  const preExistingTags = [
    "AI",
    "Full Stack",
    "Mobile",
    "Web",
    "IoT",
    "Blockchain",
  ];

  const addFeature = () => {
    if (newFeature) {
      setFeatures([...features, newFeature]);
      setNewFeature("");
    }
  };

  const addDocument = () => {
    if (newDocTitle && newDocFile) {
      setDocuments([...documents, { title: newDocTitle, file: newDocFile }]);
      setNewDocTitle("");
      setNewDocFile(null);
    }
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
    console.log("Form submitted");
  };

  return (
    <div className={`flex flex-col min-h-screen bg-white text-black relative`}>
      <Navbar />
      <main className="flex-1">
        <section className="min-h-screen w-full flex justify-center pt-24">
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-6 space-y-8"
          >
            <h1 className="text-3xl font-bold mb-6">
              Submit Your Project Idea
            </h1>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Input
                id="description"
                placeholder="One-line title of your project"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Textarea
                id="audience"
                placeholder="Describe your target audience"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Features</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {features.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                    <button
                      type="button"
                      onClick={() =>
                        setFeatures(features.filter((_, i) => i !== index))
                      }
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Feature
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a New Feature</DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Enter a feature"
                    />
                    <Button onClick={addFeature}>Add</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              <Label>Supporting Documents</Label>
              <div className="space-y-2 mb-2">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-secondary p-2 rounded"
                  >
                    <span>{doc.title}</span>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setDocuments(documents.filter((_, i) => i !== index))
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Document
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a Supporting Document</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Document title"
                      value={newDocTitle}
                      onChange={(e) => setNewDocTitle(e.target.value)}
                    />
                    <Input
                      type="file"
                      onChange={(e) =>
                        e.target.files && setNewDocFile(e.target.files[0])
                      }
                    />
                    <Button onClick={addDocument}>Add Document</Button>
                  </div>
                </DialogContent>
              </Dialog>
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
                <Input
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

            <Button type="submit" className="w-full">
              Submit Project Idea
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}
