import { api, withFallback } from "./api";
import { buyers } from "@/data/buyers";
import type { Buyer } from "@/data/buyers";

export type { Buyer };

export async function getBuyers(crop?: string): Promise<Buyer[]> {
  const params = crop ? { crop } : {};
  return withFallback(
    async () => (await api.get<Buyer[]>("/buyers", { params })).data,
    () => (crop ? buyers.filter((b) => b.crop.en === crop) : buyers),
  );
}

export async function getBuyerById(buyerId: string): Promise<Buyer> {
  return withFallback(
    async () => (await api.get<Buyer>(`/buyers/${buyerId}`)).data,
    () => buyers[0],
  );
}
