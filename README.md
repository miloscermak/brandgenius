# BrandAI Workshop

Jednostránkový nástroj pro workshop **„Osobní brand v éře AI"**. Účastník si vybere
prompt (brand identity, brand voice, content pillars, storytelling, audit…), vyplní
pár polí a nechá AI vygenerovat text přímo v okně. Výsledek jde zkopírovat nebo stáhnout.

## Jak to funguje

- `index.html` – celý web (Tailwind + Font Awesome přes CDN, vanilla JS, žádný build).
- `netlify/functions/generate.js` – malá serverová funkce, která drží OpenRouter API klíč
  a volá model **Gemini 2.0 Flash**. Prohlížeč klíč nikdy nevidí – účastníci nic nezadávají.

Frontend volá vlastní endpoint `/.netlify/functions/generate`, ne OpenRouter napřímo.

## Nasazení na Netlify

1. Repo připoj v Netlify (New site → Import from GitHub).
2. Build nastavení nech prázdné, publish directory `.` (řídí to `netlify.toml`).
3. **Site settings → Environment variables** přidej:
   - `OPENROUTER_API_KEY` = tvůj klíč z <https://openrouter.ai/keys>
4. Deploy.

## Ochrana kreditu

Klíč je sdílený a web je veřejný, takže si na
<https://openrouter.ai/settings/credits> nastav **kreditní/měsíční limit**, aby
případné zneužití nemohlo přerůst.

## Změna modelu

Model se mění na jednom místě – konstanta `MODEL` v `netlify/functions/generate.js`.

## Lokální spuštění

Samotné `index.html` v prohlížeči ukáže UI, ale generování funguje až po nasazení
(potřebuje serverovou funkci). Pro lokální test s funkcí:

```bash
npm install -g netlify-cli
netlify dev
```

…a v prostředí měj nastavené `OPENROUTER_API_KEY`.
