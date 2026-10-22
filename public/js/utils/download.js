import { BANDS } from "../constants.js";
function toCsv(list) {
  const h = "測定ID,施設名,部屋用途,部屋名,都道府県,市区町村,測定日,測定点数,RT60(s),EDT(s)," + BANDS.map(f => f + "Hz RT60").join(",");
  return "\ufeff" + [h, ...list.map(d => [d.id, d.facility, d.use, d.room, d.pref, d.city, d.date, d.points, d.rt60, d.edt, ...d.freq.map(x => x.rt60)].join(","))].join("\n");
}
export function download(list, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([toCsv(list)], { type: "text/csv" }));
  a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
}
