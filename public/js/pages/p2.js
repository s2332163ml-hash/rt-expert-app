import { PREFS, USES } from "../constants.js";
import { renderList } from "../components/list.js";
import { download } from "../utils/download.js";
export function renderP2(app, all) {
  const opt = a => a.map(p => `<option>${p}</option>`).join("");
  app.innerHTML = `
<div class="field"><span>施設名で検索</span><input type="text" id="f" placeholder="施設名を入力"></div>
<div class="field"><span>都道府県から検索</span><div class="row"><select id="p"><option value="">都道府県を選択</option>${opt(PREFS)}</select><input type="text" id="c" placeholder="市区町村（任意）"></div></div>
<div class="field"><span>用途で絞り込み</span><div class="row"><select id="u"><option value="">用途を選択</option>${opt(USES)}</select><input type="text" id="x" placeholder="その他の用途を入力" hidden></div></div>
<div id="r"></div>
<div class="foot"><button class="btn" id="cl">閉じる</button><button class="btn p" id="go">検索</button></div>`;
  const $ = id => app.querySelector("#" + id);
  $("u").onchange = () => ($("x").hidden = $("u").value !== "その他");
  $("cl").onclick = () => (location.hash = "");
  $("go").onclick = () => {
    const f = $("f").value.trim(), p = $("p").value, c = $("c").value.trim(), u = $("u").value, x = $("x").value.trim();
    const hit = all.filter(d => (!f || d.facility.includes(f)) && (!p || d.pref === p) && (!c || d.city.includes(c)) &&
      (!u || d.use === u) && (u !== "その他" || !x || d.room.includes(x)));
    $("r").innerHTML = `<p class="fn">${hit.length}件が見つかりました</p>${hit.length ? '<button class="btn p" id="ba" style="margin-bottom:16px">該当データを一括ダウンロード</button>' : ""}<div id="rl"></div>`;
    if (hit.length) $("ba").onclick = () => download(hit, "検索結果.csv");
    renderList($("rl"), hit, all);
  };
}
