// components/Layout.js
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Simple bilingual dictionary (expand later)
const translations = {
  en: {
    home: "Home",
    dashboard: "Dashboard",
    tasks: "Tasks",
    settings: "Settings",
    about: "About",
    contact: "Contact",
    plainLanguage: "Plain Language",
    contrast: "High Contrast",
    textSize: "Text Size",
    language: "Language",
    reading: "Reading aloud…"
  },
  fr: {
    home: "Accueil",
    dashboard: "Tableau de bord",
    tasks: "Tâches",
    settings: "Paramètres",
    about: "À propos",
    contact: "Contact",
    plainLanguage: "Langage simple",
    contrast: "Contraste élevé",
    textSize: "Taille du texte",
    language: "Langue",
    reading: "Lecture en cours…"
  }
};

export default function Layout({ children }) {
  const router = useRouter();

  // Accessibility states
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [plainLanguage, setPlainLanguage] = useState(false);
  const [lang, setLang] = useState("en");

  // ARIA live region message
  const [announcement, setAnnouncement] = useState("");

  // Persist settings
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("a11y-settings") || "{}");
    setHighContrast(saved.highContrast || false);
    setLargeText(saved.largeText || false);
    setPlainLanguage(saved.plainLanguage || false);
    setLang(saved.lang || "en");
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "a11y-settings",
      JSON.stringify({ highContrast, largeText, plainLanguage, lang })
    );
  }, [highContrast, largeText, plainLanguage, lang]);

  // TTS
  function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = lang === "en" ? "en-US" : "fr-FR";
    speechSynthesis.speak(msg);
    setAnnouncement(translations[lang].reading);
  }

  // Dynamic classes applied to <body>
  useEffect(() => {
    const body = document.body;
    body.classList.toggle("high-contrast", highContrast);
    body.classList.toggle("large-text", largeText);
    body.classList.toggle("plain-language", plainLanguage);
    body.setAttribute("lang", lang);
  }, [highContrast, largeText, plainLanguage, lang]);

  const t = translations[lang];

  return (
    <div>
      {/* Screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-live-region"
      >
        {announcement}
      </div>

      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header
        className="header"
        role="banner"
        aria-label="Application header"
      >
        <h1 className="logo">FocusFlow – Accessible Edition</h1>

        <nav role="navigation" aria-label="Main navigation" className="nav">
          <Link href="/" className="nav-item"> {t.home} </Link>
          <Link href="/dashboard" className="nav-item"> {t.dashboard} </Link>
          <Link href="/add-task" className="nav-item"> {t.tasks} </Link>
          <Link href="/settings" className="nav-item"> {t.settings} </Link>
          <Link href="/about" className="nav-item"> {t.about} </Link>
          <Link href="/contact" className="nav-item"> {t.contact} </Link>
        </nav>

        {/* A11y Controls */}
        <div className="a11y-controls" role="group" aria-label="Accessibility controls">
          <button onClick={() => setHighContrast(!highContrast)}>
            {t.contrast}
          </button>
          <button onClick={() => setLargeText(!largeText)}>
            {t.textSize}
          </button>
          <button onClick={() => setPlainLanguage(!plainLanguage)}>
            {t.plainLanguage}
          </button>
          <button onClick={() => setLang(lang === "en" ? "fr" : "en")}>
            {t.language}: {lang.toUpperCase()}
          </button>
          <button onClick={() => speak(document.title)}>🔊 Read Page</button>
        </div>
      </header>

      <main
        id="main-content"
        role="main"
        tabIndex="-1"
        className="main-content"
      >
        {children}
      </main>
    </div>
  );
}
