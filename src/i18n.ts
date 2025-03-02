/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJson from "./locale/en.json";
import mmJson from "./locale/mm.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translations: enJson },
    mm: { translations: mmJson },
  },
  lng: "en",
  fallbackLng: "mm",
  interpolation: { escapeValue: false },
});
export default i18n;
