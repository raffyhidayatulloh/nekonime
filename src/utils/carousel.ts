export const truncateText = (text: string, limit: number): string =>
  text.length > limit ? `${text.substring(0, limit)}...` : text;

export const formatItems = (
  items: { name: string }[] | undefined,
  count: number
): string | undefined =>
  items
    ?.slice(0, count)
    .map((item) => item.name)
    .join(" • ");

export const normalizeIndex = (index: number, length: number): number =>
  ((index % length) + length) % length;
