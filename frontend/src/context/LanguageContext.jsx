import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN",
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
};
