import React, { useEffect, useState } from "react";
import Header from "./Header";
import PolicyInput from "./PolicyInput";
import ExplanationPanel from "./ExplanationPanel";

// Simple text-to-speech helper
function speak(text, lang) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "fr" ? "fr-CA" : "en-CA";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

// Rules-based demo “analysis” (same idea as your original)
function analyzePolicy(text) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const sentences = cleaned
    .split(/[.!?]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const summary =
    sentences.slice(0, 3).join(". ") + (sentences.length ? "." : "");

  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  const pick = (regex) => lines.filter((l) => regex.test(l));

  const obligations = pick(/must|shall|required|obligated|responsible/i);
  const eligibility = pick(/eligible|eligibility|must be|may apply|qualif/i);
  const documents = pick(
    /proof|certificate|ID|identification|supporting document|documentation|records/i
  );
  const steps = pick(
    /submit|apply|complete|fill out|sign|upload|send|provide|monitor|respond/i
  );

  return {
    summary: summary || "No clear summary detected. Try adding more text.",
    obligations,
    eligibility,
    documents,
    steps,
  };
}

function App() {
  const [mode, setMode] = useState("text");
  const [rawInput, setRawInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  // Accessibility state
  const [lang, setLang] = useState("en");
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [plainMode, setPlainMode] = useState(true);

  // Apply high-contrast class to <body>
  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  // Apply scalable font size via CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-scale",
      String(fontScale)
    );
  }, [fontScale]);

  const handleAnalyze = async () => {
    setError("");
    if (!rawInput.trim()) {
      setError(
        lang === "fr"
          ? "Veuillez d'abord coller un texte de politique ou une URL."
          : "Please paste some policy text or a URL first."
      );
      return;
    }

    setIsLoading(true);
    try {
      let text = rawInput;

      // Optional URL mode (same idea as before)
      if (mode === "url") {
        try {
          const response = await fetch(rawInput);
          const html = await response.text();
          text = html.replace(/<[^>]+>/g, " ");
        } catch (e) {
          console.warn("Fetch failed, using URL as text only.");
          text = rawInput;
        }
      }

      const result = analyzePolicy(text);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      setError(
        lang === "fr"
          ? "Une erreur s'est produite pendant l'analyse. Veuillez réessayer."
          : "Something went wrong while analyzing. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Read-aloud button handler
  const handleReadAloud = () => {
    if (!analysis) return;
    const parts = [analysis.summary];

    // If plain-language mode is OFF, also read detailed lists
    if (!plainMode) {
      parts.push(
        ...analysis.obligations,
        ...analysis.eligibility,
        ...analysis.documents,
        ...analysis.steps
      );
    }

    const text = parts.join(". ");
    speak(text, lang);
  };

  const strings =
    {
      en: {
        step1Title: "1 · Select Input Type",
        step1Desc:
          "Paste a policy, regulation, or form instructions to translate into plain language.",
        pastePolicy: "Paste Policy Text",
        urlBeta: "URL (beta)",
        analyze: "Analyze Policy",
        analyzing: "Analyzing…",
        a11yLabel: "Accessibility controls",
        langLabel: "Language",
        langEn: "English",
        langFr: "French",
        contrast: "High Contrast",
        contrastOn: "On",
        contrastOff: "Off",
        textSize: "Text Size",
        smaller: "A-",
        bigger: "A+",
        plainLabel: "Plain-language mode",
        plainOn: "On",
        plainOff: "Off",
        readAloud: "Read explanation aloud",
        footer: "Built by Asma Ahmed · Prototype for GovGuide AI",
      },
      fr: {
        step1Title: "1 · Choisir le type d'entrée",
        step1Desc:
          "Collez une politique, un règlement ou des instructions de formulaire à traduire en langage simple.",
        pastePolicy: "Coller le texte de la politique",
        urlBeta: "URL (bêta)",
        analyze: "Analyser le texte",
        analyzing: "Analyse…",
        a11yLabel: "Contrôles d’accessibilité",
        langLabel: "Langue",
        langEn: "Anglais",
        langFr: "Français",
        contrast: "Contraste élevé",
        contrastOn: "Activé",
        contrastOff: "Désactivé",
        textSize: "Taille du texte",
        smaller: "A-",
        bigger: "A+",
        plainLabel: "Mode langage simple",
        plainOn: "Activé",
        plainOff: "Désactivé",
        readAloud: "Lire l’explication à voix haute",
        footer: "Créé par Asma Ahmed · Prototype GovGuide IA",
      },
    }[lang];

  return (
    <div className="app-root">
      {/* existing glow background */}
      <div className="glow-orbit glow-orbit-1" />
      <div className="glow-orbit glow-orbit-2" />
      <div className="glow-orbit glow-orbit-3" />

      <Header lang={lang} />

      {/* Accessibility bar */}
      <section className="a11y-toolbar" aria-label={strings.a11yLabel}>
        <div className="a11y-group">
          <span className="a11y-label">{strings.langLabel}</span>
          <button
            type="button"
            className={lang === "en" ? "pill active" : "pill"}
            onClick={() => setLang("en")}
          >
            {strings.langEn}
          </button>
          <button
            type="button"
            className={lang === "fr" ? "pill active" : "pill"}
            onClick={() => setLang("fr")}
          >
            {strings.langFr}
          </button>
        </div>

        <div className="a11y-group">
          <span className="a11y-label">{strings.textSize}</span>
          <button
            type="button"
            className="pill"
            onClick={() =>
              setFontScale((s) => Math.max(0.85, Number((s - 0.1).toFixed(2))))
            }
          >
            {strings.smaller}
          </button>
          <button
            type="button"
            className="pill"
            onClick={() =>
              setFontScale((s) => Math.min(1.4, Number((s + 0.1).toFixed(2))))
            }
          >
            {strings.bigger}
          </button>
        </div>

        <div className="a11y-group">
          <span className="a11y-label">{strings.contrast}</span>
          <button
            type="button"
            className={highContrast ? "pill active" : "pill"}
            onClick={() => setHighContrast((c) => !c)}
          >
            {highContrast ? strings.contrastOn : strings.contrastOff}
          </button>
        </div>

        <div className="a11y-group">
          <span className="a11y-label">{strings.plainLabel}</span>
          <button
            type="button"
            className={plainMode ? "pill active" : "pill"}
            onClick={() => setPlainMode((p) => !p)}
          >
            {plainMode ? strings.plainOn : strings.plainOff}
          </button>
        </div>

        <div className="a11y-group">
          <button
            type="button"
            className="pill"
            onClick={handleReadAloud}
            disabled={!analysis}
          >
            🔊 {strings.readAloud}
          </button>
        </div>
      </section>

      <main className="layout">
        <section className="card card-input">
          <div className="card-header">
            <h2>{strings.step1Title}</h2>
            <p>{strings.step1Desc}</p>
          </div>

          <div className="mode-toggle">
            <button
              type="button"
              className={mode === "text" ? "pill active" : "pill"}
              onClick={() => setMode("text")}
            >
              {strings.pastePolicy}
            </button>
            <button
              type="button"
              className={mode === "url" ? "pill active" : "pill"}
              onClick={() => setMode("url")}
            >
              {strings.urlBeta}
            </button>
          </div>

          <PolicyInput
            mode={mode}
            value={rawInput}
            onChange={setRawInput}
            lang={lang}
          />

          {error && <div className="error-banner">{error}</div>}

          <button
            type="button"
            className="primary-button"
            onClick={handleAnalyze}
            disabled={isLoading}
          >
            {isLoading ? strings.analyzing : strings.analyze}
          </button>
        </section>

        <ExplanationPanel analysis={analysis} lang={lang} plainMode={plainMode} />
      </main>

      <footer className="footer">
        <p>{strings.footer}</p>
      </footer>
    </div>
  );
}

export default App;
