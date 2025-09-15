import Carousel from "@/components/Carousel";
import Navbar from "@/components/Navbar";
import { getOngoingAnimeWithBanner } from "@/libs/api";
import React from "react";

const Page = async () => {
  const anime = await getOngoingAnimeWithBanner();
  const animeWithBanner = anime.filter(a => a.bannerImage);

  return (
    <div className="font-poppins">
      <Navbar />
      <main className="px-4">
        <Carousel api={animeWithBanner} />
      </main>
    </div>
  );
};

export default Page;
