export interface FarmerProfile {
  name: { en: string; hi: string };
  mobile: string;
  email: string;
  state: { en: string; hi: string };
  district: { en: string; hi: string };
  village: { en: string; hi: string };
  landSize: number;
  landUnit: { en: string; hi: string };
  primaryCrop: { en: string; hi: string };
  preferredLanguage: { en: string; hi: string };
}

export const farmerProfile: FarmerProfile = {
  name: { en: "Ramesh Kumar", hi: "रमेश कुमार" },
  mobile: "+91 98765 43210",
  email: "ramesh.kumar@email.com",
  state: { en: "Madhya Pradesh", hi: "मध्य प्रदेश" },
  district: { en: "Sehore", hi: "सीहोर" },
  village: { en: "Barkhedi", hi: "बरखेड़ी" },
  landSize: 2.5,
  landUnit: { en: "Acres", hi: "एकड़" },
  primaryCrop: { en: "Wheat", hi: "गेहूँ" },
  preferredLanguage: { en: "English", hi: "अंग्रेज़ी" },
};

export interface CropHistoryItem {
  season: { en: string; hi: string };
  crop: { en: string; hi: string };
  area: number;
  yield: number;
  revenue: number;
}

export const cropHistory: CropHistoryItem[] = [
  {
    season: { en: "Rabi 2025", hi: "रबी 2025" },
    crop: { en: "Wheat", hi: "गेहूँ" },
    area: 2.5,
    yield: 48,
    revenue: 290400,
  },
  {
    season: { en: "Kharif 2024", hi: "खरीफ 2024" },
    crop: { en: "Soybean", hi: "सोयाबीन" },
    area: 2.0,
    yield: 14,
    revenue: 136800,
  },
  {
    season: { en: "Rabi 2024", hi: "रबी 2024" },
    crop: { en: "Wheat", hi: "गेहूँ" },
    area: 2.5,
    yield: 45,
    revenue: 269100,
  },
];

export interface ScanHistoryItem {
  date: string;
  disease: { en: string; hi: string };
  confidence: number;
}

export const scanHistory: ScanHistoryItem[] = [
  {
    date: "23 Aug 2026",
    disease: { en: "Leaf Rust", hi: "पत्ती रतुआ" },
    confidence: 94,
  },
  {
    date: "15 Aug 2026",
    disease: { en: "Healthy", hi: "स्वस्थ" },
    confidence: 98,
  },
  {
    date: "02 Aug 2026",
    disease: { en: "Powdery Mildew", hi: "फफूंदी" },
    confidence: 87,
  },
];
