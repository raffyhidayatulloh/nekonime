import AnimeDetail from "@/components/AnimeDetail";
import { getAnimeByIdWithBanner } from "@/libs/api";
import React from "react";

interface PageProps {
  params: { id: string; };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const anime = await getAnimeByIdWithBanner(id);

  return (
    <main className="font-poppins pt-20 p-4">
      <AnimeDetail anime={anime} />
    </main>
  );
};

export default Page;
