"use client";

import { useState } from "react";
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

const ProjectCard = ({ project }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card className="w-72 border-none mobile2:w-96 h-full px-6 py-4 flex flex-col justify-between gap-6 cursor-default group bg-bgGray border-[#242424] text-white">
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
            <Link href={`/u/`} className="hover:underline">
              {project.submittedBy}
            </Link>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div className="flex flex-wrap gap-2 h-6 overflow-hidden w-full">
              {project.tags.slice(0, 3).map((tag, idx) => (
                <Badge
                  key={idx}
                  className="bg-bgGray2 hover:bg-bgGray2 text-textGray"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm w-1/3 justify-center pb-1">
              <Button size="sm" onClick={() => setIsDialogOpen(true)}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full sm:w-11/12 md:w-4/5 max-w-none h-[90vh] sm:h-[95vh] md:h-[90vh] border-none bg-bgGray text-white overflow-y-auto">
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
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                Contributor Guidelines:
              </h3>
              <p className="text-textGray">{project.contributorGuidelines}</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-medium text-white text-sm sm:text-base">
                  Tech Stack:{" "}
                </span>
                {project.techStack.map((technology) => (
                  <Badge
                    key={technology}
                    className="bg-bgGray2 hover:bg-bgGray2 text-textGray py-1 px-2 text-xs sm:text-sm"
                  >
                    {technology}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-medium text-white text-sm sm:text-base">
                  Tags:{" "}
                </span>
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-bgGray2 hover:bg-bgGray2 text-textGray py-1 px-2 text-xs sm:text-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-white text-sm sm:text-base">
              Submitted by -{" "}
              <Link href={`/u/`} className="hover:underline">
                {project.submittedBy}
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                className="bg-bgGray2 text-white border border-bgGray2 text-xs sm:text-sm"
                asChild
              >
                <a target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Repository
                </a>
              </Button>

              <Button
                variant="outline"
                className="bg-bgGray2 text-white border border-bgGray2 text-xs sm:text-sm"
              >
                <ArrowBigUp className="mr-2 h-4 w-4 sm:h-6 sm:w-6" />
                {project.upvotes}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
