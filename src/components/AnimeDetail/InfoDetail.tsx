"use client";

import { fetchCharactersByPage } from "@/libs/anilist-api";
import { Anime } from "@/types/api";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

interface InfoDetailProps {
  anime: Anime;
}

const InfoDetail: React.FC<InfoDetailProps> = ({ anime }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const badges = [anime.type, anime.score, anime.rating];
  const tabs = ["Overview", "Characters", "Theme"];
  const badgeClass =
    "px-3 py-1 rounded-full border border-white/40 bg-black/30 backdrop-blur-sm text-xs sm:text-sm cursor-pointer";

  const [characters, setCharacters] = useState(anime.characters || []);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeClass, setFadeClass] = useState("opacity-100");
  const charactersGridRef = useRef<HTMLDivElement>(null);
  const perPage = 12;

  const loadCharacters = async (newPage: number) => {
    setIsLoading(true);
    setFadeClass("opacity-0");

    // start API call immediately
    try {
      const data = await fetchCharactersByPage(
        String(anime.mal_id),
        newPage,
        perPage
      );
      setCharacters(data.characters);
      setPage(data.pageInfo.currentPage);
      setHasNextPage(data.pageInfo.hasNextPage);

      // Scroll on mobile
      if (window.innerWidth < 768 && charactersGridRef.current) {
        charactersGridRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } catch (error) {
      console.error("Error loading characters:", error);
    }

    setFadeClass("opacity-100");
    setIsLoading(false);
  };

  useEffect(() => {
    if (activeTab === "Characters") {
      loadCharacters(1);
    }
  }, [activeTab]);

  // Convert yt url to privacy-enhanced mode
  const getPrivacyEnhancedUrl = (embedUrl) => {
    if (!embedUrl) return null;
    return embedUrl.replace("youtube.com", "youtube-nocookie.com");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 rounded-xl shadow-xl p-2 md:p-6 lg:p-6 max-w-8xl mx-auto">
      <div className="flex sm:flex-row lg:flex-col items-stretch w-full lg:w-1/3 gap-4">
        {/* Image */}
        <div className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0 h-[240px] sm:h-[280px] md:h-[320px] lg:h-auto lg:aspect-[2/3] 2xl:w-full">
          <div className="relative w-full h-full overflow-hidden rounded shadow-sm">
            <Image
              src={anime.images.webp.large_image_url}
              alt="Anime"
              fill
              className="object-cover rounded"
              loading="lazy"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 10vw"
            />
          </div>
        </div>

        {/* Info */}
        <div className="font-inter border p-4 w-full max-w-full max-h-fit rounded text-left space-y-2 flex-1 h-[240px] sm:h-[280px] md:h-[320px] lg:h-auto overflow-y-auto">
          {[
            ["English Title", anime.title_english],
            ["Japanese Title", anime.title_japanese],
            ["Synonyms", anime.title_synonyms?.join(", ") || "-"],
            ["Episodes", anime.episodes],
            ["Duration", anime.duration],
            ["Status", anime.status],
            ["Premiered", `${anime.season} ${anime.year}`],
            ["Aired", anime.aired.string],
            ["Genre", anime.genres.map((g) => g.name).join(", ")],
            ["Themes", anime.themes.map((t) => t.name).join(", ")],
            ["Demographics", anime.demographics.map((t) => t.name).join(", ")],
            ["Studios", anime.studios.map((s) => s.name).join(", ")],
            ["Licensors", anime.licensors.map((l) => l.name).join(", ")],
            ["Producers", anime.producers.map((p) => p.name).join(", ")],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col md:flex-row lg:flex-col">
              <p className="text-sm font-semibold md:w-40">{label}</p>
              <p className="text-xs md:flex-1">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Overview, Characters */}
      <div className="flex flex-col w-full lg:w-auto gap-4">
        <h3 className="text-2xl font-bold">{anime.title}</h3>

        <div className="flex flex-wrap gap-2">
          {badges.map((item) => (
            <span key={item} className={badgeClass}>
              {item || "-"}
            </span>
          ))}
        </div>
        <p className="font-inter text-sm text-justify leading-relaxed text-white/80">
          {anime.synopsis?.replace(/\s*\[Written by MAL Rewrite\]$/, "")}
        </p>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/20 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm ${
                activeTab === tab
                  ? "border-b-2 border-white text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Tabs */}
        <div className="mt-4">
          {activeTab === "Overview" && (
            <div className="space-y-4">
              {anime.trailer && (
                <div className="aspect-video rounded overflow-hidden">
                  <iframe
                    src={getPrivacyEnhancedUrl(anime.trailer.embed_url)}
                    title="Trailer"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              )}
            </div>
          )}

          {activeTab === "Characters" && (
            <div className="space-y-4">
              <div
                ref={charactersGridRef}
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-100 ease-in-out ${fadeClass}`}
              >
                {characters && characters.length > 0 ? (
                  characters.map((char) => (
                    <div
                      key={char.id}
                      className="bg-white/10 rounded overflow-hidden shadow hover:shadow-lg transition flex flex-row"
                    >
                      <img
                        src={char.image.large}
                        alt={char.name.full}
                        className="w-20 object-cover aspect-[3/4]"
                      />
                      <div className="p-3 flex flex-col justify-center flex-1 text-center sm:text-left">
                        <p className="text-white text-sm font-medium">
                          {char.name.full}
                        </p>
                        <span className="mt-1 inline-block text-[10px] uppercase tracking-wide text-white/60 bg-white/10 rounded-full px-2 py-0.5 w-fit mx-auto sm:mx-0">
                          {char.role}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-sm text-white/70">
                    <p>No character data available.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-4 mt-4">
                <button
                  disabled={page === 1 || isLoading}
                  onClick={() => loadCharacters(page - 1)}
                  className="px-3 py-1 rounded bg-white/20 text-sm disabled:opacity-50 transition-opacity duration-100"
                >
                  {"<"}
                </button>
                <span className="text-white/70 text-sm flex items-center gap-2">
                  Page {page}
                  {isLoading && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  )}
                </span>
                <button
                  disabled={!hasNextPage || isLoading}
                  onClick={() => loadCharacters(page + 1)}
                  className="px-3 py-1 rounded bg-white/20 text-sm disabled:opacity-50 transition-opacity duration-100"
                >
                  {">"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "Theme" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {anime.theme ? (
                <>
                  {/* Openings */}
                  {anime.theme.openings && anime.theme.openings.length > 0 ? (
                    anime.theme.openings.map((op, idx) => (
                      <div
                        key={`op-${idx}`}
                        className="bg-white/10 rounded overflow-hidden shadow hover:shadow-lg transition p-3 flex flex-col justify-center"
                      >
                        <p className="text-white text-sm font-medium">
                          Opening {idx + 1}
                        </p>
                        <span className="mt-1 text-xs text-white/70">{op}</span>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-sm text-white/70">
                      <p>No opening data available.</p>
                    </div>
                  )}

                  {/* Endings */}
                  {anime.theme.endings && anime.theme.endings.length > 0 ? (
                    anime.theme.endings.map((ed, idx) => (
                      <div
                        key={`ed-${idx}`}
                        className="bg-white/10 rounded overflow-hidden shadow hover:shadow-lg transition p-3 flex flex-col justify-center"
                      >
                        <p className="text-white text-sm font-medium">
                          Ending {idx + 1}
                        </p>
                        <span className="mt-1 text-xs text-white/70">{ed}</span>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-sm text-white/70">
                      <p>No ending data available.</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="col-span-full text-sm text-white/70">
                  <p>Anime theme not available.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoDetail;
