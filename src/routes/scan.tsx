import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Camera, Leaf, FlaskConical, TriangleAlert as AlertTriangle } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card, Screen, ScreenHeader } from "@/components/screen";
import { useLang } from "@/lib/i18n";
import { detectDisease, type DiseaseResult } from "@/services/diseaseService";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Crop Disease Scan — MeraKeth" },
      {
        name: "description",
        content: "Scan a crop leaf photo to detect disease and get organic and chemical treatment advice.",
      },
      { property: "og:title", content: "Crop Disease Scan — MeraKeth" },
      {
        property: "og:description",
        content: "Detect crop disease from a photo and get treatment advice.",
      },
    ],
  }),
  component: ScanScreen,
});

function ScanScreen() {
  const { lang } = useLang();
  const tr = (en: string, hi: string) => (lang === "hi" ? hi : en);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [loading, setLoading] = useState(false);

  const pick = (capture: boolean) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    if (capture) input.setAttribute("capture", "environment");
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        setImage(URL.createObjectURL(file));
        setLoading(true);
        detectDisease(file).then((r) => {
          setResult(r);
          setLoading(false);
        });
      }
    };
    input.click();
  };

  const confidencePct = result?.confidence ?? 94;
  const diseaseName = result?.diseaseName ?? { en: "Leaf Rust (Puccinia triticina)", hi: "पत्ती रतुआ (पक्सीनिया ट्रिटिसिना)" };
  const organic = result?.organicTreatment ?? [
    { en: "Spray neem oil 5 ml per litre of water, early morning.", hi: "नीम तेल 5 मिली प्रति लीटर पानी, सुबह छिड़कें।" },
    { en: "Apply Trichoderma-based bio-fungicide every 10 days.", hi: "हर 10 दिन में ट्राइकोडर्मा जैव-फफूंदनाशी डालें।" },
  ];
  const chemical = result?.chemicalTreatment ?? [
    { en: "Propiconazole 25% EC — 1 ml per litre of water.", hi: "प्रोपिकोनाज़ोल 25% EC — 1 मिली प्रति लीटर पानी।" },
    { en: "Repeat after 15 days. Wear mask and gloves.", hi: "15 दिन बाद दोहराएँ। मास्क और दस्ताने पहनें।" },
  ];

  return (
    <>
      <Screen>
        <ScreenHeader
          title={tr("Disease Scan", "रोग स्कैन")}
          subtitle={tr("Take or upload a leaf photo", "पत्ती की फोटो लें या अपलोड करें")}
        />

        <div className="flex h-56 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-primary bg-secondary">
          {image ? (
            <img src={image} alt="Selected crop leaf" className="h-full w-full object-cover" />
          ) : (
            <p className="px-6 text-center text-base font-semibold text-muted-foreground">
              {tr("No image selected yet", "अभी कोई फोटो नहीं चुनी")}
            </p>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => pick(false)}
            className="flex h-16 items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-card text-lg font-bold text-primary"
          >
            <Upload className="h-5 w-5" /> {tr("Upload", "अपलोड")}
          </button>
          <button
            type="button"
            onClick={() => pick(true)}
            className="flex h-16 items-center justify-center gap-2 rounded-2xl text-lg font-bold text-primary-foreground"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-card)" }}
          >
            <Camera className="h-5 w-5" /> {tr("Camera", "कैमरा")}
          </button>
        </div>

        <h2 className="mb-3 mt-8 text-xl font-bold text-foreground">
          {tr("Scan Result", "स्कैन परिणाम")}
        </h2>

        <Card>
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-muted-foreground">
                {tr("Disease Name", "रोग का नाम")}
              </p>
              <p className="text-xl font-extrabold text-foreground">
                {loading ? tr("Analyzing...", "विश्लेषण...") : tr(diseaseName.en, diseaseName.hi)}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm font-semibold text-muted-foreground">
              <span>{tr("Confidence", "विश्वसनीयता")}</span>
              <span className="text-primary">{confidencePct}%</span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full"
                style={{ width: `${confidencePct}%`, background: "var(--gradient-primary)" }}
              />
            </div>
          </div>
        </Card>

        <Card className="mt-4">
          <p className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Leaf className="h-5 w-5 text-primary" /> {tr("Organic Treatment", "जैविक उपचार")}
          </p>
          <ul className="mt-2 space-y-2 text-base leading-relaxed text-muted-foreground">
            {organic.map((item, i) => (
              <li key={i}>{tr(item.en, item.hi)}</li>
            ))}
          </ul>
        </Card>

        <Card className="mt-4">
          <p className="flex items-center gap-2 text-lg font-bold text-foreground">
            <FlaskConical className="h-5 w-5 text-primary" /> {tr("Chemical Treatment", "रासायनिक उपचार")}
          </p>
          <ul className="mt-2 space-y-2 text-base leading-relaxed text-muted-foreground">
            {chemical.map((item, i) => (
              <li key={i}>{tr(item.en, item.hi)}</li>
            ))}
          </ul>
        </Card>
      </Screen>
      <BottomNav />
    </>
  );
}
