"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Tags, TechStackTags } from "@/constants";
import ProjectFilter from "@/components/ProjectFilter";
import Pagination from "@/components/Pagination";
import PreLoader from "@/components/PreLoader";
import SkeletonCard from "@/components/Skeleton";

export default function Home() {
  const { data, status } = useSession();
  const [projects, setProjects] = useState();
  const [filteredProjects, setFilteredProjects] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [filteredTags, setFilteredTags] = useState(Tags);
  const [filteredTechStack, setFilteredTechStack] = useState(TechStackTags);
  const [selectedTechStack, setSelectedTechStack] = useState([]);

  const [totalProjects, setTotalProjects] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(9);
  const [offset, setOffset] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
  };

  const filterProjects = () => {
    if (selectedTags.length == 0) return projects;

    return projects.filter((project) => {
      const matchesTags = selectedTags.some((tag) =>
        project.tags.some((tagObject) => tagObject.tag === tag)
      );
      const matchesTechStack = selectedTechStack.some((tag) =>
        project.technologies.some((tagObject) => tagObject.technology === tag)
      );

      return matchesTags || matchesTechStack;
    });
  };

  const applyFilters = () => {
    setFilteredProjects(filterProjects());
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilteredProjects(projects);
    setSelectedTags([]);
    setSelectedTechStack([]);
    setSearchTerm("");
    setCustomTag("");
  };

  const fetchProjects = async () => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
      const response = await axios.get(
        `${BACKEND_URL}/projects?offset=${0}&limit=${9}`,
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      );

      setProjects(response.data.projects);
      setTotalProjects(response.data.totalProjects);
      setFilteredProjects(response.data.projects);
    } catch (error) {
      console.log("Error while fetching projects: ", error);
    }
  };

  const handleTagClick = (tag, isTag) => {
    const currentSelection = isTag ? selectedTags : selectedTechStack;
    const setSelection = isTag ? setSelectedTags : setSelectedTechStack;
    if (currentSelection.includes(tag)) {
      setSelection(currentSelection.filter((t) => t !== tag));
    } else {
      setSelection([...currentSelection, tag]);
    }
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

  useEffect(() => {
    const total = Math.ceil(totalProjects / 9);
    setTotalPages(total);
  }, [totalProjects]);

  return (
    <div className={`flex flex-col min-h-screen  relative`}>
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="mx-auto p-4 sm:p-6 lg:p-8 ">
          <h1 className="text-4xl mb-4 font-bold text-center ">
            Explore Open Source Projects
          </h1>

          <div className="flex justify-end mb-4">
            <ProjectFilter
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              applyFilters={applyFilters}
              selectedTags={selectedTags}
              resetFilters={resetFilters}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              customTag={customTag}
              setCustomTag={setCustomTag}
              handleAddCustomTag={handleAddCustomTag}
              handleRemoveTag={handleRemoveTag}
              filteredTags={filteredTags}
              handleTagClick={handleTagClick}
              selectedTechStack={selectedTechStack}
              filteredTechStack={filteredTechStack}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-16 items-center justify-items-center">
            {!projects
              ? Array(9)
                  .fill(null)
                  .map(() => (
                    <SkeletonCard
                      key={Math.random().toString(36).substr(2, 9)}
                    />
                  ))
              : filteredProjects?.map((project) => (
                  <ProjectCard project={project} key={project.id} />
                ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
}
