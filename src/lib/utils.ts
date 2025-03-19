import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formateDate(input: string | number): string {
  const date = new Date(input);

  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);

  return `${month} ${day}, ${year}`;
}

