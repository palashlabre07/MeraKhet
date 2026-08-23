import { api, withFallback } from "./api";

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  condition: { en: string; hi: string };
  humidity: number;
  humidityLabel: { en: string; hi: string };
  windSpeed: string;
  windDirection: { en: string; hi: string };
  rainChance: number;
  rainTiming: { en: string; hi: string };
  minTemp: number;
  maxTemp: number;
  icon: string;
}

export interface WeekForecast {
  day: { en: string; hi: string };
  temp: string;
  rain: string;
}

export interface WeatherForecast {
  today: WeatherData;
  week: WeekForecast[];
}

const mockForecast: WeatherForecast = {
  today: {
    temperature: 31,
    feelsLike: 34,
    condition: { en: "Partly cloudy, light showers by evening", hi: "आंशिक बादल, शाम तक हल्की बौछारें" },
    humidity: 68,
    humidityLabel: { en: "High", hi: "अधिक" },
    windSpeed: "12 km/h",
    windDirection: { en: "North-West", hi: "उत्तर-पश्चिम" },
    rainChance: 40,
    rainTiming: { en: "Evening", hi: "शाम" },
    minTemp: 24,
    maxTemp: 33,
    icon: "CloudSun",
  },
  week: [
    { day: { en: "Mon", hi: "सोम" }, temp: "31°", rain: "40%" },
    { day: { en: "Tue", hi: "मंगल" }, temp: "29°", rain: "80%" },
    { day: { en: "Wed", hi: "बुध" }, temp: "28°", rain: "65%" },
    { day: { en: "Thu", hi: "गुरु" }, temp: "32°", rain: "10%" },
    { day: { en: "Fri", hi: "शुक्र" }, temp: "33°", rain: "5%" },
  ],
};

export async function getWeatherForecast(location: string): Promise<WeatherForecast> {
  return withFallback(
    async () => (await api.get<WeatherForecast>(`/weather?location=${encodeURIComponent(location)}`)).data,
    () => mockForecast,
  );
}
