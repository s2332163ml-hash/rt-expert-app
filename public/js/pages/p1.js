import { renderList } from "../components/list.js";
export function renderP1(app, all) {
  app.innerHTML = `<div class="bar"><label for="o">並び順</label><select id="o"><option value="n">新しい順</option><option value="o">古い順</option></select></div><div id="l"></div>`;
  const o = app.querySelector("#o");
  const draw = () => renderList(app.querySelector("#l"),
    [...all].sort((a, b) => o.value === "n" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)), all);
  o.onchange = draw; draw();
}
