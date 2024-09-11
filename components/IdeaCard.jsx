import { Card } from "@/components/ui/card";
import { ThumbsUp, MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Item } from "@radix-ui/react-select";

const IdeaCard = ({ idea }) => {
  return (
    <Card className="w-[18rem] mobile2:w-96 h-full px-6 py-4 grid gap-6 cursor-pointer">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold max-h-16 text-ellipsis overflow-hidden">
          {idea.title}
        </h3>
        <p className="max-h-12 text-ellipsis overflow-hidden">
          {idea.description}.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2 h-6 overflow-hidden w-2/3">
          {idea.tags.map((tag, idx) => {
            return <Badge key={idx}>{tag}</Badge>;
          })}
        </div>
        <div className="flex items-center gap-4 text-sm  w-1/3 justify-center pb-1">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{idea.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquareIcon className="w-4 h-4" />
            <span>{idea.suggestions}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IdeaCard;
