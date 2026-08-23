import { api, withFallback } from "./api";
import { marketPrices, sellRecommendation } from "@/data/market";
import type { MarketPrice, SellRecommendation, Trend } from "@/data/market";

export type { MarketPrice, SellRecommendation, Trend };

export async function getMarketPrices(location?: string): Promise<MarketPrice[]> {
  const params = location ? { location } : {};
  return withFallback(
    async () => (await api.get<MarketPrice[]>("/market/prices", { params })).data,
    () => marketPrices,
  );
}

export async function getSellRecommendation(): Promise<SellRecommendation> {
  return withFallback(
    async () => (await api.get<SellRecommendation>("/market/recommendation")).data,
    () => sellRecommendation,
  );
}
