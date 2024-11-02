"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/hooks/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import IdeaCard from "@/components/IdeaCard";
import ProjectCard from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import PreLoader from "@/components/PreLoader";

const platformIcons = {
  Dev: "dev",
  Medium: "medium",
  Hashnode: "hashnode",
  StackOverflow: "stack-overflow",
  GitHub: "github",
  LinkedIn: "linkedin",
  Portfolio: "portfolio",
  Twitter: "twitter",
};

export default function RefinedUserProfilePage({ params }) {
  const { data: session, status } = useSession();
  const userId = params.username;
  const [user, setUser] = useState();
  const [connectedPlatforms, setConnectedPlatforms] = useState();
  const [userIdeas, setUserIdeas] = useState();
  const [userProjects, setUserProjects] = useState();
  const { toast } = useToast();

  const fetchUser = async () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
      const response = await axios.get(`${BACKEND_URL}/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      setUser(response.data.user);
      setConnectedPlatforms(response.data.user.profiles);
      setUserIdeas(response.data.user.ideas);
      setUserProjects(response.data.user.projects);
    } catch (error) {
      toast({
        title: "Failed to fetch Profile",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (status == "loading" || !user) return <PreLoader />;

  return (
    <div className={`flex flex-col min-h-screen relative`}>
      <Navbar />
      <main className="flex-1 pt-16">
        {" "}
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={user?.image} alt={user?.name} />
                  <AvatarFallback>{user?.name}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold">{user?.name}</h1>
                  <p className="text-xl text-muted-foreground">
                    @{user?.username}
                  </p>
                  <p className="mt-2">{user?.bio}</p>
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                    {connectedPlatforms?.length == 0 ? (
                      <div className="italic font-semibold text-2xl">
                        No Platforms Connected
                      </div>
                    ) : null}
                    {connectedPlatforms?.map((platform) => {
                      return (
                        <Button
                          key={platform?.type}
                          variant="outline"
                          className="border-2 px-4 py-5 flex items-center justify-center"
                          asChild
                        >
                          <a
                            href={platform?.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            {/* <Icon className="h-4 w-4" /> */}
                            <Image
                              src={`/icons/${
                                platformIcons[platform?.type]
                              }.svg`}
                              width={25}
                              height={25}
                              alt={platform?.type}
                            />
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="ideas" className="w-full">
            <TabsList>
              <TabsTrigger value="ideas">Ideas</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            <TabsContent value="ideas">
              <div className="grid gap-6 md:grid-cols-3">
                {userIdeas?.map((idea) => (
                  <IdeaCard initialIdea={idea} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="projects">
              <div className="grid gap-6 md:grid-cols-3">
                {userProjects?.map((project) => (
                  <ProjectCard project={project} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
