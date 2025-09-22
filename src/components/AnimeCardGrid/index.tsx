import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Anime } from "@/types/api";
import { slugify } from "@/libs/slugify";

interface AnimeCardGridProps {
  api: Anime[];
}

const AnimeCardGrid: React.FC<AnimeCardGridProps> = ({ api }) => {
  return (
    <section className="flex-1 mr-4">
      <h2 className="text-xl font-semibold mb-4">Ongoing Anime</h2>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-6">
        {api.map((anime) => {
          const slug = slugify(anime.title);

          return (
            <Link
              href={`/anime/${anime.mal_id}/${slug}`}
              key={anime.mal_id}
              className="group block rounded overflow-hidden shadow hover:shadow-lg transition-transform hover:scale-105"
            >
              <div className="aspect-[2/3] relative">
                <Image
                  src={
                    anime.images.webp.image_url || anime.images.jpg.image_url
                  }
                  alt={anime.title}
                  fill
                  className="object-cover rounded transition-opacity group-hover:opacity-70"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, (max-width: 1536px) 16vw, 10vw"
                />
              </div>
              <div className="p-2">
                <h3 className="text-sm font-medium line-clamp-2 text-white">
                  {anime.title.length > 13
                    ? anime.title.slice(0, 13) + "..."
                    : anime.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{anime.type}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default AnimeCardGrid;
