import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formateDate(input: string | number): string {
  const date = new Date(input);

  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date,
  );

  return `${month} ${day}, ${year}`;
}

export interface PostData {
  title: string;
  description: string;
  date: Date;
}

interface Post {
  id: string;
  data: PostData;
  body: string;
  filePath: string;
  digest: string;
  deferredRender: boolean;
  collection: string;
  slug: string;
  render: Function;
}

export function sortPosts(posts: Post[]): Post[] {
  return posts.sort((a, b) => {
    if (a.data.date > b.data.date) return -1;
    if (a.data.date < b.data.date) return 1;
    return 0;
  });
}

export function sortLogs(item) {
  return item.sort((a, b) => {
    if (a.endDate > b.endDate) return -1;
    if (a.endDate < b.endDate) return 1;
    return 0;
  });
}

export interface Project {
  name: string;
  slug: string;
  description: string;
  type: "site" | "project";
  link?: string;
  tech: string[];
}

export type Projects = Project[];
