import { Anime } from "@/types/api";

export async function fetchAnimeJikan(resource: string, query: string): Promise<Anime[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_JIKAN_API_URL}/${resource}?${query}`);
  const res = await fetch(url.toString(), { next: { revalidate: 1800 } });

  if (!res.ok) throw new Error(`Failed to fetch ongoing anime: ${res.status} ${res.statusText}`);

  const json = await res.json();
  return json.data as Anime[];
}

export async function getAnimeById(id: string): Promise<Anime> {
  const url = new URL(`${process.env.NEXT_PUBLIC_JIKAN_API_URL}/anime/${id}/full`);
  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  
  if (!res.ok) throw new Error(`Failed to fetch anime: ${res.status} ${res.statusText}`);
  
  const data = await res.json();
  return data.data as Anime;
}

