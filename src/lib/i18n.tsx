import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "hi";

const dict = {
  appName: { en: "Fasal Saathi", hi: "फसल साथी" },
  tagline: {
    en: "AI Powered Farm-to-Market Assistant",
    hi: "एआई संचालित खेत-से-बाज़ार सहायक",
  },
  brand: { en: "MeraKeth", hi: "मेरा खेत" },
  login: { en: "Login", hi: "लॉगिन" },
  register: { en: "Register", hi: "पंजीकरण" },
  chooseLanguage: { en: "Choose your language", hi: "अपनी भाषा चुनें" },
  regTitle: { en: "Farmer Registration", hi: "किसान पंजीकरण" },
  regSub: { en: "Fill your details to get started", hi: "शुरू करने के लिए विवरण भरें" },
  farmerName: { en: "Farmer Name", hi: "किसान का नाम" },
  mobile: { en: "Mobile Number", hi: "मोबाइल नंबर" },
  email: { en: "Email (optional)", hi: "ईमेल (वैकल्पिक)" },
  password: { en: "Password", hi: "पासवर्ड" },
  state: { en: "State", hi: "राज्य" },
  district: { en: "District", hi: "ज़िला" },
  village: { en: "Village", hi: "गाँव" },
  landSize: { en: "Land Size", hi: "भूमि का आकार" },
  acres: { en: "Acres", hi: "एकड़" },
  hectares: { en: "Hectares", hi: "हेक्टेयर" },
  primaryCrop: { en: "Primary Crop", hi: "मुख्य फसल" },
  preferredLanguage: { en: "Preferred Language", hi: "पसंदीदा भाषा" },
  continueBtn: { en: "Continue", hi: "आगे बढ़ें" },
  select: { en: "Select", hi: "चुनें" },
  budgetTitle: { en: "Set Your Crop Budget", hi: "अपनी फसल का बजट तय करें" },
  budgetQ: {
    en: "What is your estimated budget for this crop season?",
    hi: "इस फसल सीज़न के लिए आपका अनुमानित बजट क्या है?",
  },
  custom: { en: "Custom Amount", hi: "अपनी राशि" },
  spendPlan: { en: "Your spending plan", hi: "आपकी खर्च योजना" },
  seeds: { en: "Seeds", hi: "बीज" },
  fertilizer: { en: "Fertilizer", hi: "खाद" },
  irrigation: { en: "Irrigation", hi: "सिंचाई" },
  pesticide: { en: "Pesticide", hi: "कीटनाशक" },
  labour: { en: "Labour", hi: "मज़दूरी" },
  saveBudget: { en: "Save Budget and Continue", hi: "बजट सहेजें और आगे बढ़ें" },
  step: { en: "Step", hi: "चरण" },
  of: { en: "of", hi: "में से" },
  total: { en: "Total budget", hi: "कुल बजट" },
} as const;

export type Key = keyof typeof dict;

export const crops = [
  { en: "Wheat", hi: "गेहूँ" },
  { en: "Rice", hi: "चावल" },
  { en: "Soybean", hi: "सोयाबीन" },
  { en: "Cotton", hi: "कपास" },
  { en: "Tomato", hi: "टमाटर" },
  { en: "Sugarcane", hi: "गन्ना" },
  { en: "Maize", hi: "मक्का" },
  { en: "Mustard", hi: "सरसों" },
];

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("fs-lang");
    if (stored === "hi" || stored === "en") setLang(stored);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("fs-lang", lang);
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  const t = (key: Key) => dict[key][lang];
  return { lang, setLang, t };
}
