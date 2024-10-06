"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Edit2, ExternalLink } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const initialUser = {
  name: "Jane Doe",
  username: "janedoe",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: null,
};

const initialPlatforms = [
  {
    id: "dev",
    name: "DEV",
    icon: "dev",
    connected: true,
    url: "https://dev.to/janedoe",
  },
  {
    id: "medium",
    name: "Medium",
    icon: "medium",
    connected: true,
    url: "https://medium.com/@janedoe",
  },
  {
    id: "hashnode",
    name: "Hashnode",
    icon: "hashnode",
    connected: false,
    url: "",
  },
  {
    id: "stackoverflow",
    name: "Stack Overflow",
    icon: "stack-overflow",
    connected: true,
    url: "https://stackoverflow.com/users/123456/jane-doe",
  },
  {
    id: "github",
    name: "GitHub",
    icon: "github",
    connected: true,
    url: "https://github.com/janedoe",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "linkedin",
    connected: true,
    url: "https://www.linkedin.com/in/janedoe",
  },
  {
    id: "portfolio",
    name: "Portfolio Website",
    icon: "placeholder",
    connected: true,
    url: "https://janedoe.com",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "twitter",
    connected: false,
    url: "",
  },
];

const likedIdeas = [
  { id: 3, title: "Blockchain-based voting system", author: "johndoe" },
  { id: 4, title: "AR-assisted programming", author: "alicesmith" },
];

const interestedIdeas = [
  { id: 5, title: "ML-powered code completion", author: "bobmartin" },
  { id: 6, title: "Collaborative IDE", author: "evagreen" },
];

export default function UserProfile() {
  const [user, setUser] = useState(initialUser);
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [editingPlatform, setEditingPlatform] = useState(platforms[0] || null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("liked");
  const [isBioDialogOpen, setIsBioDialogOpen] = useState(false);

  const handleConnect = (platformId) => {
    setEditingPlatform(platforms.find((p) => p.id === platformId) || null);
    setIsConnectDialogOpen(true);
  };

  const handleEdit = (platform) => {
    setEditingPlatform(platform);
    setIsEditDialogOpen(true);
  };

  const handleBioSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newBio = formData.get("bio");
    setUser({ ...user, bio: newBio });
    setIsBioDialogOpen(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!editingPlatform) return;

    const formData = new FormData(event.currentTarget);
    const url = formData.get("url");

    setPlatforms(
      platforms.map((p) =>
        p.id === editingPlatform.id ? { ...p, url, connected: true } : p
      )
    );
    setIsEditDialogOpen(false);
    setIsConnectDialogOpen(false);
    setEditingPlatform(null);
  };

  return (
    <div className={`flex flex-col min-h-screen relative`}>
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                {user.bio ? (
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm">{user.bio}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsBioDialogOpen(true)}
                      className="ml-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Update bio</span>
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsBioDialogOpen(true)}
                    className="mt-2"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add bio
                  </Button>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Connected Platforms
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {platforms.map((platform) => (
                  <Card
                    key={platform.id}
                    className="flex items-center justify-between p-4 h-16"
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src={`/icons/${platform.icon}.svg`}
                        width={25}
                        height={25}
                        alt={platform.name}
                      />
                      <span className="font-medium text-sm">
                        {platform.name}
                      </span>
                    </div>
                    {platform.connected ? (
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="p-0 h-8 w-8"
                        >
                          <a
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">
                              Visit {platform.name}
                            </span>
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(platform)}
                          className="p-0 h-8 w-8"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit {platform.name}</span>
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleConnect(platform.id)}
                        className="p-0 h-8 w-8"
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span className="sr-only">Connect {platform.name}</span>
                      </Button>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Ideas</h2>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="liked">Liked Ideas</TabsTrigger>
                  <TabsTrigger value="interested">Interested Ideas</TabsTrigger>
                </TabsList>
                <TabsContent value="liked">
                  {likedIdeas.map((idea) => (
                    <Card key={idea.id} className="mb-4 p-4">
                      <h3 className="font-semibold">{idea.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        by @{idea.author}
                      </p>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="interested">
                  {interestedIdeas.map((idea) => (
                    <Card key={idea.id} className="mb-4 p-4">
                      <h3 className="font-semibold">{idea.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        by @{idea.author}
                      </p>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit {editingPlatform?.name} Link</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-url">URL</Label>
                    <Input
                      id="edit-url"
                      name="url"
                      defaultValue={editingPlatform?.url}
                      placeholder={`https://${editingPlatform?.id}.com/${user.username}`}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isConnectDialogOpen}
              onOpenChange={setIsConnectDialogOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Connect {editingPlatform?.name}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="connect-url">URL</Label>
                    <Input
                      id="connect-url"
                      name="url"
                      defaultValue={editingPlatform?.url}
                      placeholder={`https://${editingPlatform?.id}.com/${user.username}`}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Connect</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isBioDialogOpen} onOpenChange={setIsBioDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{user.bio ? "Update" : "Add"} Bio</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleBioSave} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      defaultValue={user.bio}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit">Save</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
    </div>
  );
}
