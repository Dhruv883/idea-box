import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowBigUp, MessageSquare, Users, ArrowUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

import { useState } from "react";
import Link from "next/link";

const IdeaCard = ({ idea }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(null);
  const [isSuggestionDrawerOpen, setIsSuggestionDrawerOpen] = useState(false);
  const [isViewSuggestionsDrawerOpen, setIsViewSuggestionsDrawerOpen] =
    useState(false);
  const [isViewCollaboratorsDrawerOpen, setIsViewCollaboratorsDrawerOpen] =
    useState(false);
  return (
    <>
      <Card className="dark w-72 border-none mobile2:w-96 h-full px-6 py-4 flex flex-col justify-between gap-6 cursor-default group bg-bgGray border-[#242424] text-white">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold max-h-16 text-ellipsis overflow-hidden">
            {idea.title}
          </h3>
          <p className="max-h-12 text-ellipsis overflow-hidden text-textGray">
            {idea.description}.
          </p>
        </div>
        <div className="space-y-3 ">
          <div className="">
            Submitted by -{" "}
            <Link href="/u/" className="hover:underline">
              John Doe
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2 h-6 overflow-hidden w-full">
              {idea.tags.map((tag, idx) => {
                return (
                  <Badge
                    key={idx}
                    className="bg-bgGray2 hover:bg-bgGray2 text-textGray"
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
            <div className="flex items-center gap-4 text-sm  w-1/3 justify-center pb-1  ">
              <Button size="sm" onClick={() => setIsDialogOpen(true)}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Dialog
        open={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
        className="overflow-auto"
      >
        <DialogContent className="w-4/5 max-w-none max-h-none border-none bg-bgGray text-white">
          <DialogHeader className="h-auto">
            <DialogTitle className="text-center text-xl md:text-4xl mb-4 text-white">
              {idea?.title}
            </DialogTitle>
            <ScrollArea className="max-h-[200px] pr-4">
              <DialogDescription className="text-center text-lg h-auto text-textGray">
                {idea?.description}
              </DialogDescription>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </DialogHeader>
          <ScrollArea className="max-h-56 pr-4">
            <div className="text-white">
              Submitted by -{" "}
              <Link href="/u/" className="hover:underline">
                John Doe
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 items-center">
              <span className="font-medium text-white">Tags: </span>
              {idea?.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-bgGray2 hover:bg-bgGray2 text-textGray py-1 px-2"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setIsSuggestionDrawerOpen(true)}
                className="bg-bgGray2 text-white border border-bgGray2"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Suggest Features
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsViewSuggestionsDrawerOpen(true)}
                className="bg-bgGray2 text-white border border-bgGray2"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                View Suggestions
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsViewCollaboratorsDrawerOpen(true)}
                className="bg-bgGray2 text-white border border-bgGray2"
              >
                <Users className="mr-2 h-4 w-4" />
                View Interested Developers
              </Button>
              {/* INTERESTED IN BUILDING */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-bgGray2 text-white border border-bgGray2"
                  >
                    Interested in Building
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Interested in Building?</DialogTitle>
                    <DialogDescription>
                      By proceeding, your profile will be visible to others,
                      allowing you to connect and collaborate on projects with
                      fellow individuals
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <Button type="submit">I'm Still Interested</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                className="bg-bgGray2 text-white border border-bgGray2"
              >
                <ArrowBigUp className="mr-2 h-6 w-6" />
                {idea?.likes}
              </Button>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/*  SUGGEST FEATURES DRAWER */}
      <Drawer
        open={isSuggestionDrawerOpen}
        onOpenChange={setIsSuggestionDrawerOpen}
      >
        <DrawerContent className="bg-bgGray">
          <DrawerHeader>
            <DrawerTitle className="text-white">Suggest Features</DrawerTitle>
            <DrawerDescription>
              What features would you like to see in this project?
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <Textarea
              placeholder="Type your suggestions / features here..."
              className="min-h-[200px]"
            />
          </div>
          <DrawerFooter className="space-y-2">
            <Button variant="outline">Submit Suggestion</Button>
            <DrawerClose asChild>
              <Button className="border border-textGray">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/*  VIEW SUGGESTIONS DRAWER */}
      <Drawer
        open={isViewSuggestionsDrawerOpen}
        onOpenChange={setIsViewSuggestionsDrawerOpen}
      >
        <DrawerContent className="bg-bgGray">
          <DrawerHeader>
            <DrawerTitle className="text-2xl">View Suggestions</DrawerTitle>
            <DrawerDescription className="text-lg">
              See what others have suggested
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="p-4 h-[400px] whitespace-nowrap">
            {idea?.suggestions.map((suggestion) => (
              <div key={suggestion.id} className="mb-4 border p-4 rounded-lg">
                <h4 className="font-bold">{suggestion.user}</h4>
                <p className="mt-2">{suggestion.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(suggestion.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      {/*  VIEW INTERESTED PEEPS DRAWER */}
      <Drawer
        open={isViewCollaboratorsDrawerOpen}
        onOpenChange={setIsViewCollaboratorsDrawerOpen}
      >
        <DrawerContent className="bg-bgGray">
          <DrawerHeader>
            <DrawerTitle>View Interested Builders</DrawerTitle>
            <DrawerDescription>
              Meet the people working / interested in working on this project
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="p-4 h-full">
            {idea?.collaborators.map((collaborator) => (
              <div key={collaborator.id} className="flex items-center mb-4">
                <Avatar>
                  <AvatarImage src={collaborator.avatar} />
                  <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h4 className="font-bold">{collaborator.name}</h4>
                  <p className="text-sm">{collaborator.role}</p>
                </div>
              </div>
            ))}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default IdeaCard;
