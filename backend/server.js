const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 3000;
const serveStatic = require("serve-static");
const cors = require("cors");

let numClients = {};
let numPlayer = {};

//post時にbodyを参照できるようにする
const bodyParser = require("body-parser");
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
app.use(serveStatic(__dirname + "/dist"));

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
    socket.on("room-join", function (RoomID) {
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
      io.to(cardValue.roomId).emit("card-value", cardValue);
      console.log("カードの使用が認められました");
    });
});

//フロントエンドからHP情報を受け取る。
app.post("/api/HP", (req, res) => {

});
//フロントエンド更新時用のHP情報共有
app.post("/api/HPReload", (req, res) => {

});
//ログイン時に、playerIdとRoomIdを受け取る。それをplayerDBに格納
app.post("/api/playerData", (req, res) => {

});
//コンボカードリストをフロントに送信
app.get("/api/getComboDb", (req, res) => {

});
//ページリロード時のターンを決定づける。
app.post("/api/getTurn", (req, res) => {

});
//同じRoomにいる、自分以外の人のturnFlagを+１する
app.post("/api/controlTurn", (req, res) => {

});

  
http.listen(PORT, function () {
    console.log("server listening. Port:" + PORT);
});
  