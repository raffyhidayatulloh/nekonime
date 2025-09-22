import React from "react";
import { Anime } from "@/types/api";
import BannerDetail from "./BannerDetail";
import InfoDetail from "./InfoDetail";

interface AnimeDetailProps {
  anime: Anime;
}

const AnimeDetail: React.FC<AnimeDetailProps> = ({ anime }) => {
  return (
    <section className="max-w-8xl mx-auto flex flex-col gap-6 px-4 lg:px-6">
      <BannerDetail bannerImage={anime.bannerImage} />
      <div className="-mt-24 lg:-mt-42 z-10 relative">
        <InfoDetail
          anime={anime}
        />
      </div>
    </section>
  );
};

export default AnimeDetail;
