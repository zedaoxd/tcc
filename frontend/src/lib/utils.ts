import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return Intl.NumberFormat("pt-Br", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export function createUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function formatDuration(
  duration: number,
  type: "short" | "long" = "short"
) {
  if (type === "short") {
    return duration < 60 ? `${duration} min` : `${Math.floor(duration / 60)}h`;
  }

  return `${Math.floor(duration / 60)} hour and ${duration % 60} min`;
}
