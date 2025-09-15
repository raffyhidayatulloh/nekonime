import { z } from 'zod';

export const JikanImage = z.object({
  image_url: z.string().url().optional(),
  small_image_url: z.string().url().optional(),
  large_image_url: z.string().url().optional(),
});

export const JikanImages = z.object({
  jpg: JikanImage.optional(),
  webp: JikanImage.optional(),
});

export const AnimeItem = z.object({
  mal_id: z.number(),
  url: z.string().url().optional(),
  images: JikanImages.optional(),
  title: z.string(),
  score: z.number().nullable().optional(),
  type: z.string().nullable().optional(),
  episodes: z.number().nullable().optional(),
  synopsis: z.string().nullable().optional(),
  year: z.number().nullable().optional(),
});

export const ListResponse = z.object({
  data: z.array(AnimeItem),
  pagination: z.object({
    has_next_page: z.boolean().optional(),
    current_page: z.number().optional(),
    items: z.object({ count: z.number().optional(), total: z.number().optional(), per_page: z.number().optional() }).optional(),
  }).optional(),
});

export const DetailResponse = z.object({ data: AnimeItem });
