// ローカル開発用 Node.js サーバー（本番は Firebase Hosting）
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "../public")));
app.listen(3000, () => console.log("http://localhost:3000"));
