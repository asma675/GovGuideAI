import React, { useEffect, useState } from "react";
import Header from "./Header";
import PolicyInput from "./PolicyInput";
import ExplanationPanel from "./ExplanationPanel";
import "./styles.css";

// --- Simple text-to-speech helper ---
function speak(text, lang) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  if (!text) return;

  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "fr" ? "fr-CA" : "en-CA";
  window.speechSynthesis.speak(u);
}

// --- Rules-based demo analysis (no real AI call) ---
function analyzePolicy(raw) {
  const text = raw.replace(/\s+/g, " ").trim();

  // Basic sentence split
  const sentences = text
    .split(/[.!?]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const summary =
    sentences.slice(0, 3).join(". ") + (sentences.length ? "." : "");

  // Work line-by-line using original newlines
  const lines = raw
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  const pick = (regex) => lines.filter((l) => regex.test(l));

  const obligations = pick(
    /\b(must|shall|required|obligated|responsible|cannot|will be returned)\b/i
  );
  const eligibilityLines = pick(
    /\b(eligible|eligibility|admissible|requirement|must have|may count)\b/i
  );
  const documentLines = pick(
    /\b(document|documentation|proof|record|statement|certificate|photo|ID|identification)\b/i
  );
  const stepLines = pick(
    /\b(submit|apply|complete|sign|mail|send|provide|gather|collect|monitor|respond)\b/i
  );

  const eligibility =
    eligibilityLines.join(" ") ||
    "The policy mentions that eligibility is based on status and residency history. GovGuide AI would normally extract these into clear bullets.";

  const steps =
    stepLines.length > 0
      ? stepLines
      : [
          "Gather required documents.",
          "Complete and sign the correct government form.",
          "Submit the package through the official channel and keep copies."
        ];

  return {
    summary:
      summary ||
      "No clear summary detected. Try pasting a larger section of the policy.",
    obligations:
      obligations.length > 0
        ? obligations
        : [
            "Follow all instructions on the form carefully.",
            "Provide accurate, truthful information.",
            "Respond to government requests within the given deadlines."
          ],
    eligibility,
    documents:
      documentLines.length > 0
        ? documentLines
        : [
            "Proof of identity",
            "Proof of status (for example, permanent resident card or record)",
            "Proof of residency or presence in Canada (if applicable)"
          ],
    steps
  };
}

function App() {
  const [mode, setMode] = useState("text");
  const [rawInput, setRawInput] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Accessibility state
  const [lang, setLang] = useState("en");
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [plainMode, setPlainMode] = useState(true);

  // --- accessibility effects ---
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-scale",
      String(fontScale)
    );
  }, [fontScale]);

  const labels =
    {
      en: {
        a11yLabel: "Accessibility controls",
        langLabel: "Language",
        langEn: "English",
        langFr: "French",
        textSize: "Text size",
        smaller: "A-",
        bigger: "A+",
        contrast: "High contrast",
        contrastOn: "On",
        contrastOff: "Off",
        plainLabel: "Plain-language mode",
        plainOn: "On",
        plainOff: "Off",
        readPage: "Read this explanation aloud",
        analyze: "Analyze Policy",
        analyzing: "Analyzing…",
        footer: "Built by Asma Ahmed · Prototype for GovGuide AI",
        errorEmpty:
          "Please paste some policy text or a URL before running the demo."
      },
      fr: {
        a11yLabel: "Contrôles d’accessibilité",
        langLabel: "Langue",
        langEn: "Anglais",
        langFr: "Français",
        textSize: "Taille du texte",
        smaller: "A-",
        bigger: "A+",
        contrast: "Contraste élevé",
        contrastOn: "Activé",
        contrastOff: "Désactivé",
        plainLabel: "Mode langage simple",
        plainOn: "Activé",
        plainOff: "Désactivé",
        readPage: "Lire cette explication à voix haute",
        analyze: "Analyser la politique",
        analyzing: "Analyse…",
        footer: "Créé par Asma Ahmed · Prototype GovGuide IA",
        errorEmpty:
          "Veuillez coller un texte de politique ou une URL avant de lancer la démo."
      }
    }[lang];

  const handleAnalyze = async () => {
    setError("");
    if (!rawInput.trim()) {
      setError(labels.errorEmpty);
      return;
    }

    setIsLoading(true);
    try {
      let text = rawInput;

      // In URL mode we *could* fetch HTML, but for this demo
      // we just treat the URL as a label and still analyze rawInput.
      if (mode === "url") {
        text = rawInput;
      }

      const result = analyzePolicy(text);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while analyzing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReadExplanation = () => {
    if (!analysis) return;
    const pieces = [analysis.summary];
    if (!plainMode) {
      pieces.push(
        ...analysis.obligations,
        analysis.eligibility,
        ...analysis.documents,
        ...analysis.steps
      );
    }
    speak(pieces.join(". "), lang);
  };

  return (
    <div className="app-root">
      {/* glowing background */}
      <div className="glow-orbit glow-orbit-1" aria-hidden="true" />
      <div className="glow-orbit glow-orbit-2" aria-hidden="true" />
      <div className="glow-orbit glow-orbit-3" aria-hidden="true" />

      <Header />

      {/* accessibility bar */}
      <section className="a11y-toolbar" aria-label={labels.a11yLabel}>
        <div className="a11y-group">
          <span className="a11y-label">{labels.langLabel}</span>
          <button
            type="button"
            className={lang === "en" ? "pill active" : "pill"}
            onClick={() => setLang("en")}
          >
            {labels.langEn}
          </button>
          <button
            type="button"
            className={lang === "fr" ? "pill active" : "pill"}
            onClick={() => setLang("fr")}
          >
            {labels.langFr}
          </button>
        </div>

        <div className="a11y-group">
          <span className="a11y-label">{labels.textSize}</span>
          <button
            type="button"
            className="pill"
            onClick={() =>
              setFontScale((s) => Math.max(0.85, Number((s - 0.1).toFixed(2))))
            }
          >
            {labels.smaller}
          </button>
          <button
            type="button"
            className="pill"
            onClick={() =>
              setFontScale((s) => Math.min(1.4, Number((s + 0.1).toFixed(2))))
            }
          >
            {labels.bigger}
          </button>
        </div>

        <div className="a11y-group">
          <span className="a11y-label">{labels.contrast}</span>
          <button
            type="button"
            className={highContrast ? "pill active" : "pill"}
            onClick={() => setHighContrast((c) => !c)}
          >
            {highContrast ? labels.contrastOn : labels.contrastOff}
          </button>
        </div>

        <div className="a11y-group">
          <span className="a11y-label">{labels.plainLabel}</span>
          <button
            type="button"
            className={plainMode ? "pill active" : "pill"}
            onClick={() => setPlainMode((p) => !p)}
          >
            {plainMode ? labels.plainOn : labels.plainOff}
          </button>
        </div>

        <div className="a11y-group">
          <button
            type="button"
            className="pill"
            disabled={!analysis}
            onClick={handleReadExplanation}
          >
            🔊 {labels.readPage}
          </button>
        </div>
      </section>

      <main className="layout">
        <section className="card card-input">
          <PolicyInput
            lang={lang}
            mode={mode}
            setMode={setMode}
            rawInput={rawInput}
            setRawInput={setRawInput}
          />

          {error && <div className="error-banner">{error}</div>}

          <button
            type="button"
            className="primary-button"
            onClick={handleAnalyze}
            disabled={isLoading}
          >
            {isLoading ? labels.analyzing : labels.analyze}
          </button>

          <p className="demo-note">
            Demo only · Does not make legal decisions · Uses simple
            rules-based analysis.
          </p>
        </section>

        <ExplanationPanel
          lang={lang}
          analysis={analysis}
          plainMode={plainMode}
        />
      </main>

      <footer className="footer">
        <p>{labels.footer}</p>
      </footer>
    </div>
  );
}

export default App;
