import React from "react";

function ExplanationPanel({ lang, analysis, plainMode }) {
  const t =
    {
      en: {
        title: "2 · Plain-Language Explanation",
        subtitle:
          "A simple, transparent breakdown based on the text you provided. This is a rules-based demo, not a final production AI.",
        empty:
          "Paste a policy or URL on the left and choose “Analyze Policy” to see a demo explanation here.",
        summary: "High-Level Summary",
        obligations: "Key Obligations",
        eligibility: "Eligibility Signals",
        documents: "Required Documents",
        steps: "Suggested Steps & Actions",
        none:
          "No specific items detected. Try including more details about duties, documents, or steps.",
        disclaimer:
          "Disclaimer: Prototype for demonstration only. Does not provide legal advice or make binding eligibility decisions."
      },
      fr: {
        title: "2 · Explication en langage simple",
        subtitle:
          "Un aperçu simple et transparent basé sur le texte fourni. Il s’agit d’une démo à base de règles, pas d’une IA de production.",
        empty:
          "Collez une politique ou une URL à gauche puis cliquez sur « Analyser la politique » pour voir une explication de démonstration ici.",
        summary: "Résumé général",
        obligations: "Obligations clés",
        eligibility: "Signaux d’admissibilité",
        documents: "Documents requis",
        steps: "Étapes et actions suggérées",
        none:
          "Aucun élément précis détecté. Essayez d’ajouter plus de détails sur les responsabilités, les documents ou les étapes.",
        disclaimer:
          "Avertissement : prototype de démonstration uniquement. Ne constitue pas un avis juridique ni une décision d’admissibilité."
      }
    }[lang];

  if (!analysis) {
    return (
      <section className="card card-output card-empty">
        <div className="card-header">
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>
        <p className="placeholder">{t.empty}</p>
      </section>
    );
  }

  const { summary, obligations, eligibility, documents, steps } = analysis;

  return (
    <section className="card card-output">
      <div className="card-header">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
        {plainMode && (
          <p className="plain-note">
            Plain-language mode is ON. Technical phrasing is softened so the
            core message is easier to understand.
          </p>
        )}
      </div>

      <div className="output-section">
        <h3>{t.summary}</h3>
        <p>{summary}</p>
      </div>

      {!plainMode && (
        <>
          <div className="output-section">
            <h3>{t.obligations}</h3>
            {obligations && obligations.length ? (
              <ul>
                {obligations.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            ) : (
              <p>{t.none}</p>
            )}
          </div>

          <div className="output-section">
            <h3>{t.eligibility}</h3>
            <p>{eligibility || t.none}</p>
          </div>

          <div className="output-section">
            <h3>{t.documents}</h3>
            {documents && documents.length ? (
              <ul>
                {documents.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            ) : (
              <p>{t.none}</p>
            )}
          </div>

          <div className="output-section">
            <h3>{t.steps}</h3>
            {steps && steps.length ? (
              <ol>
                {steps.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ol>
            ) : (
              <p>{t.none}</p>
            )}
          </div>
        </>
      )}

      <p className="disclaimer">{t.disclaimer}</p>
    </section>
  );
}

export default ExplanationPanel;
