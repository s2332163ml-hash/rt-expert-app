import { fetchMeasurements } from "./data/repository.js";
import { initBulkBar, clearSelection } from "./components/bulkBar.js";
import { renderP1 } from "./pages/p1.js";
import { renderP2 } from "./pages/p2.js";

const app = document.getElementById("app"), sb = document.getElementById("sb"), hd = document.getElementById("hd");
let all = [];

function route() {
  window.scrollTo(0, 0); clearSelection();
  const search = location.hash === "#search";
  sb.hidden = search;                                   // 虫眼鏡はP1のみ
  document.documentElement.style.setProperty("--fb", search ? "64px" : "0px"); // P2では下部バーの上に配置
  (search ? renderP2 : renderP1)(app, all);
}
sb.onclick = () => (location.hash = "#search");
addEventListener("hashchange", route);

// 下へスクロールでヘッダーを隠し、上へスクロールで再表示
let ly = 0;
addEventListener("scroll", () => { hd.classList.toggle("hide", scrollY > ly && scrollY > 80); ly = scrollY; }, { passive: true });

initBulkBar(() => all);
app.innerHTML = '<p class="empty">読み込み中…</p>';
fetchMeasurements().then(d => { all = d; route(); })
  .catch(() => (app.innerHTML = '<p class="empty">データを取得できませんでした。通信状況とFirebase設定を確認してください。</p>'));
