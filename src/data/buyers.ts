export interface Buyer {
  name: { en: string; hi: string };
  crop: { en: string; hi: string };
  priceOffered: number;
  distanceKm: number;
  phone: string;
}

export const buyers: Buyer[] = [
  {
    name: { en: "Krishna Agro Traders", hi: "कृष्णा एग्रो ट्रेडर्स" },
    crop: { en: "Wheat", hi: "गेहूँ" },
    priceOffered: 2450,
    distanceKm: 12,
    phone: "+91 98260 11111",
  },
  {
    name: { en: "Malwa Soy Industries", hi: "मालवा सोय इंडस्ट्रीज़" },
    crop: { en: "Soybean", hi: "सोयाबीन" },
    priceOffered: 4900,
    distanceKm: 28,
    phone: "+91 98260 22222",
  },
  {
    name: { en: "Narmada Rice Mills", hi: "नर्मदा राइस मिल्स" },
    crop: { en: "Rice", hi: "चावल" },
    priceOffered: 3150,
    distanceKm: 18,
    phone: "+91 98260 33333",
  },
  {
    name: { en: "Bhartiya Cotton Co.", hi: "भारतीय कॉटन कंपनी" },
    crop: { en: "Cotton", hi: "कपास" },
    priceOffered: 7300,
    distanceKm: 45,
    phone: "+91 98260 44444",
  },
  {
    name: { en: "Madhya Maize Buyers", hi: "मध्य मक्का खरीदार" },
    crop: { en: "Maize", hi: "मक्का" },
    priceOffered: 1980,
    distanceKm: 8,
    phone: "+91 98260 55555",
  },
  {
    name: { en: "Fresh Veg Exports", hi: "फ्रेश वेग एक्सपोर्ट्स" },
    crop: { en: "Onion", hi: "प्याज़" },
    priceOffered: 1900,
    distanceKm: 22,
    phone: "+91 98260 66666",
  },
];
