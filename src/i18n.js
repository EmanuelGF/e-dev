import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./Languages/en.json";
import pt from "./Languages/pt.json";

const STORAGE_KEY = "emanuel-dev.language";

function getInitialLanguage() {
  if (typeof window === "undefined") {
    return "en";
  }

  const savedLanguage = window.localStorage.getItem(STORAGE_KEY);

  return savedLanguage === "pt" ? "pt" : "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

i18n.on("languageChanged", (language) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, language);
  }
});

export default i18n;
