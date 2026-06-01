# Personal Brand Assessment

Jednoduchý jednostránkový web pro workshop "Jak si vytvořit osobní brand s AI".

## Co to dělá
Účastník klikáním vybírá v 10 kategoriích (auta, oblečení, zvířata, země, barvy…) dvě značky/věci, které jsou mu **nejbližší** (zelené), a dvě **nejvzdálenější** (červené). Po dokončení web vygeneruje hotový prompt, který si účastník zkopíruje a vloží do ChatGPT / Claude / Groka — ten z výběru vytvoří osobní brand assessment (archetyp, hodnoty, vizuál, tagliny, bio).

## Technika
- Jeden soubor: `index.html`
- Tailwind CSS přes CDN
- Font Awesome přes CDN
- Vanilla JS, žádný build
- Stav drží v paměti (`selections`), nikam se neukládá

## Logika výběru chipů
Klik na chip cykluje stavy:
1. první klik → zelená (plus, "blízké")
2. druhý klik → červená (minus, "vzdálené")
3. třetí klik → smazáno

V každé kategorii max 2 zelené a 2 červené.

## Spuštění
Otevřít `index.html` v prohlížeči. Žádný server netřeba.
