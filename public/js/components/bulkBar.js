// 選択状態と、右下の［キャンセル］［ダウンロード］バー
import { download } from "../utils/download.js";
export const selected = new Set();
let bar, count, getAll;

export function initBulkBar(all) {
  getAll = all;
  bar = document.createElement("div");
  bar.className = "bulk"; bar.hidden = true;
  bar.innerHTML = '<button class="btn" id="bc">キャンセル</button><button class="btn p" id="bd"></button>';
  document.body.appendChild(bar);
  count = bar.querySelector("#bd");
  bar.querySelector("#bc").onclick = clearSelection;
  count.onclick = () => download(getAll().filter(d => selected.has(d.id)), "選択データ.csv");
}
export function updateBar() { bar.hidden = !selected.size; count.textContent = `選択した${selected.size}件をダウンロード`; }
export function clearSelection() {
  selected.clear();
  document.querySelectorAll(".ck").forEach(c => (c.checked = false));
  updateBar();
}
