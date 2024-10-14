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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export default function F({
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
  filterType,
}) {
  return (
    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2" size={20} />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-background text-foreground sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">
            Filter {filterType}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <Input
            placeholder="Search tags..."
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
          <ScrollArea className="h-28 border-b border-bgGray2 pb-2">
            <div className="flex flex-wrap gap-3">
              {(selectedTags || []).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="pl-2 pr-1 py-1 bg-secondary text-secondary-foreground"
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
            <ScrollBar orientation="vertical" />
          </ScrollArea>
          <ScrollArea className="h-40 border-b border-bgGray2 pb-2">
            <div className="flex flex-wrap gap-3">
              {(filteredTags || []).map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "secondary"}
                  className="cursor-pointer transition-all duration-200 ease-in-out hover:scale-105"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
        <div className="mt-8 space-y-3">
          <Button
            onClick={applyFilters}
            className="w-full bg-primary text-primary-foreground"
          >
            Apply Filters ({selectedTags?.length || 0})
          </Button>
          <Button onClick={resetFilters} className="w-full" variant="outline">
            Reset Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
