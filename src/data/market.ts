export type Trend = "up" | "down" | "stable";

export interface MarketPrice {
  crop: { en: string; hi: string };
  todayPrice: number;
  yesterdayPrice: number;
  trend: Trend;
  market: { en: string; hi: string };
  updatedAt: string;
}

export const marketPrices: MarketPrice[] = [
  {
    crop: { en: "Wheat", hi: "गेहूँ" },
    todayPrice: 2420,
    yesterdayPrice: 2380,
    trend: "up",
    market: { en: "Sehore Mandi", hi: "सीहोर मंडी" },
    updatedAt: "10:30 AM",
  },
  {
    crop: { en: "Soybean", hi: "सोयाबीन" },
    todayPrice: 4850,
    yesterdayPrice: 4920,
    trend: "down",
    market: { en: "Bhopal Mandi", hi: "भोपाल मंडी" },
    updatedAt: "11:15 AM",
  },
  {
    crop: { en: "Rice", hi: "चावल" },
    todayPrice: 3100,
    yesterdayPrice: 3100,
    trend: "stable",
    market: { en: "Sehore Mandi", hi: "सीहोर मंडी" },
    updatedAt: "09:45 AM",
  },
  {
    crop: { en: "Cotton", hi: "कपास" },
    todayPrice: 7250,
    yesterdayPrice: 7100,
    trend: "up",
    market: { en: "Indore Mandi", hi: "इंदौर मंडी" },
    updatedAt: "12:00 PM",
  },
  {
    crop: { en: "Maize", hi: "मक्का" },
    todayPrice: 1960,
    yesterdayPrice: 2010,
    trend: "down",
    market: { en: "Bhopal Mandi", hi: "भोपाल मंडी" },
    updatedAt: "10:00 AM",
  },
  {
    crop: { en: "Onion", hi: "प्याज़" },
    todayPrice: 1850,
    yesterdayPrice: 1700,
    trend: "up",
    market: { en: "Indore Mandi", hi: "इंदौर मंडी" },
    updatedAt: "11:30 AM",
  },
];

export interface SellRecommendation {
  crop: { en: string; hi: string };
  day: { en: string; hi: string };
  reason: { en: string; hi: string };
}

export const sellRecommendation: SellRecommendation = {
  crop: { en: "Soybean", hi: "सोयाबीन" },
  day: { en: "Thursday", hi: "गुरुवार" },
  reason: {
    en: "Prices expected to rise 3-5% due to reduced supply at Bhopal mandi this week.",
    hi: "इस सप्ताह भोपाल मंडी में आपूर्ति कम होने से भाव 3-5% बढ़ने की उम्मीद।",
  },
};
