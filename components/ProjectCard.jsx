"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowBigUp, Github } from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ProjectCard = ({ project }) => {
  const { data, status } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [userProjects, setUserProjects] = useState({
    upvoted: [],
  });
  const [projectState, setProjectState] = useState({
    upvoteCount: project.upvotes,
    isUpvoted: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const toggleUpvoteProject = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const currentlyUpvoted = projectState.isUpvoted;
    const currentCount = projectState.upvoteCount;

    const newUpvoteCount = currentlyUpvoted
      ? currentCount - 1
      : currentCount + 1;

    setProjectState((prev) => ({
      ...prev,
      isUpvoted: !currentlyUpvoted,
      upvoteCount: newUpvoteCount,
    }));

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const endpoint = currentlyUpvoted ? "removeUpvote" : "upvote";
    try {
      const response = await axios.post(
        `${BACKEND_URL}/projects/${endpoint}`,
        { projectId: project.id },
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      );

      const updatedProject = response.data;
      setProjectState((prev) => ({
        ...prev,
        upvoteCount: updatedProject.upvotes,
      }));
    } catch (error) {
      console.error("Error updating upvote:", error);
      setProjectState((prev) => ({
        ...prev,
        isUpvoted: currentlyUpvoted,
        upvoteCount: currentCount,
      }));
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (data && data.user) {
      setUserProjects({
        upvoted: data.user.upvotedProjects?.map((project) => project.id) || [],
      });
    }
  }, [data, status]);

  useEffect(() => {
    setProjectState((prev) => ({
      ...prev,
      isUpvoted: userProjects?.upvoted.includes(project.id),
    }));
  }, [userProjects, project.id]);

  return (
    <>
      <Card className="w-72 border-none mobile2:w-96 h-full px-6 py-4 flex flex-col justify-between gap-6 cursor-default group dark:bg-bgGray border-[#242424] bg-[#FBFBFB] shadow-md">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold max-h-16 text-ellipsis overflow-hidden">
            {project.name}
          </h3>
          <p className="max-h-12 text-ellipsis overflow-hidden text-textGray">
            {project.title}{" "}
          </p>
        </div>
        <div className="space-y-3">
          <div>
            Submitted by -{" "}
            <Link
              href={`/u/${project.user.username}`}
              className="hover:underline"
            >
              {project.user.username}
            </Link>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div className="flex flex-wrap gap-2 h-6 overflow-hidden w-full">
              {project.tags.slice(0, 1).map((obj, index) => (
                <Badge key={obj.id} className="text-nowrap" variant="secondary">
                  {obj.tag}
                </Badge>
              ))}
              {project.tags.length > 1 && (
                <Badge className="text-nowrap" variant="secondary">
                  +{project.tags.length - 1}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 ">
              <motion.div
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="secondary"
                  className="text-xs sm:text-sm flex items-center gap-1 px-2 py-1"
                  onClick={toggleUpvoteProject}
                  disabled={isLoading}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={projectState.isUpvoted ? "upvoted" : "not-upvoted"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowBigUp
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${
                          projectState.isUpvoted ? "fill-current" : ""
                        }`}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={projectState.upvoteCount}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {projectState.upvoteCount}
                    </motion.span>
                  </AnimatePresence>
                </Button>
              </motion.div>
              <Button size="sm" onClick={() => setIsDialogOpen(true)}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full sm:w-11/12 md:w-4/5 max-w-none h-[90vh] sm:h-[95vh] md:h-[90vh] border-none  overflow-y-auto dark:bg-bgGray">
          <DialogHeader className="space-y-4 pt-8 text-center">
            <DialogTitle className="space-y-2 text-3xl font-bold sm:text-4xl md:text-5xl flex flex-col items-center">
              <span className="">{project.name}</span>
              <span className="block text-xl font-medium text-muted-foreground sm:text-2xl">
                {project.title}
              </span>
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base md:text-lg text-textGray">
              {project.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Contributor Guidelines:
              </h3>
              <p className="text-textGray">{project.guidelines}</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-medium text-sm sm:text-base">
                  Tech Stack:{" "}
                </span>
                {project.technologies.map((obj) => (
                  <Badge
                    key={obj.id}
                    variant="secondary"
                    className="py-1 px-2 text-xs sm:text-sm"
                  >
                    {obj.technology}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-medium text-sm sm:text-base">Tags: </span>
                {project.tags.map((obj) => (
                  <Badge
                    key={obj.id}
                    variant="secondary"
                    className="py-1 px-2 text-xs sm:text-sm"
                  >
                    {obj.tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-sm sm:text-base">
              Submitted by - {project.user.name}{" "}
              <Link
                href={`/u/${project.user.username}`}
                className="hover:underline"
              >
                (@{project.user.username})
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="text-xs sm:text-sm" asChild>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${project.repositoryURL}`}
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Repository
                </a>
              </Button>

              <motion.div
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  className="text-xs sm:text-sm flex items-center gap-1"
                  onClick={toggleUpvoteProject}
                  disabled={isLoading}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={projectState.isUpvoted ? "upvoted" : "not-upvoted"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowBigUp
                        className={`mr-2 h-4 w-4 sm:h-6 sm:w-6 ${
                          projectState.isUpvoted ? "fill-current" : ""
                        }`}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="w-6 text-center">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={projectState.upvoteCount}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {projectState.upvoteCount}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </Button>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
