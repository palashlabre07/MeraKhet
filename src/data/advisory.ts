export interface Scheme {
  id: string;
  title: { en: string; hi: string };
  eligibility: { en: string; hi: string };
  benefits: { en: string; hi: string };
  Icon: string;
}

export const schemes: Scheme[] = [
  {
    id: "pm-kisan",
    title: { en: "PM-KISAN", hi: "पीएम-किसान" },
    eligibility: {
      en: "All small and marginal farmers holding cultivable land.",
      hi: "सभी लघु एवं सीमांत किसान जिनके पास कृषि योग्य भूमि है।",
    },
    benefits: {
      en: "₹6,000 per year in three installments directly to bank account.",
      hi: "₹6,000 प्रति वर्ष तीन किस्तों में सीधे बैंक खाते में।",
    },
    Icon: "Landmark",
  },
  {
    id: "soil-health-card",
    title: { en: "Soil Health Card", hi: "मिट्टी स्वास्थ्य कार्ड" },
    eligibility: {
      en: "All farmers with registered land holdings.",
      hi: "सभी पंजीकृत भूमि धारक किसान।",
    },
    benefits: {
      en: "Free soil testing and nutrient recommendations every 2 years.",
      hi: "हर 2 वर्ष में निःशुल्क मिट्टी जाँच और पोषक सलाह।",
    },
    Icon: "FlaskConical",
  },
  {
    id: "crop-insurance",
    title: { en: "Crop Insurance (PMFBY)", hi: "फसल बीमा (पीएमएफबीवाई)" },
    eligibility: {
      en: "Loanee and non-loanee farmers growing notified crops.",
      hi: "अधिसूचित फसल उगाने वाले ऋणी और गैर-ऋणी किसान।",
    },
    benefits: {
      en: "Up to 90% subsidy on premium for weather and pest loss cover.",
      hi: "मौसम और कीट नुकसान कवर पर प्रीमियम पर 90% तक छूट।",
    },
    Icon: "ShieldCheck",
  },
  {
    id: "kcc",
    title: { en: "Kisan Credit Card (KCC)", hi: "किसान क्रेडिट कार्ड (केसीसी)" },
    eligibility: {
      en: "Farmers owning cultivable land, tenant farmers, and SHGs.",
      hi: "कृषि भूमि धारक किसान, बटाईदार और स्वयं सहायता समूह।",
    },
    benefits: {
      en: "Low-interest credit up to ₹3 lakh at 4% p.a. for crop expenses.",
      hi: "फसल खर्च के लिए 4% वार्षिक ब्याज पर ₹3 लाख तक कम ब्याज क्रण।",
    },
    Icon: "CreditCard",
  },
  {
    id: "fertilizer-subsidy",
    title: { en: "Fertilizer Subsidy", hi: "उर्वरक सब्सिडी" },
    eligibility: {
      en: "All farmers purchasing urea and DAP through authorised dealers.",
      hi: "अधिकृत डीलरों से यूरिया और डीएपी खरीदने वाले सभी किसान।",
    },
    benefits: {
      en: "Subsidised urea at ₹266 per 45 kg bag and DAP at ₹1,350 per 50 kg bag.",
      hi: "अनुदानित यूरिया ₹266 प्रति 45 किग्रा बोरी और डीएपी ₹1,350 प्रति 50 किग्रा बोरी।",
    },
    Icon: "Sprout",
  },
];

export interface AdvisoryAlert {
  title: { en: string; hi: string };
  message: { en: string; hi: string };
  Icon: string;
}

export const advisoryAlerts: AdvisoryAlert[] = [
  {
    title: { en: "Weather Advisory", hi: "मौसम सलाह" },
    message: {
      en: "Light showers expected by evening. Avoid pesticide spraying today.",
      hi: "शाम तक हल्की बौछारें अपेक्षित। आज कीटनाशक छिड़काव से बचें।",
    },
    Icon: "CloudRain",
  },
  {
    title: { en: "Pest Alert", hi: "कीट चेतावनी" },
    message: {
      en: "Leaf rust risk detected in wheat. Inspect lower leaves and apply Trichoderma.",
      hi: "गेहूँ में पत्ती रतुआ जोखिम। निचली पत्तियाँ जाँचें और ट्राइकोडर्मा लगाएँ।",
    },
    Icon: "Bug",
  },
];

export interface FarmingTip {
  title: { en: string; hi: string };
  message: { en: string; hi: string };
}

export const farmingTips: FarmingTip[] = [
  {
    title: { en: "Irrigation", hi: "सिंचाई" },
    message: {
      en: "Delay watering by 2 days due to expected rain. Give light 25 mm on Friday.",
      hi: "वर्षा की संभावना से 2 दिन सिंचाई टालें। शुक्रवार को हल्की 25 मिमी दें।",
    },
  },
  {
    title: { en: "Fertilizer", hi: "खाद" },
    message: {
      en: "Apply urea after the rain at 40 kg per acre for wheat at crown stage.",
      hi: "वर्षा के बाद गेहूँ के क्राउन चरण पर 40 किग्रा प्रति एकड़ यूरिया डालें।",
    },
  },
  {
    title: { en: "Weeding", hi: "निराई" },
    message: {
      en: "Good day for manual weeding. Remove broadleaf weeds before they flower.",
      hi: "निराई के लिए अच्छा दिन। फूल आने से पहले चौड़ी पत्ती वाली खरपतवार हटाएँ।",
    },
  },
];
