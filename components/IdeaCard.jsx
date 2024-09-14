import { Card } from "@/components/ui/card";
import { ThumbsUp, MessageSquareIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const IdeaCard = ({ idea }) => {
  return (
    <Dialog>
      <DialogTrigger className="h-full">
        <Card className="w-[18rem] mobile2:w-96 h-full px-6 py-4 grid gap-6 cursor-pointer group hover:bg-black">
          <div className="space-y-2 group-hover:text-white">
            <h3 className="text-2xl font-semibold max-h-16 text-ellipsis overflow-hidden">
              {idea.title}
            </h3>
            <p className="max-h-12 text-ellipsis overflow-hidden">
              {idea.description}.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2 h-6 overflow-hidden w-full">
              {idea.tags.map((tag, idx) => {
                return (
                  <Badge
                    key={idx}
                    className="group-hover:bg-white group-hover:text-black"
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
            {/* <div className="flex items-center gap-4 text-sm  w-1/3 justify-center pb-1 text-black group-hover:text-white">
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{idea.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquareIcon className="w-4 h-4" />
                <span>{idea.suggestions}</span>
              </div>
            </div> */}
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="bg-black text-white border-none">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default IdeaCard;
