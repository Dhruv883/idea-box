"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowBigUp, MessageSquare, Users, ArrowUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

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

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";

const IdeaCard = ({ idea }) => {
  const { data, status } = useSession();

  // Grouping related state variables
  const [dialogState, setDialogState] = useState({ isOpen: false, type: null });
  const [drawerState, setDrawerState] = useState({
    suggestion: false,
    viewSuggestions: false,
    viewCollaborators: false,
  });
  const [suggestion, setSuggestion] = useState("");
  const [userIdeas, setUserIdeas] = useState({
    upvoted: [],
    interested: [],
  });
  const [ideaState, setIdeaState] = useState({
    upvoteCount: idea.upvotes,
    isUpvoted: false,
    isInterested: false,
  });

  const handleSuggestionChange = (e) => {
    setSuggestion(e.target.value);
  };

  const toggleUpvoteIdea = async () => {
    const newUpvoteCount = ideaState.isUpvoted ? ideaState.upvoteCount - 1 : ideaState.upvoteCount + 1;
    setIdeaState((prev) => ({ ...prev, isUpvoted: !prev.isUpvoted, upvoteCount: newUpvoteCount }));

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const endpoint = ideaState.isUpvoted ? 'removeUpvote' : 'upvote';

    try {
      const response = await axios.post(
        `${BACKEND_URL}/ideas/${endpoint}`,
        { ideaId: idea.id },
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      );

      const updatedIdea = response.data;
      if (updatedIdea.upvotes !== newUpvoteCount) {
        setIdeaState((prev) => ({ ...prev, upvoteCount: updatedIdea.upvotes }));
      }
    } catch (error) {
      console.error("Error updating upvote:", error);
      // Revert the update in case of an error
      setIdeaState((prev) => ({ ...prev, isUpvoted: !prev.isUpvoted, upvoteCount: ideaState.upvoteCount }));
    }
  };

  const submitSuggestion = async (e) => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
      const response = await axios.post(
        `${BACKEND_URL}/ideas/suggestion`,
        { suggestion: suggestion, ideaId: idea.id },
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      );

      console.log("Responsee: ", response);
    } catch (error) {
      console.log("Error while creating Suggestion: ", error);
    }
  };

  const handleInterestedInIdea = async () => {
    setIdeaState((prev) => ({ ...prev, isInterested: true }));
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
      const response = await axios.post(
        `${BACKEND_URL}/ideas/interested`,
        { ideaId: idea.id },
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      );

      console.log("Responsee: ", response);
    } catch (error) {
      console.log("Error while adding to Interested Developers: ", error);
    }
  };

  useEffect(() => {
    setUserIdeas({
      upvoted: data.user.upvotedIdeas.map((idea) => idea.id),
      interested: data.user.interestedIdeas.map((idea) => idea.id),
    });
  }, [data, status]);

  useEffect(() => {
    setIdeaState((prev) => ({
      ...prev,
      isUpvoted: userIdeas.upvoted.includes(idea.id),
      isInterested: userIdeas.interested.includes(idea.id),
    }));
  }, [userIdeas, idea.id]);

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
              {idea.user.name}
            </Link>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2 overflow-hidden">
                {idea.tags.slice(0,1).map((obj, index) => (
                  <Badge
                    key={obj.id}
                    className="bg-bgGray2 hover:bg-bgGray2 text-textGray text-nowrap"
                  >
                    {obj.tag}
                  </Badge>
                ))}
                {idea.tags.length > 1 && (
                  <Badge
                    className="bg-bgGray2 hover:bg-bgGray2 text-textGray text-nowrap"
                  >
                    +{idea.tags.length - 1}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="outline"
                    className="bg-bgGray2 text-white border border-bgGray2 text-xs sm:text-sm flex items-center gap-1 px-2 py-1"
                    onClick={toggleUpvoteIdea}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={ideaState.isUpvoted ? "upvoted" : "not-upvoted"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowBigUp
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            ideaState.isUpvoted ? "fill-current" : ""
                          }`}
                        />
                      </motion.div>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={ideaState.upvoteCount}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {ideaState.upvoteCount}
                      </motion.span>
                    </AnimatePresence>
                  </Button>
                </motion.div>

                <Button size="sm" onClick={() => setDialogState({ isOpen: true, type: 'details' })}>
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={dialogState.isOpen} onOpenChange={() => setDialogState({ isOpen: false, type: null })}>
        <DialogContent className="w-full sm:w-11/12 md:w-4/5 max-w-none h-[90vh] sm:h-[95vh] md:h-[90vh] border-none bg-bgGray text-white overflow-y-auto">
          <DialogHeader className="h-auto mb-4 sm:mb-6">
            <DialogTitle className="text-center text-xl sm:text-2xl md:text-4xl mb-2 sm:mb-4 text-white">
              {idea.title}
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base md:text-lg text-textGray">
              {idea.description}
            </DialogDescription>
          </DialogHeader>

          {/* Features Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-white">
              Features:
            </h3>
            <ul className="list-disc pl-5 text-textGray text-sm sm:text-base space-y-1 sm:space-y-2">
              {idea.features.map((obj) => (
                <li key={obj.id}>{obj.feature}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="text-white text-sm sm:text-base">
              Submitted by -{" "}
              <Link href="/u/" className="hover:underline">
                {idea.user.name}
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-medium text-white text-sm sm:text-base">
                Tags:{" "}
              </span>
              {idea.tags.map((obj) => (
                <Badge
                  key={obj.id}
                  className="bg-bgGray2 hover:bg-bgGray2 text-textGray py-1 px-2 text-xs sm:text-sm"
                >
                  {obj.tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Button
                variant="outline"
                onClick={() => setDrawerState((prev) => ({ ...prev, suggestion: true }))}
                className="bg-bgGray2 text-white border border-bgGray2 text-xs sm:text-sm"
              >
                <MessageSquare className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Suggest Features
              </Button>
              <Button
                variant="outline"
                onClick={() => setDrawerState((prev) => ({ ...prev, viewSuggestions: true }))}
                className="bg-bgGray2 text-white border border-bgGray2 text-xs sm:text-sm"
              >
                <MessageSquare className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                View Suggestions
              </Button>
              <Button
                variant="outline"
                onClick={() => setDrawerState((prev) => ({ ...prev, viewCollaborators: true }))}
                className="bg-bgGray2 text-white border border-bgGray2 text-xs sm:text-sm"
              >
                <Users className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                View Interested Developers
              </Button>
              {idea.userId !== data.user.id && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className={`bg-bgGray2 text-white border border-bgGray2 text-xs sm:text-sm ${
                        ideaState.isInterested ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={ideaState.isInterested}
                    >
                      {ideaState.isInterested ? 'Interested' : 'Interested in Building'}
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
                      <Button 
                        type="submit" 
                        onClick={handleInterestedInIdea}
                        disabled={ideaState.isInterested}
                      >
                        I'm Still Interested
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              <motion.div
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  className="bg-bgGray2 text-white border border-bgGray2 text-xs sm:text-sm flex items-center gap-1"
                  onClick={toggleUpvoteIdea}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={ideaState.isUpvoted ? "upvoted" : "not-upvoted"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowBigUp
                        className={`mr-2 h-4 w-4 sm:h-6 sm:w-6 ${
                          ideaState.isUpvoted ? "fill-current" : ""
                        }`}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="w-6 text-center">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={ideaState.upvoteCount}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {ideaState.upvoteCount}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </Button>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/*  SUGGEST FEATURES DRAWER */}
      <Drawer
        open={drawerState.suggestion}
        onOpenChange={() => setDrawerState((prev) => ({ ...prev, suggestion: false }))}
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
              id="suggestion"
              placeholder="Type your suggestions / features here..."
              className="min-h-[200px]"
              value={suggestion}
              onChange={handleSuggestionChange}
            />
          </div>
          <DrawerFooter className="space-y-2">
            <Button variant="outline" onClick={submitSuggestion}>
              Submit Suggestion
            </Button>
            <DrawerClose asChild>
              <Button className="border border-textGray">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/*  VIEW SUGGESTIONS DRAWER */}
      <Drawer
        open={drawerState.viewSuggestions}
        onOpenChange={() => setDrawerState((prev) => ({ ...prev, viewSuggestions: false }))}
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
                <h4 className="font-bold">{suggestion.user.name}</h4>
                <p className="mt-2">{suggestion.suggestion}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(suggestion.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      {/*  VIEW INTERESTED PEEPS DRAWER */}
      <Drawer
        open={drawerState.viewCollaborators}
        onOpenChange={() => setDrawerState((prev) => ({ ...prev, viewCollaborators: false }))}
      >
        <DrawerContent className="bg-bgGray">
          <DrawerHeader>
            <DrawerTitle>View Interested Builders</DrawerTitle>
            <DrawerDescription>
              Meet the people working / interested in working on this project
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="p-4 h-full">
            {idea?.interestedBy.map((collaborator) => (
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