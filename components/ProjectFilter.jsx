import { Filter, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export default function ProjectFilter({
  isFilterOpen,
  setIsFilterOpen,
  applyFilters,
  resetFilters,
  selectedTags,
  searchTerm,
  setSearchTerm,
  customTag,
  setCustomTag,
  handleAddCustomTag,
  handleRemoveTag,
  filteredTags,
  handleTagClick,
  selectedTechStack,
  filteredTechStack,
}) {
  return (
    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2" size={20} />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">
            Filter Projects
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-3">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex space-x-2">
            <Input
              placeholder="Enter custom tag..."
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
            />
            <Button onClick={handleAddCustomTag} size="icon" variant="default">
              <Plus size={20} />
            </Button>
          </div>
          <ScrollArea className="h-24 border-b border-bgGray2 pb-2">
            <div className="flex flex-wrap gap-2">
              {[...selectedTags, ...selectedTechStack].map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="pl-2 pr-1 py-1"
                >
                  {item}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-auto w-auto p-0 ml-1"
                    onClick={() => handleRemoveTag(item)}
                  >
                    <X size={14} />
                  </Button>
                </Badge>
              ))}
            </div>
          </ScrollArea>
          <Tabs defaultValue="tags">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tags">Tags</TabsTrigger>
              <TabsTrigger value="techstack">Tech Stack</TabsTrigger>
            </TabsList>
            <TabsContent value="tags">
              <ScrollArea className="h-40 pb-2">
                <div className="flex flex-wrap gap-2 p-2">
                  {(filteredTags || []).map((tag) => (
                    <Badge
                      key={tag}
                      variant={
                        selectedTags.includes(tag) ? "default" : "secondary"
                      }
                      className="cursor-pointer transition-all duration-200 ease-in-out hover:scale-105"
                      onClick={() => handleTagClick(tag, true)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="techstack">
              <ScrollArea className="h-40 pb-2">
                <div className="flex flex-wrap gap-2 p-2">
                  {(filteredTechStack || []).map((tag) => (
                    <Badge
                      key={tag}
                      variant={
                        selectedTags.includes(tag) ? "default" : "secondary"
                      }
                      className="cursor-pointer transition-all duration-200 ease-in-out hover:scale-105"
                      onClick={() => handleTagClick(tag, false)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
        <div className="mt-8 space-y-3">
          <Button
            onClick={applyFilters}
            className="w-full bg-primary text-primary-foreground"
          >
            Apply Filters ({selectedTags.length + selectedTechStack.length})
          </Button>
          <Button onClick={resetFilters} className="w-full" variant="outline">
            Reset Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
