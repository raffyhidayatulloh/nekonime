export interface AnimeImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface AnimeEntity {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: AnimeImage;
    webp: AnimeImage;
  };
  trailer: { embed_url: string };
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  source: string;
  episode: number;
  status: string;
  airing: boolean;
  aired: { string: string };
  duration: string;
  rating: string;
  score: number | null;
  scored_by: number | null;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  season: string;
  year: number;
  genres: AnimeEntity[];
  studios: AnimeEntity[];
  bannerImage: string | null;
  description: string | null;
}
