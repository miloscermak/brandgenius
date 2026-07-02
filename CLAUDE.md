# BrandAI Workshop

Jednostránkový web pro workshop „Osobní brand v éře AI". Účastník si vybere prompt
z knihovny, vyplní pár polí a AI mu rovnou v okně vygeneruje text (brand identity,
brand voice, content pillars, storytelling, audit…). Výsledek jde zkopírovat / stáhnout.

## Architektura
- `index.html` – celý frontend (Tailwind + Font Awesome přes CDN, vanilla JS, žádný build).
  Prompty jsou definované v poli `promptsData`, formulář se generuje dynamicky.
- `netlify/functions/generate.js` – serverová funkce jako prostředník k OpenRouteru.
  Drží klíč (`OPENROUTER_API_KEY`), volá model **Gemini 2.0 Flash**. Klíč není v prohlížeči.
- `netlify.toml` – publish `.`, funkce v `netlify/functions`.

Frontend volá `/.netlify/functions/generate` s `{ prompt, system }`, funkce vrátí `{ content }`.
Účastníci žádný API klíč nezadávají.

## Změna modelu
Konstanta `MODEL` v `netlify/functions/generate.js`.

## Přidání promptu
Přidat objekt do `promptsData` v `index.html` (id, category, title, description, icon,
inputs, `buildPrompt(values)`).

## Spuštění
Web se hostuje na Netlify. Lokálně `index.html` ukáže UI, ale generování potřebuje
funkci → `netlify dev` s nastaveným `OPENROUTER_API_KEY`. Viz README.md.
