import { Anime } from "@/types/jikan";

export async function getTopAnime(
  resource: string,
  query: string
): Promise<Anime[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_JIKAN_API_URL}/${resource}?${query}`
  );

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch top anime: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();
  return data.data as Anime[];
}
