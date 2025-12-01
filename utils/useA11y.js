// hooks/useA11y.js
import { useEffect, useState } from "react";
import { getTheme } from "@/theme/theme";

export function useA11y() {
  const [settings, setSettings] = useState({
    lang: "en",
    highContrast: false,
    largeText: false,
    plainLanguage: false,
    theme: "dark-glow",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("a11y-settings") || "{}");
    const theme = getTheme();

    setSettings({
      lang: saved.lang || "en",
      highContrast: saved.highContrast || false,
      largeText: saved.largeText || false,
      plainLanguage: saved.plainLanguage || false,
      theme: theme,
    });
  }, []);

  return settings;
}
