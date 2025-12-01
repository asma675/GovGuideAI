import React from "react";

function PolicyInput({ mode, value, onChange, lang = "en" }) {
  const strings =
    {
      en: {
        textLabel: "Paste policy, regulation text, or form instructions",
        urlLabel: "Paste URL to a public policy page (experimental)",
        textPlaceholder:
          "Example:\nApplicants must be Canadian residents ... apply online and must provide proof of income and identification...",
        urlPlaceholder:
          "https://www.canada.ca/en/environment-climate-change/services/...",
      },
      fr: {
        textLabel:
          "Collez le texte d'une politique, d'un règlement ou des instructions d'un formulaire",
        urlLabel:
          "Collez l'URL d'une page de politique publique (expérimental)",
        textPlaceholder:
          "Exemple :\nLes demandeurs doivent être des résidents du Canada ... faire une demande en ligne et fournir une preuve de revenu et d'identité...",
        urlPlaceholder:
          "https://www.canada.ca/fr/environnement-changement-climatique/services/...",
      },
    }[lang];

  const label = mode === "text" ? strings.textLabel : strings.urlLabel;

  return (
    <div className="field">
      <label className="field-label" htmlFor="policy-input">
        {label}
      </label>
      <textarea
        id="policy-input"
        className="field-textarea"
        rows={12}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          mode === "text" ? strings.textPlaceholder : strings.urlPlaceholder
        }
      />
    </div>
  );
}

export default PolicyInput;
