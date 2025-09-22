import { Anime } from "@/types/api";
import { fetchAnimeJikan, getAnimeById } from "./jikan-api";
import { fetchBannerAniList, fetchBannerByIdAniList } from "./anilist-api";

export async function getOngoingAnimeWithBanner(resource: string, query: string): Promise<Anime[]> {
  const animeList = await fetchAnimeJikan(resource, query);
  const ids = animeList.map((a) => a.mal_id);
  const extraMap = await fetchBannerAniList(ids);

  return animeList.map((anime) => ({
    ...anime,
    bannerImage: extraMap[anime.mal_id]?.bannerImage ?? null,
  }));
}

export async function getAnimeByIdWithBanner(id: string): Promise<Anime> {
  const anime = await getAnimeById(id);
  const extraData = await fetchBannerByIdAniList(id);
  
  return {
    ...anime,
    bannerImage: extraData.bannerImage ?? null,
    characters: extraData.characters ?? [],
  };
}
