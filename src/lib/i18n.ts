import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/locales/en.json";
import am from "@/locales/am.json";
import om from "@/locales/om.json";
import ti from "@/locales/ti.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "am", label: "Amharic", native: "አማርኛ" },
  { code: "om", label: "Afan Oromo", native: "Afaan Oromoo" },
  { code: "ti", label: "Tigrigna", native: "ትግርኛ" },
] as const;

export type LangCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        am: { translation: am },
        om: { translation: om },
        ti: { translation: ti },
      },
      fallbackLng: "en",
      supportedLngs: ["en", "am", "om", "ti"],
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "temariflow-lang",
      },
    });
}

export default i18n;
