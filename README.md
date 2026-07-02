# BrandAI Workshop

Nástroje pro workshop **„Jak mít dobrý osobní brand v éře AI"**. Dvě HTML stránky,
obě generují text přes stejnou serverovou funkci (OpenRouter → Gemini 2.0 Flash).
Účastníci nic nezadávají – klíč drží server.

## Stránky

- **`index.html` – Brandové zrcadlo** (hlavní). Účastník označuje značky, zvířata, země,
  barvy… jako blízké/vzdálené. Z výběru AI vytvoří strukturované brandové zrcadlo
  (archetyp, signály, anti-brand, tón, vizuální směr, obsahová strategie, AI prompt card).
- **`index2.html` – Knihovna promptů** (starší, jiný princip). 7 hotových promptů s formulářem.
  Dostupná přímo na adrese `…/index2.html`.

## Architektura

- Frontend: Tailwind + Font Awesome přes CDN, vanilla JS, žádný build.
- `netlify/functions/generate.js` – serverová funkce drží OpenRouter klíč a volá
  **Gemini 2.0 Flash**. Prohlížeč klíč nikdy nevidí.

## Nasazení na Netlify

1. Repo připoj v Netlify (New site → Import from GitHub).
2. Build nastavení nech prázdné, publish directory `.` (řídí `netlify.toml`).
3. **Site settings → Environment variables** přidej:
   - `OPENROUTER_API_KEY` = tvůj klíč z <https://openrouter.ai/keys>
4. Deploy. (Po přidání proměnné případně spusť Trigger deploy znovu.)

## Ochrana kreditu

Klíč je sdílený a web veřejný, takže si na
<https://openrouter.ai/settings/credits> nastav **kreditní/měsíční limit**.

## Změna modelu

Konstanta `MODEL` v `netlify/functions/generate.js`.

## Lokální spuštění

Samotné HTML v prohlížeči ukáže UI, ale generování funguje až po nasazení
(potřebuje serverovou funkci). Pro lokální test:

```bash
npm install -g netlify-cli
OPENROUTER_API_KEY=sk-... netlify dev
```
