import { Filter, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "./ui/input";

const IdeaFilter = ({
  isFilterOpen,
  setIsFilterOpen,
  applyFilters,
  resetFilters,
  selectedTags,
  setSelectedTags,
  searchTerm,
  setSearchTerm,
  customTag,
  setCustomTag,
  handleAddCustomTag,
  handleRemoveTag,
  filteredTags,
  handleTagClick,
}) => {
  return (
    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2" size={20} />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Filter Ideas</SheetTitle>
          <SheetDescription>
            Search, select, or add custom tags to filter project ideas
          </SheetDescription>
        </SheetHeader>
        <div className="flex-grow overflow-hidden flex flex-col">
          <div className="space-y-4 mb-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter custom tag..."
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
              />
              <Button onClick={handleAddCustomTag} size="icon">
                <Plus size={20} />
              </Button>
            </div>
            <ScrollArea className="h-20 w-full">
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="pl-2 pr-1 py-1"
                  >
                    {tag}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-auto w-auto p-0 ml-1"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X size={14} />
                    </Button>
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          </div>
          <ScrollArea className="flex-grow">
            <div className="flex flex-wrap gap-2">
              {filteredTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer transition-all duration-200 ease-in-out hover:scale-105"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="mt-auto pt-4 border-t space-y-2">
          <Button onClick={applyFilters} className="w-full">
            Apply Filters ({selectedTags.length})
          </Button>
          <Button onClick={resetFilters} className="w-full">
            Rsest Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default IdeaFilter;
