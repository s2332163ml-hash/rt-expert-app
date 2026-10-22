import { irSVG, planSVG } from "./graphics.js";
export function card(d, checked) {
  return `<article class="card" data-id="${d.id}">
<div class="top"><label><input type="checkbox" class="ck" ${checked ? "checked" : ""} aria-label="選択"><span>${d.facility}（${d.room}）</span></label><span class="loc">${d.pref}${d.city}</span></div>
<div class="body"><div class="ir">${irSVG(d)}<div class="cap">インパルス応答（測定日 ${d.date}）</div></div>
<div><div class="res"><div>RT60<b>${d.rt60} s</b></div><div>EDT<b>${d.edt} s</b></div></div><div class="plan">${planSVG(d)}</div></div></div>
<div class="acts"><button class="btn dwn">ダウンロード</button>${d.rooms ? '<button class="btn dt" aria-expanded="false">詳細</button>' : ""}</div>
<div class="det" hidden>${(d.rooms || []).map((r, i) => `<div><b>部屋${i+1}</b><br>RT60 ${r.rt60} s／EDT ${r.edt} s</div>`).join("")}</div></article>`;
}
