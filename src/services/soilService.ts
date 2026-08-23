import { api, withFallback } from "./api";

export interface SoilMetric {
  label: { en: string; hi: string };
  value: string;
  pct: number;
  status: { en: string; hi: string };
  icon: string;
}

export interface SoilHealth {
  metrics: SoilMetric[];
  recommendation: { en: string; hi: string };
  fieldLabel: { en: string; hi: string };
  updatedLabel: { en: string; hi: string };
}

const mockSoilHealth: SoilHealth = {
  metrics: [
    { label: { en: "Soil Moisture", hi: "मिट्टी की नमी" }, value: "42%", pct: 42, status: { en: "Optimal", hi: "उपयुक्त" }, icon: "Droplets" },
    { label: { en: "Nitrogen (N)", hi: "नाइट्रोजन (N)" }, value: "268 kg/ha", pct: 72, status: { en: "Good", hi: "अच्छा" }, icon: "Leaf" },
    { label: { en: "Phosphorus (P)", hi: "फॉस्फोरस (P)" }, value: "18 kg/ha", pct: 38, status: { en: "Low", hi: "कम" }, icon: "FlaskConical" },
    { label: { en: "Potassium (K)", hi: "पोटैशियम (K)" }, value: "210 kg/ha", pct: 65, status: { en: "Good", hi: "अच्छा" }, icon: "Sprout" },
    { label: { en: "Soil Temperature", hi: "मिट्टी का तापमान" }, value: "27°C", pct: 60, status: { en: "Normal", hi: "सामान्य" }, icon: "Thermometer" },
  ],
  recommendation: {
    en: "Moisture is sufficient today. Rain is likely tomorrow — delay irrigation by 2 days, then give a light 25 mm watering in the evening.",
    hi: "आज नमी पर्याप्त है। कल वर्षा संभव है — सिंचाई 2 दिन टालें, फिर शाम को हल्की 25 मिमी सिंचाई करें।",
  },
  fieldLabel: { en: "Field 1 · Wheat · Updated 2h ago", hi: "खेत 1 · गेहूँ · 2 घंटे पहले" },
  updatedLabel: { en: "Updated 2h ago", hi: "2 घंटे पहले" },
};

export async function getSoilHealth(fieldId: string): Promise<SoilHealth> {
  return withFallback(
    async () => (await api.get<SoilHealth>(`/soil/${fieldId}`)).data,
    () => mockSoilHealth,
  );
}
