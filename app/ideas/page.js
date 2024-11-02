"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/hooks/use-toast";
import IdeaCard from "@/components/IdeaCard";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import axios from "axios";
import IdeaFilter from "@/components/IdeaFilter";
import { Tags } from "@/constants";
import Pagination from "@/components/Pagination";
import Skeleton from "@/components/Skeleton";
import { useRouter } from "next/navigation";
import PreLoader from "@/components/PreLoader";

export default function Home() {
  const { data, status } = useSession();
  const [ideas, setIdeas] = useState();
  const [filteredIdeas, setFilteredIdeas] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [filteredTags, setFilteredTags] = useState(Tags);
  const { toast } = useToast();
  const [totalIdeas, setTotalIdeas] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(9);
  const [offset, setOffset] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
  };

  const filterIdeas = () => {
    if (selectedTags.length == 0) return ideas;

    return ideas.filter((idea) => {
      const matchesTags = selectedTags.some((tag) =>
        idea.tags.some((tagObject) => tagObject.tag === tag)
      );
      return matchesTags;
    });
  };

  const resetFilters = () => {
    setSelectedTags([]);
    setFilteredIdeas(ideas);
  };

  const applyFilters = () => {
    setFilteredIdeas(filterIdeas());
    setIsFilterOpen(false);
  };

  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleAddCustomTag = () => {
    if (customTag && !selectedTags.includes(customTag)) {
      setSelectedTags((prev) => [...prev, customTag]);
      setCustomTag("");
    }
  };

  const fetchIdeas = async () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const tagsQuery = selectedTags.map((tag) => `tags=${tag}`).join("&");

    try {
      const response = await axios.get(
        `${BACKEND_URL}/ideas?offset=${offset}&limit=${limit}&${tagsQuery}`,
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
            headers: { "Cache-Control": "no-store" },
          },
        }
      );
      setIdeas(response.data.ideas);
      setTotalIdeas(response.data.totalIdeas);
      setFilteredIdeas(response.data.ideas);
    } catch (error) {
      toast({
        title: "Failed to fetch Ideas",
        variant: "destructive",
      });
      console.log("Error while fetching ideas: ", error);
    }
  };

  useEffect(() => {
    if (data?.accessToken) {
      fetchIdeas();
    }
  }, [data?.accessToken, currentPage, selectedTags]);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = Tags.filter((tag) =>
      tag.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredTags(filtered);
  }, [searchTerm]);

  useEffect(() => {
    const total = Math.ceil(totalIdeas / 9);
    setTotalPages(total);
  }, [totalIdeas]);

  if (status == "loading") {
    return <PreLoader />;
  }

  return (
    <div className={`flex flex-col min-h-screen bg-black text-white relative`}>
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="mx-auto p-4 sm:p-6 lg:p-8 ">
          <h1 className="text-4xl mb-4 font-bold text-center">
            Explore Project Ideas
          </h1>
          <div className="flex justify-end mb-4">
            <IdeaFilter
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              applyFilters={applyFilters}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              resetFilters={resetFilters}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              customTag={customTag}
              setCustomTag={setCustomTag}
              handleAddCustomTag={handleAddCustomTag}
              handleRemoveTag={handleRemoveTag}
              filteredTags={filteredTags}
              handleTagClick={handleTagClick}
              filterType={"Ideas"}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-6 gap-x-16 items-center justify-items-center">
            {!ideas
              ? Array(9)
                  .fill(null)
                  .map(() => (
                    <Skeleton key={Math.random().toString(36).substr(2, 9)} />
                  ))
              : filteredIdeas?.map((idea) => (
                  <IdeaCard initialIdea={idea} key={idea.id} />
                ))}
          </div>
          {ideas && ideas.length != 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </div>
  );
}
