import { useLanguage } from "../context/LanguageContext.jsx";
import { translateText } from "../api/translationApi.js";
import { useState } from "react";

const cache = {};

export default function useTranslate() {
  const { language } = useLanguage();

  const [loading, setLoading] = useState(false);

  const translate = async (text) => {
    if (language === "EN") {
      return text;
    }

    const key = `${language}-${text}`;

    if (cache[key]) {
      return cache[key];
    }

    try {
      setLoading(true);

      const result = await translateText(text, "Amharic");

      cache[key] = result;

      return result;
    } catch (error) {
      console.log(error);

      return text;
    } finally {
      setLoading(false);
    }
  };

  return {
    translate,
    loading,
    language,
  };
}
