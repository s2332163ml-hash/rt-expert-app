const rnd = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
// インパルス応答。d.ir（数値配列）があればそれを描画、無ければ RT60 から作った仮波形
export function irSVG(d) {
  const W = 360, H = 150, mid = H / 2;
  let ys;
  if (d.ir?.length) { const m = Math.max(...d.ir.map(Math.abs)) || 1; ys = d.ir.map(v => v / m); }
  else { const R = rnd((d.seed || 1) + 5), tau = d.rt60 / 13.8; ys = [...Array(240)].map((_, i) => Math.exp(-(i / 240 * Math.max(1.2, d.rt60 * 1.8)) / tau) * (R() * 2 - 1)); }
  const pts = ys.map((v, i) => `${(i / ys.length * (W - 20) + 10).toFixed(1)},${(mid - v * (mid - 12)).toFixed(1)}`).join(" ");
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="インパルス応答 ${d.facility} ${d.room}"><line x1="10" x2="${W-10}" y1="${mid}" y2="${mid}" stroke="var(--gr)"/><polyline points="${pts}" fill="none" stroke="var(--ac)" stroke-width="1.2"/><text x="10" y="12" font-size="10" fill="var(--mu)">振幅</text><text x="${W-10}" y="${H-3}" font-size="10" text-anchor="end" fill="var(--mu)">時間(s)</text></svg>`;
}
export function planSVG(d) {
  const s = 'stroke="var(--ink)" stroke-width="2" fill="var(--ac2)"', L = d.shape === "L";
  const sh = L ? `<path d="M10 10H110V50H170V90H10Z" ${s}/><text x="45" y="55" font-size="11" fill="var(--ink)">部屋1</text><text x="115" y="75" font-size="11" fill="var(--ink)">部屋2</text>` : `<rect x="10" y="10" width="160" height="80" ${s}/>`;
  const pts = [...Array(d.points || 0)].map((_, i) => `<circle cx="${40+i*40}" cy="${L ? 35 : 50}" r="4" fill="var(--ac)"/>`).join("");
  return `<svg viewBox="0 0 180 100" width="100%" role="img" aria-label="間取り図（${L ? "凹凸形" : "長方形"}）">${sh}${pts}</svg>`;
}
