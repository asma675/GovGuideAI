import React from "react";

function PolicyInput({ lang, mode, setMode, rawInput, setRawInput }) {
  const t =
    {
      en: {
        stepTitle: "1 · Select Input Type",
        stepDesc:
          "Paste a policy, regulation, or form instructions to translate into plain language.",
        tabText: "Paste Policy Text",
        tabUrl: "URL (beta)",
        labelText:
          "Paste policy, regulation text, or form instructions",
        labelUrl: "Paste a public government URL",
        placeholderText:
          "Once submitted, applicants must monitor their online account or mailbox for correspondence...",
        placeholderUrl: "https://www.canada.ca/…"
      },
      fr: {
        stepTitle: "1 · Choisir le type d’entrée",
        stepDesc:
          "Collez un texte de politique, règlement ou des instructions de formulaire à traduire en langage simple.",
        tabText: "Texte de politique",
        tabUrl: "URL (bêta)",
        labelText:
          "Collez le texte de politique, de règlement ou les instructions du formulaire",
        labelUrl: "Collez une URL gouvernementale publique",
        placeholderText:
          "Une fois la demande soumise, les demandeurs doivent surveiller leur compte en ligne ou leur boîte aux lettres...",
        placeholderUrl: "https://www.canada.ca/fr/…"
      }
    }[lang];

  return (
    <>
      <div className="card-header">
        <h2>{t.stepTitle}</h2>
        <p>{t.stepDesc}</p>
      </div>

      <div className="mode-toggle" role="tablist">
        <button
          type="button"
          role="tab"
          className={mode === "text" ? "pill active" : "pill"}
          aria-selected={mode === "text"}
          onClick={() => setMode("text")}
        >
          {t.tabText}
        </button>
        <button
          type="button"
          role="tab"
          className={mode === "url" ? "pill active" : "pill"}
          aria-selected={mode === "url"}
          onClick={() => setMode("url")}
        >
          {t.tabUrl}
        </button>
      </div>

      {mode === "text" ? (
        <div className="field">
          <label className="field-label" htmlFor="policy-text">
            {t.labelText}
          </label>
          <textarea
            id="policy-text"
            className="field-textarea"
            rows={12}
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder={t.placeholderText}
          />
        </div>
      ) : (
        <div className="field">
          <label className="field-label" htmlFor="policy-url">
            {t.labelUrl}
          </label>
          <input
            id="policy-url"
            className="field-input"
            type="url"
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder={t.placeholderUrl}
          />
        </div>
      )}
    </>
  );
}

export default PolicyInput;
