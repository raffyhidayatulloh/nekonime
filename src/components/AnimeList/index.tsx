import { Anime } from "@/types/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AnimeListProps {
  api: Anime[];
  title: string;
}

const AnimeList: React.FC<AnimeListProps> = ({ api, title }) => {
  return (
    <aside className="w-full lg:w-100 flex-shrink-0 rounded-xl border border-gray-800 bg-black/40 backdrop-blur-sm p-3 shadow-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-3 pr-2">
        {api.map((anime) => (
          <li
            key={anime.mal_id}
            className="rounded overflow-hidden flex transform transition duration-300 hover:scale-[1.02]"
          >
            <Link
              href={`anime/${anime.mal_id}`}
              className="flex items-stretch group w-full"
            >
              {/* Poster */}
              <div className="relative w-20 aspect-[2/3] flex-shrink-0">
                <Image
                  src={
                    anime.images.webp.image_url || anime.images.jpg.image_url
                  }
                  alt={anime.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Banner */}
              <div className="relative flex-1 h-full overflow-hidden">
                <Image
                  src={
                    anime.bannerImage ||
                    anime.images.webp.image_url ||
                    anime.images.jpg.image_url
                  }
                  alt={anime.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition duration-300"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/100" />

                <div className="absolute inset-0 flex flex-col justify-between p-2 px-4">
                  <h4 className="text-sm font-medium text-white line-clamp-2">
                    {anime.title}
                  </h4>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full border border-white/40 bg-black/30 backdrop-blur-sm text-xs sm:text-sm">
                      {anime.type}
                    </span>
                    <span className="px-3 py-1 rounded-full border border-white/40 bg-black/30 backdrop-blur-sm text-xs sm:text-sm">
                      {anime.score}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AnimeList;
