"use client";

import { useState, useEffect } from "react";

import IdeaCard from "@/components/IdeaCard";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import axios from "axios";
import IdeaFilter from "@/components/IdeaFilter";
import { Tags } from "@/constants";

export default function Home() {
  const { data, status } = useSession();
  const [ideas, setIdeas] = useState();
  const [filteredIdeas, setFilteredIdeas] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [filteredTags, setFilteredTags] = useState(Tags);

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

    try {
      const response = await axios.get(`${BACKEND_URL}/ideas`, {
        headers: {
          Authorization: `Bearer ${data?.accessToken}`,
        },
      });
      setIdeas(response.data.ideas);
      setFilteredIdeas(response.data.ideas);
    } catch (error) {
      console.log("Error while fetching ideas: ", error);
    }
  };

  useEffect(() => {
    if (data?.accessToken) {
      fetchIdeas();
    }
  }, [data?.accessToken]);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = Tags.filter((tag) =>
      tag.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredTags(filtered);
  }, [searchTerm]);

  if (status == "loading") return <div>loading</div>;
  // console.log(ideas);

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
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-16 items-center justify-items-center">
            {filteredIdeas?.map((idea, idx) => (
              <IdeaCard idea={idea} key={idx} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
