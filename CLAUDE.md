# BrandAI Workshop

Nástroje pro workshop „Jak mít dobrý osobní brand v éře AI". Dvě samostatné HTML stránky,
obě volají stejnou serverovou funkci s AI.

## Stránky
- **`index.html` – Brandové zrcadlo** (hlavní). Účastník v kategoriích (auta, oblečení,
  zvířata, země, barvy, osobnosti, forma obsahu, veřejná role…) označuje chipy jako
  **blízké** (zelené) nebo **vzdálené** (červené), max 2+2 na kategorii. Z výběru se
  poskládá prompt a AI vygeneruje strukturované „brandové zrcadlo" (archetyp, signály,
  anti-brand, tón, vizuál, obsahová strategie, AI prompt card…). Markdown se renderuje
  přes `marked` + `DOMPurify`.
- **`index2.html` – Knihovna promptů** (starší, jiný princip). Sada 7 hotových promptů
  (brand identity, brand voice, content pillars, storytelling, audit…) s formulářem.
  Zůstává v repu, dostupná přímo na `/index2.html`. Výhledově se na ni bude odkazovat.

## Architektura
- Frontend: Tailwind + Font Awesome přes CDN, vanilla JS, žádný build.
- `netlify/functions/generate.js` – serverová funkce jako prostředník k OpenRouteru.
  Drží klíč (`OPENROUTER_API_KEY`), volá model **Gemini 2.0 Flash**. Klíč není v prohlížeči.
  Bere `{ prompt, system, max_tokens }`, vrací `{ content }`.
- Obě stránky volají `/.netlify/functions/generate`. Účastníci žádný API klíč nezadávají.
- `netlify.toml` – publish `.`, funkce v `netlify/functions`.

## Změna modelu
Konstanta `MODEL` v `netlify/functions/generate.js`.

## Spuštění
Hostuje se na Netlify. Lokálně stránka ukáže UI, ale generování potřebuje funkci →
`netlify dev` s nastaveným `OPENROUTER_API_KEY`. Viz README.md.
