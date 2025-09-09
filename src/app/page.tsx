import Carousel from "@/components/Carousel/page";
import { getTopAnime } from "@/libs/jikan";
import React from "react";

const Page = async () => {
  const topAnime = await getTopAnime("top/anime", "limit=5");

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Home Page</h1>
      <Carousel api={topAnime} />
    </main>
  );
};

export default Page;
