import AnimeCardGrid from "@/components/AnimeCardGrid";
import AnimeList from "@/components/AnimeList";
import Carousel from "@/components/Carousel";
import { getOngoingAnimeWithBanner } from "@/libs/api";
import React from "react";

const Page = async () => {
  const anime = await getOngoingAnimeWithBanner("seasons/now", "status=airing");
  const animeWithBanner = anime.filter((a) => a.bannerImage);

  return (
    <div className="font-poppins">
      <main className="pt-20 px-4">
        <Carousel api={animeWithBanner} />
        <section className="flex flex-col lg:flex-row gap-4 py-4">
          <AnimeCardGrid api={anime.slice(0, 24)} />
          <AnimeList api={anime.slice(0, 10)} title={"Top Airing"} />
        </section>
      </main>
    </div>
  );
};

export default Page;
