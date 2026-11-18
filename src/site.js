// Statický generátor webu TJ Slovan Bojná: data/ + src/ -> dist/   (node build.js; TODAY=2026-11-17 prepíše dnešný dátum)
// Zostavuje ho kluby-siet/engine/assemble.py zo spoločného jadra v2 a tohto súboru (vzhľad, úvod, stránka Klub).
// Kostra „Dátová tabuľa“: úvod stojí na číslach – pás s údajmi áčka (miesto, body, skóre, forma, najbližší zápas),
// pod ním husté tabuľky zápasov a ligy vedľa seba a prehľad všetkých tímov mládeže v jednej tabuľke. Biela, čierna
// a modrá z klubových farieb, červená len pri prehre. Písmo JetBrains Mono (čísla, popisy) a IBM Plex Serif (text).
const SKIN = {
  nav: 'bar', theme: '#173b7a', brand: 'TJ Slovan Bojná', brandSub: 'od roku 1920',
  fonts: ['jetbrains-mono-500.woff', 'ibm-plex-serif-400.woff', 'ibm-plex-serif-600.woff'],
  sources: 'História podľa webu obce a Bojnianskeho zrkadla.',
  adminHero: 'Futbal v Bojnej od roku 1920',
  adminFacts: club.vrstvy.zoznam.map((v) => ({ k: v.rok, t: v.text })),
  links: [[club.noviny, 'Bojnianske zrkadlo']],
};
const NAV = [['zapasy/', 'Zápasy'], ['tabulky/', 'Tabuľky'], ['timy/', 'Tímy'], ['klub/', 'Klub'], ['kontakt/', 'Kontakt']];
const DESC = `${club.nazov} – futbal v Bojnej od roku ${club.zalozenie}. Zápasy, výsledky, tabuľky a súpisky áčka (${A.leagueName}) a mládeže, dorast U19 víťaz IV. ligy 2024/25.`;

add('', {
  title: `futbal od roku ${club.zalozenie}`, active: '', bodyClass: 'home',
  body: (R) => {
    const n = nextA;
    const row = A.table?.rows.find((r) => r.our);
    const wl = winterLine();
    const cell = (k, v, sub = '') => `<div class="cell"><dt>${k}</dt><dd><b>${v}</b>${sub ? `<span>${sub}</span>` : ''}</dd></div>`;
    return `<section class="board-top"><div class="wrap">
  <h1 class="h1">TJ Slovan Bojná <span>${esc(A.leagueName)} · ročník ${SEASON}</span></h1>
  <dl class="cells">
    ${row ? cell('Miesto', `${A.pos}.`, zo(A.of)) + cell('Body', row.pts, `${row.played} ${pw(row.played, 'zápas', 'zápasy', 'zápasov')}`) + cell('Skóre', `${row.gf}:${row.ga}`, `${row.won}–${row.draw}–${row.lost}`) : ''}
    ${lastA ? `<div class="cell cell--form cell--last"><dt>Posledný zápas</dt><dd><a href="${R}${lastA.url}"><b>${lastA.gf}:${lastA.ga}</b><span>${esc(lastA.opponent)} · ${dShort(lastA.date)}</span></a></dd></div>` : ''}
    ${n ? `<div class="cell cell--next"><dt>${wl ? 'Po zimnej prestávke' : 'Najbližší zápas'}</dt><dd><a href="${R}${n.url}"><b>${esc(n.opponent)}</b><span>${dDay(n.date)} ${dShort(n.date)} · ${esc(n.time || '')} · ${n.home ? 'doma' : 'vonku'}</span></a></dd></div>` : ''}
  </dl>
  ${wl && !n ? `<p class="board-note">${wl}</p>` : ''}
</div></section>
<section class="sec board"><div class="wrap board-in">
  <div>
    <h2 class="h3">Výsledky</h2>${fxList(homeRes(7), R)}
    <h2 class="h3 h3--gap">Program</h2>${homeUp(5, nextA).length ? fxList(homeUp(5, nextA), R) : '<p>Ďalšie zápasy zatiaľ nie sú vyžrebované.</p>'}
    ${more(`${R}zapasy/`, 'Všetky zápasy')}
  </div>
  <div>
    <h2 class="h3">${esc(A.leagueName)}</h2>${A.table ? tableHtml(A.table, R) : ''}${more(`${R}tabulky/`, 'Všetky tabuľky')}
  </div>
</div></section>
<section class="sec sec--grey" aria-labelledby="ml-h"><div class="wrap">
  ${secHead('Všetky tímy', 'ml-h', more(`${R}timy/`, 'Súpisky'))}
  <div class="tbl-wrap"><table class="tbl tbl--teams"><caption class="sr">Tímy TJ Slovan Bojná v ročníku ${SEASON}</caption>
    <thead><tr><th scope="col" class="tl">Tím</th><th scope="col" class="tl hm">Súťaž</th><th scope="col">Miesto</th><th scope="col">Posledný</th></tr></thead>
    <tbody>${teams.map((t) => { const m = [...teamMatches(t.slug)].reverse().find((x) => x.past && x.score); return `<tr><th scope="row" class="tl"><a href="${R}${t.url}">${esc(t.short)}</a><small>${esc(t.adult ? 'muži' : t.sub)}</small></th><td class="tl hm">${esc(t.leagueName)}</td><td>${t.pos ? `${t.pos}.<small>${zo(t.of)}</small>` : '–'}</td><td>${m ? sc(m) : '–'}</td></tr>`; }).join('')}</tbody>
  </table></div>
  <p class="note">2024/25: dorast U19 vyhral IV. ligu ZsFZ, žiaci U15 súťaž ObFZ Topoľčany.</p>
</div></section>`;
  },
});

add('klub/', {
  title: 'Klub', active: 'klub/', desc: `${club.nazov}: futbal od roku ${club.zalozenie}, ihrisko na Lazni, ročníky áčka, tituly mládeže a hradisko Valy.`,
  body: (R) => `${pageHead({ title: 'Klub', sub: `${esc(club.pravnyNazov)}, futbal od roku ${club.zalozenie}. Farby ${esc(club.farby)}.`, R, crumbs: [[null, 'Klub']] })}
<section class="sec sec--first"><div class="wrap board-in">
  <div>
    <h2 class="h3">História</h2>
    <ol class="log">${club.vrstvy.zoznam.map((v) => `<li><span class="log-y">${esc(v.rok)}</span><div><b>${esc(v.nazov)}</b><p>${esc(v.text)}</p></div></li>`).join('')}</ol>
  </div>
  <div>
    <h2 class="h3">Ročníky áčka</h2>${seasonsTable(club.rocniky.zoznam)}
    <h2 class="h3 h3--gap">Úspechy</h2><ul class="log log--s">${club.uspechy.map((u) => `<li><span class="log-y">${esc(u.rok)}</span><div><p>${esc(u.text)}</p></div></li>`).join('')}</ul>
  </div>
</div></section>
<section class="sec sec--grey" aria-labelledby="st-h"><div class="wrap board-in">
  <div>${secHead(esc(ST.nazov), 'st-h')}${facts(ST.fakty)}</div>
  <div><h2 class="h3">Mládež 2025</h2>${facts(club.tituly.zoznam.map((t) => ({ k: t.kat, t: t.text })))}<p class="note">${esc(club.hala.text)}</p></div>
</div></section>
<section class="sec" aria-labelledby="ob-h"><div class="wrap">
  ${secHead('Bojná', 'ob-h')}${facts(club.obec.fakty)}
  <p class="note">Zdroje: web obce Bojná, Bojnianske zrkadlo, Slovakia.travel, TASR, SITA, Sportnet.</p>
</div></section>`,
});
