import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

// view engine을 pug로 설정
app.set("view engine", "pug");
// views 디렉토리 생성
app.set("views", __dirname + "/views");
// user가 볼 수 있는 폴더를 설정
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
// catchall - 다른 url 접근시 메인페이지로 리다이렉트
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);

// 같은 서버에서 http, webSocket 모두 작동
// HTTP 서버사용을 위한 준비
const server = http.createServer(app);

// WebSocket 서버사용을 위한 준비
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("Connected to Browser✅");
  socket.on("close", () => console.log("Disconnected from Browser ❌"));
  socket.on("message", (message) => {
    console.log(message);
  });
  socket.send("Hello!!");
});

server.listen(3000, handleListen);
