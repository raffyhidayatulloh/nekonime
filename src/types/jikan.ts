export interface AnimeImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Anime {
  mal_id: number;
  title: string;
  url: string;
  images: {
    jpg: AnimeImage;
    webp: AnimeImage;
  };
  score: number | null;
}
