import { cardDB } from "./DB.js";
import { comboDB } from "./DB.js";
import { fieldDB } from "./DB.js";
import { Dec1 } from "./DB.js";
import { Dec2 } from "./DB.js";
import { Dec3 } from "./DB.js";
import {
  controlTurn,
  getTurn,
  calculateHP,
  HPreload,
  postPlayerData,
  reload,
  postCardDraw,
  addDec,
  findOpponentUser,
  getPlayersName,
  getRoundCount,
} from "./components/player.js";
import {
  cpuHPReload,
  cpuPostCardDraw,
  cpuGetTurn,
  cpuContorlTrun,
  cpuAction,
  cpuPostPlayerData,
  cpuPlayerAction,
  cpuGetPlayerName,
  cpuAddDec,
} from "./components/cpu.js";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import importHttp  from "http";
import { Server } from "socket.io";
import serverStatic from "serve-static";
import cors from "cors";
import bodyParser from "body-parser";
import history from "connect-history-api-fallback";

const app = express();
const http = importHttp.Server(app);

const io = new Server(http, {
  cors: {
    origin: "https://codeduel2.herokuapp.com/",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 3000;

let numClients = {};
let numPlayer = {};

const serveStatic = serverStatic

//post時にjsonファイルを扱えるようにする
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
//post時にbodyを参照できるようにする
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: true,
      credentials: true,
      optionsSuccessStatus: 200,
    }),
    // express.static("../src/public")
  );
}

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
__dirname = path.resolve(__dirname, "..")
app.get("/cpu", function(req, res) {
  res.send()
});
// app.get("/waitingroom", function(req, res) {
//   res.sendFile(path.join(__dirname, "/src/apps/pages/WaitingRoom.vue"));
// });
// app.get("/field", function(req, res) {
//   res.sendFile(path.join(__dirname, "/src/apps/pages/FieldPage.vue"));
// });

app.use(serveStatic(__dirname + "/dist"));

app.use(
  history({
    disableDotRule: true,
    verbose: true,
  })
);

let standByPlayer = [];

//WebSocket周りの処理
io.sockets.on("connection", function (socket) {
  console.log("connected");
  //オートマッチング機能
  socket.on("AutoMatchingPreLogin", function (playerId) {
    standByPlayer.push(playerId);
    console.log("現在の待機プレイヤー：" + standByPlayer.length + "名");
    function joinRoom(player1, player2) {
      let roomId = Math.random().toString(32).substring(2);
      io.emit("FullRoom", roomId, player1, player2);
    }
    if (standByPlayer.length >= 2) {
      let player1 = standByPlayer[0];
      let player2 = standByPlayer[1];
      standByPlayer.splice(0, 2);
      setTimeout(function () {
        joinRoom(player1, player2);
      }, 1000);
    }
  });
  socket.on("LeaveWaitingRoom", function (playerId) {
    let idx = standByPlayer.indexOf(playerId);
    standByPlayer.splice(idx, 1);
    console.log(standByPlayer);
  });

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
  socket.on("roomJoin", function (roomId, playerId) {
    socket.join(roomId);
    console.log("roomJoin fire");
    if (numPlayer[roomId] == undefined) {
      numPlayer[roomId] = 1;
    } else if (numPlayer[roomId] == 1) {
      if (findOpponentUser(playerId)) {
        numPlayer[roomId]++;
        io.to(roomId).emit("gameStart", getPlayersName(roomId, playerId));
      }
    }
  });
  socket.on("cardValue", function (cardValue, playerId) {
    socket.join(cardValue.roomId);
    io.to(cardValue.roomId).emit("HPinfo", calculateHP(cardValue, playerId));
    console.log("カードの使用が認められました");
  });
});

//カードドローリクエストがフロントから走った場合に発火
app.post("/api/getPlayerName", (req, res) => {
  res.send(getPlayersName(req.body.roomId, req.body.playerId));
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

app.post("/api/dec", (req, res) => {
  res.send(addDec(req, res));
});

//コンボカードリストをフロントに送信
app.get("/api/getComboDb", (req, res) => {
  res.json(comboDB);
});

app.get("/api/getCardDB", (req, res) => {
  res.json(cardDB);
});

app.get("/api/getFieldDB", (req, res) => {
  res.json(fieldDB);
});

app.get("/api/getDec1", (req, res) => {
  res.json(Dec1);
});

app.get("/api/getDec2", (req, res) => {
  res.json(Dec2);
});

app.get("/api/getDec3", (req, res) => {
  res.json(Dec3);
});

//ページリロード時のターンを決定づける。
app.post("/api/getTurn", (req, res) => {
  console.log("/api/getTurn");
  res.json(getTurn(req, res));
});

//同じRoomにいる、自分以外の人のturnFlagを+１する
app.post("/api/controlTurn", (req, res) => {
  controlTurn(req, res);
  res.send();
});

//リロード時の処理
app.get("/api/reload", (req, res) => {
  res.send(reload(req, res));
});

app.post("/api/getRoundCount", (req, res) => {
  res.json(getRoundCount(req));
});
/*
以下CPU戦用のaxios
*/

app.post("/api/cpuHPReload", (req, res) => {
  res.send(cpuHPReload(req, res));
});

app.post("/api/cpuDec", (req, res) => {
  res.send(cpuAddDec(req, res));
});

app.post("/api/cpuPlayerData", (req, res) => {
  cpuPostPlayerData(req, res);
});

app.post("/api/cpuGetPlayerName", (req, res) => {
  res.send(cpuGetPlayerName(req.body.playerId));
});

app.post("/api/cpuGetTurn", (req, res) => {
  res.json(cpuGetTurn(req, res));
});

app.post("/api/cpuCardDraw", (req, res) => {
  res.send(cpuPostCardDraw(req, res));
});

app.post("/api/cpuControlTurn", (req, res) => {
  cpuContorlTrun(req, res);
  res.send();
});

app.post("/api/cpuAction", (req, res) => {
  res.send(cpuAction(req, res));
});
app.post("/api/cpuPlayerAction", (req, res) => {
  res.send(cpuPlayerAction(req, res));
});

http.listen(PORT, function () {
  console.log("server listening. Port:" + PORT);
});
