"use client";

import { useEffect, useState } from "react";
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
import { PlusCircle, Edit2, ExternalLink } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/components/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import PreLoader from "@/components/PreLoader";

const initialPlatforms = [
  {
    name: "Dev",
    icon: "dev",
    pattern: `^https:\/\/dev\.to\/[a-zA-Z0-9_-]+$`,
    placeholder: "https://dev.to/username",
  },
  {
    name: "Medium",
    icon: "medium",
    pattern: `^https:\/\/medium\.com\/@[a-zA-Z0-9_-]+$`,
    placeholder: "https://medium.com/@username",
  },
  {
    name: "Hashnode",
    icon: "hashnode",
    pattern: `^https:\/\/[a-zA-Z0-9_-]+\.hashnode\.dev$`,
    placeholder: "https://username.hashnode.dev",
  },
  {
    name: "StackOverflow",
    icon: "stack-overflow",
    pattern: `^https:\/\/stackoverflow\.com\/users\/\d+\/[a-zA-Z0-9_-]+$`,
    placeholder: "https://stackoverflow.com/users/1234567/username",
  },
  {
    name: "GitHub",
    icon: "github",
    pattern: `^https:\/\/github\.com\/[a-zA-Z0-9_-]+$`,
    placeholder: "https://github.com/username",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    pattern: `^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$`,
    placeholder: "https://www.linkedin.com/in/username",
  },
  {
    name: "Portfolio",
    icon: "portfolio",
    pattern: `^https?:\/\/(?:www\.)?[a-zA-Z0-9_-]+\.[a-zA-Z]{2,}(?:\/[a-zA-Z0-9_-]*)*\/?$`,
    placeholder: "https://portfolio-website.com",
  },
  {
    name: "Twitter",
    icon: "twitter",
    pattern: `^https:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[a-zA-Z0-9_]+$`,
    placeholder: "https://x.com/username",
  },
];

export default function UserProfile() {
  const { toast } = useToast();

  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [editingPlatform, setEditingPlatform] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [isBioDialogOpen, setIsBioDialogOpen] = useState(false);
  const [isUsernameDialogOpen, setIsUsernameDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("liked");
  const [upvotedIdeas, setUpvotedIdeas] = useState();
  const [upvotedProjects, setUpvotedProjects] = useState();
  const [interestedIdeas, setInterestedIdeas] = useState();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
      updatePlatformsFromProfile(session.user.profiles || []);
      setUpvotedIdeas(session.user.upvotedIdeas);
      setUpvotedProjects(session.user.upvotedProjects);
      setInterestedIdeas(session.user.interestedIdeas);
    }
  }, [session]);

  const updatePlatformsFromProfile = (profiles) => {
    const updatedPlatforms = initialPlatforms.map((platform) => {
      const userProfile = profiles.find((p) => p.type === platform.name);
      return {
        ...platform,
        connected: !!userProfile,
        url: userProfile?.profileUrl || "",
      };
    });
    setPlatforms(updatedPlatforms);
  };

  const handleConnect = (platform) => {
    setEditingPlatform(platform);
    setIsConnectDialogOpen(true);
  };

  const handleEdit = (platform) => {
    setEditingPlatform(platform);
    setIsEditDialogOpen(true);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!editingPlatform) return;

    const url = event.target.url.value;

    const pattern = new RegExp(editingPlatform.pattern);
    if (!pattern.test(url)) {
      toast({
        title: "Error",
        description: `Invalid URL format for ${editingPlatform.name}. Please use the format: ${editingPlatform.placeholder}`,
        variant: "destructive",
      });

      return;
    }

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.post(
        `${BACKEND_URL}/user/platform`,
        { type: editingPlatform.name, profileUrl: url },
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );

      const updatedProfile = response.data.profile;
      const updatedPlatforms = platforms.map((p) =>
        p.name === editingPlatform.name ? { ...p, url, connected: true } : p
      );

      setPlatforms(updatedPlatforms);
      setIsEditDialogOpen(false);
      setIsConnectDialogOpen(false);
      setEditingPlatform(null);

      if (session && session.user) {
        const updatedProfiles = session.user.profiles.filter(
          (p) => p.type !== updatedProfile.type
        );
        updatedProfiles.push(updatedProfile);
        session.user.profiles = updatedProfiles;
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleBioSave = async (event) => {
    event.preventDefault();
    const newBio = event.target.bio.value;

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.post(
        `${BACKEND_URL}/user/bio`,
        { bio: newBio },
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );

      setUser({ ...user, bio: response.data.bio });
      setIsBioDialogOpen(false);

      // Update the session data
      if (session && session.user) {
        session.user.bio = response.data.bio;
      }
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  const handleUsernameSave = async (event) => {
    event.preventDefault();
    const prevUsername = user.username;
    const newUsername = event.target.username.value;

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.post(
        `${BACKEND_URL}/user/username`,
        { username: newUsername },
        { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      );

      setUser({ ...user, username: response.data.username });
      setIsUsernameDialogOpen(false);

      if (session && session.user) {
        session.user.username = response.data.username;
      }

      toast({
        title: "Success",
        description: "Username updated successfully",
      });
    } catch (error) {
      console.error("Error updating username:", error);
      setUser({ ...user, username: prevUsername });
      toast({
        title: "Error",
        description: "Username Already Exists.",
        variant: "destructive",
      });
    }
  };

  if (status == "loading") return <PreLoader />;
  if (!user) return <div> User Not Found</div>;

  return (
    <div className={`flex flex-col min-h-screen relative`}>
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* User info section */}
            <div className="flex items-center space-x-4 mb-8">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.name}</AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-sm">@{user.username || "username"}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsUsernameDialogOpen(true)}
                    className="ml-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span className="sr-only">Update username</span>
                  </Button>
                </div>

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

            {/* Connected Platforms section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Connected Platforms
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {platforms.map((platform) => (
                  <Card
                    key={platform.name}
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
                        onClick={() => handleConnect(platform)}
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

            {/* Liked and Interested Ideas */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Ideas</h2>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="liked">Liked Ideas</TabsTrigger>
                  <TabsTrigger value="interested">Interested Ideas</TabsTrigger>
                  <TabsTrigger value="projects">Liked Projects</TabsTrigger>
                </TabsList>
                <TabsContent value="liked">
                  {upvotedIdeas?.map((idea) => (
                    <Card key={idea.id} className="mb-4 p-4">
                      <h3 className="font-semibold ">{idea.title}</h3>

                      <p className="text-sm text-muted-foreground">
                        by @
                        <Link href="/u/" className="hover:underline">
                          {idea.user.name}
                        </Link>
                      </p>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="interested">
                  {interestedIdeas?.map((idea) => (
                    <Card key={idea.id} className="mb-4 p-4">
                      <h3 className="font-semibold">{idea.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        by @
                        <Link href="/u/" className="hover:underline">
                          {idea.user.name}
                        </Link>
                      </p>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="projects">
                  {upvotedProjects?.map((project) => (
                    <Card key={project.id} className="mb-4 p-4">
                      <h3 className="font-semibold">
                        {project.name} - {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        by @
                        <Link href="/u/" className="hover:underline">
                          {project.user.name}
                        </Link>
                      </p>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Edit Platform URL */}
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
                      placeholder={`https://${editingPlatform?.name.toLowerCase()}.com/${
                        user?.username
                      }`}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Connect Platform URL */}
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
                    <Label htmlFor="url">URL</Label>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      placeholder={editingPlatform?.placeholder}
                      pattern={editingPlatform?.pattern}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Connect</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Edit Bio */}
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
                  <DialogFooter>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Edit Username */}
            <Dialog
              open={isUsernameDialogOpen}
              onOpenChange={setIsUsernameDialogOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Username</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUsernameSave} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      defaultValue={user.username}
                      placeholder="Enter your username"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
    </div>
  );
}
