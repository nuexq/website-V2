import type { CollectionEntry } from "astro:content";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formateDate(input: Date): string {
  const date = new Date(input);

  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date,
  );

  return `${month} ${day}, ${year}`;
}

export function sortPosts(
  posts: CollectionEntry<"writing">[],
): CollectionEntry<"writing">[] {
  return posts.sort((a, b) => {
    if (a.data.date > b.data.date) return -1;
    if (a.data.date < b.data.date) return 1;
    return 0;
  });
}

export function filterByTags(posts: CollectionEntry<"writing">[], tag: string) {
  return posts.filter((post) => {
    const { tags } = post.data;
    if (!tags) return false;
    return tags.includes(tag);
  });
}
