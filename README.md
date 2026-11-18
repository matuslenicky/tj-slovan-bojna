# TJ Slovan Bojná – návrh webu

Návrh nového webu futbalového klubu TJ Slovan Bojná. **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/tj-slovan-bojna/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/tj-slovan-bojna/admin/

## Vzhľad

**„Dátová tabuľa“ (dizajn v2, 17. 11. 2026).** Biela, čierna a modrá z klubových farieb, červená len pri prehre. Písmo JetBrains Mono (čísla, popisy) a IBM Plex Serif (text).

- úvod stojí na číslach: pás s údajmi áčka (miesto, body, skóre, forma, najbližší zápas), pod ním husté tabuľky výsledkov, programu a celej ligy vedľa seba,
- prehľad všetkých tímov v jednej tabuľke (súťaž, miesto, posledný výsledok),
- stránka Klub: história po vrstvách (od prvej lopty po Lazňu), ročníky áčka, úspechy, štadión, mládež 2025 a obec,
- menu na telefóne je tmavá plocha cez celú obrazovku.

Web sa skladá zo spoločného jadra v2 (`kluby-siet/engine`: `python assemble.py <web>`), vlastný je `src/site.js` (úvod, Klub, nastavenia) a `src/css/skin.css`.

## Obsah a zdroje

- Zápasy, výsledky, strelci, karty, počty divákov, zostavy dospelých, tabuľky a súpisky 5 tímov (áčko, U19, U15, U13, U11) zo Sportnetu (Futbalnet), verejné API súťaží (`scripts/sportnet.mjs` → `data/sportnet.json`). Vek hráčov sa neukladá, zostavy len pri dospelých.
- História futbalu v Bojnej z webu obce (bojna.sk, stránka TJ Slovan Bojná, 2008 – 2010): prvá lopta od Školských bratov, zápasy od roku 1920, Lazňa od 1955, tribúna 1976, I. B trieda, V. liga, umelá tráva s prezidentom 2008.
- Správy z klubu z novín obce Bojnianske zrkadlo (č. 56 – 60, 2025 – 2026): dva mládežnícke tituly a postup 2024/25, premiéra v VI. lige, halové turnaje, Ultras Bojná.
- Ročníky áčka 2013/14 – 2025/26 z konečných tabuliek na Sportnete (`data/klub.json`).
- Hradisko Valy podľa Slovakia.travel, múzeum a archeoskanzen podľa TASR a SITA. Vrstevnice na úvode sú schematické, nie presná mapa.
- E-mail zo Sportnetu, telefóny klub verejne neuvádza. Vlastný web ani sociálne siete klubu sme nenašli (17. 11. 2026).
- Erb klubu a erby súperov zo Sportnetu (`scripts/logos.py`). Patria príslušným klubom.
- Písmo Cinzel, Red Hat Text a Red Hat Mono, licencia SIL Open Font License 1.1 (`scripts/fonts.py`, rovné číslice sú zapečené do písma).

## Zostavenie

Statický generátor bez závislostí (Node 20+, Python 3 s Pillow na erby a fontTools na písmo):

```
node scripts/sportnet.mjs        # zápasy, tabuľky a súpisky (FULL=1 stiahne znova aj detaily zápasov)
python -I scripts/logos.py       # erby súperov a náš erb do src/img (FORCE=1 stiahne znova)
node build.js                    # data/ + src/ -> dist/ (TODAY=2026-11-17 prepíše dnešný dátum)
node scripts/serve.mjs dist 5390 # náhľad na http://127.0.0.1:5390/ (?nolr = bez obnovovania, s CSP)
node scripts/deploy.mjs          # nasadenie dist/ na vetvu gh-pages (GitHub Pages)
```

Výsledky sa po zápasoch aktualizujú samé cez GitHub Actions (`.github/workflows/sportnet.yml`). Ročníky a vrstvy histórie v `data/klub.json` treba po sezóne doplniť ručne.
