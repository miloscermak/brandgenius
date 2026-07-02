// Netlify serverová funkce – prostředník mezi webem a OpenRouterem.
// Drží API klíč na serveru (proměnná prostředí OPENROUTER_API_KEY),
// takže se nikdy neobjeví v prohlížeči účastníků.

const MODEL = "google/gemini-2.0-flash-001";

exports.handler = async (event) => {
  // Povolíme jen POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Na serveru chybí OPENROUTER_API_KEY. Nastav ho v Netlify → Site settings → Environment variables." })
    };
  }

  // Načteme prompt, systémovou instrukci a volitelně max_tokens z těla požadavku
  let prompt, system, maxTokens;
  try {
    const body = JSON.parse(event.body || "{}");
    prompt = body.prompt;
    system = body.system;
    maxTokens = body.max_tokens;
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Neplatný požadavek (nešel přečíst JSON)." }) };
  }

  if (!prompt || typeof prompt !== "string") {
    return { statusCode: 400, body: JSON.stringify({ error: "Chybí prompt." }) };
  }

  // Rozumný strop, ať nejde přestřelit; default stačí na dlouhý výstup.
  const max_tokens = Math.min(Number(maxTokens) || 3000, 8000);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: system || "Jsi expert na osobní branding v éře AI. Odpovídáš česky, strukturovaně a prakticky."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.75,
        max_tokens
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return { statusCode: response.status, body: JSON.stringify({ error: "OpenRouter: " + errText }) };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim() || "";
    return { statusCode: 200, body: JSON.stringify({ content }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
