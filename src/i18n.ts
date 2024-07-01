import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTrans from "./locales/en.json";
import zhTrans from "./locales/zh.json";

const resources = {
  en: {
    translation: enTrans
  },
  zh: {
    translation: zhTrans
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;