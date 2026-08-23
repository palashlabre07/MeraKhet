import { api, withFallback } from "./api";
import { farmerProfile, cropHistory, scanHistory } from "@/data/farmer";
import type { FarmerProfile, CropHistoryItem, ScanHistoryItem } from "@/data/farmer";

export type { FarmerProfile, CropHistoryItem, ScanHistoryItem };

export async function getFarmerProfile(farmerId: string): Promise<FarmerProfile> {
  return withFallback(
    async () => (await api.get<FarmerProfile>(`/farmers/${farmerId}`)).data,
    () => farmerProfile,
  );
}

export async function getCropHistory(farmerId: string): Promise<CropHistoryItem[]> {
  return withFallback(
    async () => (await api.get<CropHistoryItem[]>(`/farmers/${farmerId}/crops`)).data,
    () => cropHistory,
  );
}

export async function getScanHistory(farmerId: string): Promise<ScanHistoryItem[]> {
  return withFallback(
    async () => (await api.get<ScanHistoryItem[]>(`/farmers/${farmerId}/scans`)).data,
    () => scanHistory,
  );
}

export async function updateFarmerProfile(
  farmerId: string,
  data: Partial<FarmerProfile>,
): Promise<FarmerProfile> {
  return withFallback(
    async () => (await api.put<FarmerProfile>(`/farmers/${farmerId}`, data)).data,
    () => ({ ...farmerProfile, ...data }),
  );
}
