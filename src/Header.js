import React from "react";

function Header({ lang = "en" }) {
  const strings =
    {
      en: {
        kicker: "Prototype",
        title: "GovGuide AI",
        subtitle:
          "Plain-language navigator for policies, regulations & forms.",
        badge1: "Bilingual-ready",
        badge2: "Explainable",
        badge3: "For Government Use",
      },
      fr: {
        kicker: "Prototype",
        title: "GovGuide IA",
        subtitle:
          "Navigateur en langage clair pour les politiques, règlements et formulaires.",
        badge1: "Prêt pour le bilinguisme",
        badge2: "Explicable",
        badge3: "Pour usage gouvernemental",
      },
    }[lang];

  return (
    <header className="top-nav">
      <div className="brand" aria-label={strings.title}>
        <div className="logo-mark" aria-hidden="true">
          <span className="logo-dot" />
        </div>
        <div className="brand-text">
          <span className="brand-kicker">{strings.kicker}</span>
          <h1>{strings.title}</h1>
          <p>{strings.subtitle}</p>
        </div>
      </div>
      <div className="badge-cluster" aria-label="Key attributes">
        <span className="badge">{strings.badge1}</span>
        <span className="badge">{strings.badge2}</span>
        <span className="badge badge-outline">{strings.badge3}</span>
      </div>
    </header>
  );
}

export default Header;
