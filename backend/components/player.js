/**
 * postHP -> フロントエンドからHPを受け取る関数　帰り値はプレイヤーのHP配列
 * HPreload -> そのまんま
 * postPlayerData -> 帰り値はjson化したnumclients
 * getTurn -> 帰り値はturnFlag
 * controlTrun -> turnFlagを1進める
 */

import { comboDB } from "../DB.js";
import { cardDB } from "../DB.js";

let playerDB = [
  //初期化
  {
    RoomId: "",
    playerId: "",
    cardList: [],
    yourHP: 200,
    opponentHP: 200,
    cardListNumber: [],
    turnFlag: 0,
    decId: 0, //デッキの種類を選ぶ　初期は0で、ルームに入る際に選択&フロントエンドから送信してもらいたい
  },
];

export const cardDraw = function (selectId) {
  console.log("ドロー関数が発火されました");
  console.log(playerDB[selectId]);
  for (let j = playerDB[selectId].cardList.length; j < 6; ) {
    //tmpには、デッキの中からランダムに1つ数字を選ぶようにしている
    //const tmp = Number(Math.floor(Math.random() * selectDec(playerDB[selectId].decId).length));
    const tmp = Number(Math.floor(Math.random() * 56));
    //選んだIDのものをpushする
    //playerDB[selectId].cardList.push(selectDec(playerDB[selectId].decId)[tmp]);
    playerDB[selectId].cardList.push(cardDB[tmp]);

    j++;
  }
};

export const postCardDraw = function (req, res) {
  const selectId = playerDB.findIndex((e) => e.playerId === req.body.playerId);
  if (req.body.cardData.length != 0) {
    playerDB[selectId].cardList = req.body.cardData;
  }
  cardDraw(selectId);
  return playerDB[selectId].cardList;
};

export const postHP = function (req, res) {
  let selectId = playerDB.findIndex((e) => e.playerId === req.body.playerId);
  playerDB[selectId].yourHP = req.body.HPs.yours;
  playerDB[selectId].opponentHP = req.body.HPs.opponents;
  const HPdata = {
    yourHP: playerDB[selectId].yourHP,
    oponentHP: playerDB[selectId].opponentHP,
  };
  return HPdata;
};

export const HPreload = function (req, res) {
  let selectId = playerDB.findIndex((e) => e.playerId === req.body.playerId);
  const HPdata = {
    yourHP: playerDB[selectId].yourHP,
    opponentHP: playerDB[selectId].opponentHP,
  };
  return HPdata;
};

export const postPlayerData = function (req, res, numClients) {
  let decId = req.body.decId; //フロントエンドからデッキデータを受け取るのはここにしたいな。フロント係の皆様頼んだ
  if (numClients[req.body.RoomId] == 1) {
    playerDB.push({
      RoomId: req.body.RoomId,
      playerId: req.body.playerId,
      cardList: [],
      yourHP: 200,
      opponentHP: 200,
      cardListNumber: [],
      trunFlag: 1,
      decId: decId,
    });
  } else {
    playerDB.push({
      RoomId: req.body.RoomId,
      playerId: req.body.playerId,
      cardList: [],
      yourHP: 200,
      opponentHP: 200,
      cardListNumber: [],
      trunFlag: 0,
      decId: decId,
    });
  }
  return numClients[req.body.RoomId];
};

export const getTurn = function (req, res) {
  const selectTrunId = playerDB.findIndex(
    (e) => e.playerId === req.body.playerId
  );
  return playerDB[selectTrunId].trunFlag;
};

export const controlTrun = function (req, res) {
  const selectTrunId = playerDB.findIndex(
    (e) => e.playerId === req.body.playerId
  );
  const thisRoomId = playerDB[selectTrunId].RoomId;
  const thisRoomPlayer = playerDB.filter((e) => {
    if (e.RoomId === thisRoomId && e.playerId != req.body.playerId) {
      return true;
    }
  });

  const selectId = playerDB.findIndex(
    (e) => e.playerId === thisRoomPlayer[0].playerId
  );
  playerDB[selectId].trunFlag += 1;
  playerDB[selectTrunId].trunFlag += 1;
};

// export const reload = function (req, res) {
//   let playerDBFromLocalStorage = {
//     RoomId: localStorage.getItem("RoomId"),
//     playerId: localStorage.getItem("playerId"),
//     cardList: localStorage.getItem("cardList"),
//     yourHP: localStorage.getItem("yourHP"),
//     opponentHP: localStorage.getItem("opponentHP"),
//     cardListNumber: localStorage.getItem("cardListNumber"),
//     trunFlag: localStorage.getItem("trunFlag"),
//   };
//   return playerDBFromLocalStorage;
// };
