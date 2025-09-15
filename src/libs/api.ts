import { Anime } from "@/types/api";

export async function getTopAnime(
  resource: string,
  query: string
): Promise<Anime[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_JIKAN_API_URL}/${resource}?${query}`
  );

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

  if (!res.ok)
    throw new Error(
      `Failed to fetch top anime: ${res.status} ${res.statusText}`
    );

  const data = await res.json();
  return data.data as Anime[];
}

async function fetchOngoingJikan(): Promise<Anime[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_JIKAN_API_URL}/seasons/now`);
  url.searchParams.set("status", "airing");

  const res = await fetch(url.toString(), { next: { revalidate: 1800 } });

  if (!res.ok)
    throw new Error(
      `Failed to fetch ongoing anime: ${res.status} ${res.statusText}`
    );

  const json = await res.json();
  return json.data as Anime[];
}

async function fetchBannerBatchAniList(
  ids: number[]
): Promise<
  Record<number, { bannerImage: string | null; description: string | null }>
> {
  const query = `
    query ($ids: [Int]) {
      Page(perPage: 50) {
        media(idMal_in: $ids, type: ANIME) {
          idMal
          bannerImage
          description
        }
      }
    }`;

  const res = await fetch(process.env.NEXT_PUBLIC_ANILIST_API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { ids } }),
    cache: "force-cache",
  });

  if (!res.ok) return {};

  const json = await res.json();
  const map: Record<
    number,
    { bannerImage: string | null; description: string | null }
  > = {};
  for (const m of json.data.Page.media) {
    map[m.idMal] = {
      bannerImage: m.bannerImage ?? null,
      description: m.description ?? null,
    };
  }
  return map;
}

export async function getOngoingAnimeWithBanner(): Promise<Anime[]> {
  const animeList = await fetchOngoingJikan();
  const ids = animeList.map((a) => a.mal_id);
  const extraMap = await fetchBannerBatchAniList(ids);

  return animeList.map((anime) => ({
    ...anime,
    bannerImage: extraMap[anime.mal_id]?.bannerImage ?? null,
    description: extraMap[anime.mal_id]?.description ?? null,
  }));
}
