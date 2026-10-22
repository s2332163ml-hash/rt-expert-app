import { card } from "./card.js";
import { selected, updateBar } from "./bulkBar.js";
import { download } from "../utils/download.js";

// 3件ずつ読み込む無限スクロール一覧
export function renderList(box, items, all) {
  box.innerHTML = items.length ? "" : '<p class="empty">該当するデータがありません。条件を変えて検索してください。</p>';
  if (!items.length) return;
  let shown = 0;
  const wrap = document.createElement("div"), sentinel = document.createElement("div");
  box.append(wrap, sentinel);
  const more = () => {
    items.slice(shown, shown + 3).forEach(d => wrap.insertAdjacentHTML("beforeend", card(d, selected.has(d.id))));
    shown += 3; if (shown >= items.length) io.disconnect();
  };
  const io = new IntersectionObserver(e => e[0].isIntersecting && more(), { rootMargin: "300px" });
  io.observe(sentinel); more();

  wrap.onclick = e => {
    const c = e.target.closest(".card"); if (!c) return;
    const d = all.find(x => x.id === c.dataset.id);
    if (e.target.classList.contains("dwn")) download([d], `${d.facility}_${d.room}.csv`);
    if (e.target.classList.contains("dt")) { const p = c.querySelector(".det"); p.hidden = !p.hidden; e.target.setAttribute("aria-expanded", !p.hidden); }
  };
  wrap.onchange = e => {
    if (!e.target.classList.contains("ck")) return;
    const id = e.target.closest(".card").dataset.id;
    e.target.checked ? selected.add(id) : selected.delete(id); updateBar();
  };
}
