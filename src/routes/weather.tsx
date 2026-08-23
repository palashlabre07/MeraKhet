import { createFileRoute } from "@tanstack/react-router";
import { CloudSun, CloudRain, Thermometer, Droplets, Wind, Tractor } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card, Screen, ScreenHeader } from "@/components/screen";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/weather")({
  head: () => ({
    meta: [
      { title: "Weather Forecast — MeraKeth" },
      {
        name: "description",
        content: "Today's weather, rain prediction, humidity and wind speed with a farming suggestion.",
      },
      { property: "og:title", content: "Weather Forecast — MeraKeth" },
      {
        property: "og:description",
        content: "Rain prediction, temperature, humidity and wind for your village today.",
      },
    ],
  }),
  component: WeatherScreen,
});

function WeatherScreen() {
  const { lang } = useLang();
  const tr = (en: string, hi: string) => (lang === "hi" ? hi : en);

  const stats = [
    { en: "Temperature", hi: "तापमान", value: "31°C", sub: tr("Feels 34°C", "महसूस 34°C"), Icon: Thermometer },
    { en: "Humidity", hi: "आर्द्रता", value: "68%", sub: tr("High", "अधिक"), Icon: Droplets },
    { en: "Wind Speed", hi: "हवा की गति", value: "12 km/h", sub: tr("North-West", "उत्तर-पश्चिम"), Icon: Wind },
    { en: "Rain Chance", hi: "वर्षा संभावना", value: "40%", sub: tr("Evening", "शाम"), Icon: CloudRain },
  ];

  const week = [
    { en: "Mon", hi: "सोम", t: "31°", r: "40%" },
    { en: "Tue", hi: "मंगल", t: "29°", r: "80%" },
    { en: "Wed", hi: "बुध", t: "28°", r: "65%" },
    { en: "Thu", hi: "गुरु", t: "32°", r: "10%" },
    { en: "Fri", hi: "शुक्र", t: "33°", r: "5%" },
  ];

  return (
    <>
      <Screen>
        <ScreenHeader
          title={tr("Weather", "मौसम")}
          subtitle={tr("Sehore, Madhya Pradesh", "सीहोर, मध्य प्रदेश")}
        />

        <div
          className="rounded-2xl p-6 text-primary-foreground"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold opacity-90">{tr("Today's Weather", "आज का मौसम")}</p>
              <p className="mt-1 text-5xl font-extrabold">31°C</p>
              <p className="mt-1 text-base opacity-95">
                {tr("Partly cloudy, light showers by evening", "आंशिक बादल, शाम तक हल्की बौछारें")}
              </p>
            </div>
            <CloudSun className="h-16 w-16 opacity-90" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {stats.map(({ en, hi, value, sub, Icon }) => (
            <Card key={en}>
              <Icon className="h-7 w-7 text-primary" />
              <p className="mt-2 text-sm font-semibold text-muted-foreground">{tr(en, hi)}</p>
              <p className="text-2xl font-extrabold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-4">
          <p className="mb-3 text-lg font-bold text-foreground">
            {tr("Rain Prediction — 5 Days", "वर्षा पूर्वानुमान — 5 दिन")}
          </p>
          <div className="flex justify-between">
            {week.map((d) => (
              <div key={d.en} className="flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-muted-foreground">{tr(d.en, d.hi)}</span>
                <CloudRain className="h-6 w-6 text-primary" />
                <span className="text-sm font-bold text-foreground">{d.t}</span>
                <span className="text-xs text-muted-foreground">{d.r}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mt-4 border-2 border-primary">
          <p className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Tractor className="h-5 w-5 text-primary" /> {tr("Today's Farming Suggestion", "आज की खेती सलाह")}
          </p>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            {tr(
              "Avoid spraying pesticide today — evening showers will wash it away. Good day for weeding and preparing fertilizer for after the rain.",
              "आज कीटनाशक का छिड़काव न करें — शाम की बौछारें उसे बहा देंगी। निराई और वर्षा के बाद खाद तैयार करने के लिए अच्छा दिन है।",
            )}
          </p>
        </Card>
      </Screen>
      <BottomNav />
    </>
  );
}
