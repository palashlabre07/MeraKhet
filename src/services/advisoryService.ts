import { api, withFallback } from "./api";
import { schemes, advisoryAlerts, farmingTips } from "@/data/advisory";
import type { Scheme, AdvisoryAlert, FarmingTip } from "@/data/advisory";

export type { Scheme, AdvisoryAlert, FarmingTip };

export async function getSchemes(): Promise<Scheme[]> {
  return withFallback(
    async () => (await api.get<Scheme[]>("/advisory/schemes")).data,
    () => schemes,
  );
}

export async function getAdvisoryAlerts(): Promise<AdvisoryAlert[]> {
  return withFallback(
    async () => (await api.get<AdvisoryAlert[]>("/advisory/alerts")).data,
    () => advisoryAlerts,
  );
}

export async function getFarmingTips(): Promise<FarmingTip[]> {
  return withFallback(
    async () => (await api.get<FarmingTip[]>("/advisory/tips")).data,
    () => farmingTips,
  );
}
