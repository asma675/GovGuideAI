import React from "react";

function ExplanationPanel({ analysis, lang = "en", plainMode }) {
  const strings =
    {
      en: {
        title: "2 · Plain-Language Explanation",
        intro:
          "Run an analysis to see summary, obligations, eligibility, documents, and next steps.",
        emptyBody:
          "Once you click Analyze Policy, this panel will show a plain-language breakdown and checklists you can use in your video demo.",
        summaryHeading: "High-Level Summary",
        obligationsHeading: "Key Obligations & Responsibilities",
        eligibilityHeading: "Eligibility Signals",
        documentsHeading: "Documents & Proof Mentioned",
        stepsHeading: "Suggested Next Steps",
        none:
          "No items detected. Try including more specific sentences about duties, eligibility, or steps.",
        disclaimerTitle: "Disclaimer:",
        disclaimerBody:
          "This is a prototype for demonstration only. It does not provide legal advice or make binding eligibility decisions.",
      },
      fr: {
        title: "2 · Explication en langage simple",
        intro:
          "Lancez une analyse pour voir le résumé, les obligations, l'admissibilité, les documents et les prochaines étapes.",
        emptyBody:
          "Une fois que vous aurez cliqué sur Analyser le texte, ce panneau affichera une explication en langage simple et des listes de contrôle pour votre démonstration.",
        summaryHeading: "Résumé général",
        obligationsHeading: "Principales obligations et responsabilités",
        eligibilityHeading: "Indications d’admissibilité",
        documentsHeading: "Documents et preuves mentionnés",
        stepsHeading: "Prochaines étapes suggérées",
        none:
          "Aucun élément détecté. Essayez d'ajouter des phrases plus précises concernant les obligations, l'admissibilité ou les étapes.",
        disclaimerTitle: "Avertissement :",
        disclaimerBody:
          "Il s'agit d'un prototype à des fins de démonstration uniquement. Il ne fournit pas de conseils juridiques ni de décisions d'admissibilité.",
      },
    }[lang];

  if (!analysis) {
    return (
      <section className="card card-output card-empty">
        <div className="card-header">
          <h2>{strings.title}</h2>
          <p>{strings.intro}</p>
        </div>
        <div className="empty-state">
          <p>{strings.emptyBody}</p>
        </div>
      </section>
    );
  }

  const { summary, obligations, eligibility, documents, steps } = analysis;

  return (
    <section className="card card-output">
      <div className="card-header">
        <h2>{strings.title}</h2>
        <p>{strings.intro}</p>
      </div>

      <div className="output-section">
        <h3>{strings.summaryHeading}</h3>
        <p>{summary}</p>
      </div>

      {!plainMode && (
        <>
          <div className="output-section">
            <h3>{strings.obligationsHeading}</h3>
            {obligations && obligations.length ? (
              <ul>
                {obligations.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            ) : (
              <p>{strings.none}</p>
            )}
          </div>

          <div className="output-section">
            <h3>{strings.eligibilityHeading}</h3>
            {eligibility && eligibility.length ? (
              <ul>
                {eligibility.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            ) : (
              <p>{strings.none}</p>
            )}
          </div>

          <div className="output-section">
            <h3>{strings.documentsHeading}</h3>
            {documents && documents.length ? (
              <ul>
                {documents.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            ) : (
              <p>{strings.none}</p>
            )}
          </div>

          <div className="output-section">
            <h3>{strings.stepsHeading}</h3>
            {steps && steps.length ? (
              <ol>
                {steps.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ol>
            ) : (
              <p>{strings.none}</p>
            )}
          </div>
        </>
      )}

      <div className="disclaimer">
        <p>
          <strong>{strings.disclaimerTitle}</strong> {strings.disclaimerBody}
        </p>
      </div>
    </section>
  );
}

export default ExplanationPanel;
