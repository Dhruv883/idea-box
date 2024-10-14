"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Tags } from "@/constants";
import Filter from "@/components/Filter";

export default function Home() {
  const { data, status } = useSession();
  const [projects, setProjects] = useState();
  const [filteredProjects, setFilteredProjects] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [filteredTags, setFilteredTags] = useState(Tags);

  const filterProjects = () => {
    if (selectedTags.length == 0) return projects;

    return projects.filter((project) => {
      const matchesTags = selectedTags.some((tag) =>
        project.tags.some((tagObject) => tagObject.tag === tag)
      );
      return matchesTags;
    });
  };

  const applyFilters = () => {
    setFilteredProjects(filterProjects());
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilteredProjects(projects);
    setSelectedTags([]);
  };

  const fetchProjects = async () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
      const response = await axios.get(`${BACKEND_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${data?.accessToken}`,
        },
      });

      setProjects(response.data.projects);
      setFilteredProjects(response.data.projects);
    } catch (error) {
      console.log("Error while fetching projects: ", error);
    }
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

  useEffect(() => {
    if (data?.accessToken) {
      fetchProjects();
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

  return (
    <div className={`flex flex-col min-h-screen  relative`}>
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="mx-auto p-4 sm:p-6 lg:p-8 ">
          <h1 className="text-4xl mb-4 font-bold text-center ">
            Explore Open Source Projects
          </h1>

          <div className="flex justify-end mb-4">
            <Filter
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
              filterType={"Projects"}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-16 items-center justify-items-center">
            {filteredProjects?.map((project, idx) => (
              <ProjectCard project={project} key={idx} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
