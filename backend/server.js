import { cardDB } from "./DB.js";
import { comboDB } from "./DB.js";
import {
  controlTrun,
  getTurn,
  HPreload,
  postPlayerData,
  reload,
  postCardDraw,
} from "./components/player.js";
import {
  cpuHPReload,
  cpuCulculateHP,
  cpuPostCardDraw,
  cpuGetTurn,
  cpuContorlTrun
} from "./components/cpu.js"
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import importHttp from "http";
import { Server } from "socket.io";
import serverStatic from "serve-static";
import cors from "cors";
import bodyParser from "body-parser";
import history from "connect-history-api-fallback";

const app = express();
const http = importHttp.Server(app);

const io = new Server(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 3000;
const serveStatic = serverStatic;

let numClients = {};
let numPlayer = {};

//post時にbodyを参照できるようにする
app.use(bodyParser.urlencoded({ extended: true }));

//post時にjsonファイルを扱えるようにする
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: true,
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(serveStatic(__dirname + "/dist"));

//historyモードを追加(deploy後のreload対策になるらしい)
app.use(history({
  disableDotRule: true,
  verbose: true
}));

//WebSocket周りの処理
io.sockets.on("connection", function (socket) {
  console.log("connected");
  //接続切断処理
  //ログイン時処理
  socket.on("login", function (RoomId) {
    if (numClients[RoomId] == undefined) {
      numClients[RoomId] = 1;
    } else {
      numClients[RoomId]++;
    }
    //もしルームの人数が２人以上ならルームに入れない
    if (numClients[RoomId] > 2) {
      console.log("This room is full");
    } else {
      socket.join(RoomId);
      console.log("Roomに入室が完了しました");
      console.log(RoomId);
      console.log("今のRoomに居る人数" + numClients[RoomId]);
    }
    //ルーム入室
  });
  socket.on("roomJoin", function (RoomID) {
    socket.join(RoomID);
    if (numPlayer[RoomID] == undefined) {
      numPlayer[RoomID] = 1;
    } else {
      numPlayer[RoomID]++;
    }
    io.to(RoomID).emit("num-player", numPlayer[RoomID]);
  });
  socket.on("cardValue", function (cardValue, playerId) {
    socket.join(cardValue.roomId);
    io.to(cardValue.roomId).emit("HPinfo", culculateHP(cardValue, playerId));
    console.log("カードの使用が認められました");
  });
});

//カードドローリクエストがフロントから走った場合に発火
app.post("/api/cardDraw", (req, res) => {
  res.send(postCardDraw(req, res));
});

//フロントエンドからHP情報を受け取る。
app.post("/api/HP", (req, res) => {
  res.send(postHP(req, res));
});

//フロントエンド更新時用のHP情報共有
app.post("/api/HPReload", (req, res) => {
  res.send(HPreload(req, res));
});

//ログイン時に、playerIdとRoomIdを受け取る。それをplayerDBに格納
app.post("/api/playerData", (req, res) => {
  res.json(postPlayerData(req, res, numClients));
});

//コンボカードリストをフロントに送信
app.get("/api/getComboDb", (req, res) => {
  res.json(comboDB);
});

//ページリロード時のターンを決定づける。
app.post("/api/getTurn", (req, res) => {
  res.json(getTurn(req, res));
});

//同じRoomにいる、自分以外の人のturnFlagを+１する
app.post("/api/controlTurn", (req, res) => {
  controlTrun(req, res);
  res.send();
});

//リロード時の処理
app.get("api/reload", (req, res) => {
  res.send(reload(req, res));
});


/*
以下CPU戦用のaxios
*/
//HPの更新　リロード時
app.post("api/cpuHPReload",(req,res) => {
  res.send(cpuHPReload(req,res))
});

app.post("api/cpuGetTurn",(req,res) => {
  res.json(cpuGetTurn(req, res));
})

//カードドローリクエストがフロントから走った場合に発火
app.post("/api/cpuCardDraw", (req, res) => {
  res.send(cpuPostCardDraw(req, res));
});

app.post("api/cpuControlTurn",(req,res) => {
  cpuContorlTrun(req,res);
  res.send();
});

app.post("api/cpuAction",(req,res) => {
  
})

http.listen(PORT, function () {
  console.log("server listening. Port:" + PORT);
});
