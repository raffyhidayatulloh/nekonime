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

export interface AnimeTrailer {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: AnimeImage;
}

export interface AiredPropDate {
  day: number | null;
  month: number | null;
  year: number | null;
}

export interface Aired {
  from: string | null;
  to: string | null;
  prop: {
    from: AiredPropDate;
    to: AiredPropDate;
  };
  string: string;
}

export interface AnimeRelation {
  relation: string;
  entry: AnimeEntity[];
}

export interface AnimeTheme {
  openings: string[];
  endings: string[];
}

export interface AnimeExternal {
  name: string;
  url: string;
}

export type Character = {
  id: number;
  name: { full: string };
  image: { large: string };
  role: "MAIN" | "SUPPORTING" | "BACKGROUND";
};

export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: AnimeImage;
    webp: AnimeImage;
  };
  trailer: AnimeTrailer;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
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
  producers: AnimeEntity[];
  licensors: AnimeEntity[];
  studios: AnimeEntity[];
  genres: AnimeEntity[];
  explicit_genres: string[];
  themes: AnimeEntity[];
  demographics: AnimeEntity[];
  relations: AnimeRelation;
  theme: AnimeTheme;
  external: AnimeExternal[];
  streaming: AnimeExternal[];
  bannerImage: string | null;
  characters: Character[]
}
