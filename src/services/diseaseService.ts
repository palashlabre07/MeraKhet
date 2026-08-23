import { api, withFallback } from "./api";

export interface DiseaseResult {
  diseaseName: { en: string; hi: string };
  confidence: number;
  organicTreatment: { en: string; hi: string }[];
  chemicalTreatment: { en: string; hi: string }[];
}

const mockResult: DiseaseResult = {
  diseaseName: { en: "Leaf Rust (Puccinia triticina)", hi: "पत्ती रतुआ (पक्सीनिया ट्रिटिसिना)" },
  confidence: 94,
  organicTreatment: [
    {
      en: "Spray neem oil 5 ml per litre of water, early morning.",
      hi: "नीम तेल 5 मिली प्रति लीटर पानी, सुबह छिड़कें।",
    },
    {
      en: "Apply Trichoderma-based bio-fungicide every 10 days.",
      hi: "हर 10 दिन में ट्राइकोडर्मा जैव-फफूंदनाशी डालें।",
    },
  ],
  chemicalTreatment: [
    {
      en: "Propiconazole 25% EC — 1 ml per litre of water.",
      hi: "प्रोपिकोनाज़ोल 25% EC — 1 मिली प्रति लीटर पानी।",
    },
    {
      en: "Repeat after 15 days. Wear mask and gloves.",
      hi: "15 दिन बाद दोहराएँ। मास्क और दस्ताने पहनें।",
    },
  ],
};

export async function detectDisease(imageFile: File): Promise<DiseaseResult> {
  const formData = new FormData();
  formData.append("image", imageFile);

  return withFallback(
    async () => (await api.post<DiseaseResult>("/disease/scan", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })).data,
    () => mockResult,
  );
}

export async function getDiseaseResult(scanId: string): Promise<DiseaseResult> {
  return withFallback(
    async () => (await api.get<DiseaseResult>(`/disease/${scanId}`)).data,
    () => mockResult,
  );
}
