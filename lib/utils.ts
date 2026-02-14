import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!basePath) return path;
  if (path.startsWith("http")) return path;
  if (path.startsWith(basePath)) return path;
  if (path.startsWith("/")) return `${basePath}${path}`;
  return `${basePath}/${path}`;
}
