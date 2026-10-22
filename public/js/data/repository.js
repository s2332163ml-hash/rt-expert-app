// データ取得はここだけ。UI は fetchMeasurements() の戻り値しか知らない。
// Firestore: facilities {name, prefecture, city} / measurements {facilityId, facilityName,
//   roomName, use, date, points, rt60, edt, freq:[{hz,rt60}], shape:"rect"|"L", rooms:[{rt60,edt}], ir:[number]}
import { FIREBASE_CONFIG } from "../config/firebase.js";
import { MOCK } from "./mock.js";

const V = "10.12.2";
export async function fetchMeasurements() {
  if (!FIREBASE_CONFIG.apiKey) return MOCK;
  const { initializeApp } = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`);
  const { getFirestore, collection, getDocs } = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`);
  const db = getFirestore(initializeApp(FIREBASE_CONFIG));
  const [m, f] = await Promise.all([getDocs(collection(db, "measurements")), getDocs(collection(db, "facilities"))]);
  const fac = Object.fromEntries(f.docs.map(d => [d.id, d.data()]));
  return m.docs.map(d => {
    const x = d.data(), fa = fac[x.facilityId] || {};
    return { ...x, id: d.id, facility: x.facilityName || fa.name, room: x.roomName,
             pref: fa.prefecture, city: fa.city, rooms: x.rooms || null };
  });
}
