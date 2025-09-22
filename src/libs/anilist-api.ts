import { Character } from "@/types/api";

export async function fetchBannerAniList(
  ids: number[]
): Promise<Record<number, { bannerImage: string | null }>> {
  const query = `
    query ($ids: [Int]) {
      Page(perPage: 50) {
        media(idMal_in: $ids, type: ANIME) {
          idMal
          bannerImage
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
  const map: Record<number, { bannerImage: string | null }> = {};
  for (const m of json.data.Page.media) {
    map[m.idMal] = {
      bannerImage: m.bannerImage ?? null,
    };
  }
  return map;
}

export async function fetchBannerByIdAniList(
  id: string
): Promise<{ bannerImage: string | null; characters: Character[] }> {
  const query = `
    query ($id: Int) {
      Media(idMal: $id, type: ANIME) {
        bannerImage
        characters (perPage: 12, sort: ROLE) {
          edges {
            role
            node {
              id
              name { full }
              image { large }
            }
          }
        } 
      }
    }
  `;

  const res = await fetch(process.env.NEXT_PUBLIC_ANILIST_API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { id } }),
    cache: "force-cache",
  });

  if (!res.ok) return { bannerImage: null, characters: [] };

  const json = await res.json();
  const media = json.data?.Media;

  const characters =
    media?.characters?.edges?.map((edge: any) => ({
      id: edge.node.id,
      name: edge.node.name,
      image: edge.node.image,
      role: edge.role,
    })) ?? [];

  return {
    bannerImage: media?.bannerImage ?? null,
    characters,
  };
}

export async function fetchCharactersByPage(
  id: string,
  page: number,
  perPage: number = 12
): Promise<{
  characters: Character[];
  pageInfo: { currentPage: number; hasNextPage: boolean };
}> {
  const query = `
    query ($id: Int, $page: Int, $perPage: Int) {
      Media(idMal: $id, type: ANIME) {
        characters (page: $page, perPage: $perPage, sort: ROLE) {
          pageInfo {
            currentPage
            hasNextPage
          }
          edges {
            role
            node {
              id
              name { full }
              image { large }
            }
          }
        } 
      }
    }
  `;

  const res = await fetch(process.env.NEXT_PUBLIC_ANILIST_API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { id, page, perPage } }),
  });

  if (!res.ok)
    return { characters: [], pageInfo: { currentPage: 1, hasNextPage: false } };

  const json = await res.json();
  const characters =
    json.data?.Media?.characters?.edges?.map((edge: any) => ({
      id: edge.node.id,
      name: edge.node.name,
      image: edge.node.image,
      role: edge.role,
    })) ?? [];

  return {
    characters,
    pageInfo: json.data?.Media?.characters?.pageInfo,
  };
}
