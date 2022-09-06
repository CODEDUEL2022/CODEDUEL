/**
 * postHP -> フロントエンドからHPを受け取る関数　帰り値はプレイヤーのHP配列
 * HPreload -> そのまんま
 * postPlayerData -> 帰り値はjson化したnumclients
 * getTurn -> 帰り値はturnFlag
 * controlTurn -> turnFlagを1進める
 */

 import { comboDB } from "../DB.js";
 import { cardDB } from "../DB.js";
 import { fieldDB } from "../DB.js";
 
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
     roundCount: 0,
     field: 0,
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
       turnFlag: 1,
       decId: decId,
       field: 0,
     });
   } else {
     playerDB.push({
       RoomId: req.body.RoomId,
       playerId: req.body.playerId,
       cardList: [],
       yourHP: 200,
       opponentHP: 200,
       cardListNumber: [],
       turnFlag: 0,
       decId: decId,
       field: 0,
     });
   }
   return numClients[req.body.RoomId];
 };
 
 export const getTurn = function (req, res) {
   const selectTurnId = playerDB.findIndex(
     (e) => e.playerId === req.body.playerId
   );
   return playerDB[selectTurnId].turnFlag;
 };
 
 export const controlTurn = function (req, res) {
   const selectTurnId = playerDB.findIndex(
     (e) => e.playerId === req.body.playerId
   );
   const thisRoomId = playerDB[selectTurnId].RoomId;
   const thisRoomPlayer = playerDB.filter((e) => {
     if (e.RoomId === thisRoomId && e.playerId != req.body.playerId) {
       return true;
     }
   });
 
   const selectId = playerDB.findIndex(
     (e) => e.playerId === thisRoomPlayer[0].playerId
   );
   playerDB[selectId].turnFlag += 1;
   playerDB[selectTurnId].turnFlag += 1;
 };
 
 export const reload = function (req, res) {
   let playerDBFromLocalStorage = {
     RoomId: localStorage.getItem("RoomId"),
     playerId: localStorage.getItem("playerId"),
     cardList: localStorage.getItem("cardList"),
     yourHP: localStorage.getItem("yourHP"),
     opponentHP: localStorage.getItem("opponentHP"),
     cardListNumber: localStorage.getItem("cardListNumber"),
     turnFlag: localStorage.getItem("turnFlag"),
   };
   return playerDBFromLocalStorage;
 };
 
 const decideUsedCombo = function (selectedData) {
   const isEqualArray = function (array1, array2) {
     if (array1.length != array2.length) return false;
     for (let i = 0; i < array1.length; i++) {
       if (array1[i] !== array2[i]) return false;
     }
     return true;
   };
   for (let i = 0; i < comboDB.length; i++) {
     if (
       isEqualArray(selectedData, comboDB[i].idList) &&
       selectedData.length == comboDB[i].idList.length
     )
       return comboDB[i];
   }
 };
 
 export const calculateHP = function (cardValue, playerId) {
   const indexAttacked = playerDB.findIndex((e) => e.playerId === playerId);
   const thisRoomPlayer = playerDB.filter((e) => {
     if (e.RoomId === cardValue.roomId && e.playerId != playerId) {
       return true;
     }
   });
   const indexDamaged = playerDB.findIndex(
     (e) => e.playerId === thisRoomPlayer[0].playerId
   );
   let effect = "";
   let damageValue = 0;
   let updatedData = cardValue.selectedCardData.map((obj) => obj.id);
   updatedData.sort(function (first, second) {
     if (first > second) {
       return 1;
     } else if (first < second) {
       return -1;
     } else {
       return 0;
     }
   });
   let thisTurnField = playerDB[indexAttacked].field;
   changeField(indexAttacked);
   changeField(indexDamaged);
   let nextTurnField = playerDB[indexAttacked].field;
   let fieldBonus = 0;
   let fieldBonusFlag = "false";
   changeRound(indexAttacked);
   changeRound(indexDamaged);
   let nextRoundCount = playerDB[indexAttacked].roundCount;
   if (cardValue.selectedCardData.length == 1) {
     if (cardValue.selectedCardData[0].field == fieldDB[thisTurnField]) {
       fieldBonus = 10;
       fieldBonusFlag = "true";
     }
     damageValue = cardValue.selectedCardData[0].actionValue + fieldBonus;
     if (cardValue.selectedCardData[0].action == "enhancement") {
       //回復の処理
       effect += "enhancement";
       playerDB[indexAttacked].yourHP += damageValue;
       playerDB[indexDamaged].opponentHP += damageValue;
     } else if (cardValue.selectedCardData[0].action == "steal") {
       //ハッカーカードの処理
       effect += "steal";
       playerDB[indexAttacked].yourHP += damageValue;
       playerDB[indexDamaged].opponentHP += damageValue;
       playerDB[indexAttacked].opponentHP -= damageValue;
       playerDB[indexDamaged].yourHP -= damageValue;
     } else {
       //攻撃の処理
       effect += "attack";
       playerDB[indexAttacked].opponentHP -= damageValue;
       playerDB[indexDamaged].yourHP -= damageValue;
     }
   } else {
     // コンボの場合
     const usedCombo = decideUsedCombo(updatedData);
     effect += usedCombo.nameEn;
     damageValue = usedCombo.actionValue;
     playerDB[indexAttacked].opponentHP -= usedCombo.actionValue;
     playerDB[indexDamaged].yourHP -= usedCombo.actionValue;
   }
   const HPinfo = {
     actionType: effect,
     actionPoint: damageValue,
     attackedPlayerID: playerDB[indexAttacked].playerId,
     damagedPlayerID: playerDB[indexDamaged].playerId,
     attackedPlayerHP: playerDB[indexAttacked].yourHP,
     damagedPlayerHP: playerDB[indexDamaged].yourHP,
     usedCardIdList: updatedData,
     nextTurnField: nextTurnField,
     fieldBonusFlag: fieldBonusFlag,
     roundCount: nextRoundCount,
   };
   return HPinfo;
 };
 
 const changeField = function (playerId) {
   playerDB[playerId].field = (playerDB[playerId].field + 1) % 4;
 };
 
 const changeRound = function (playerId) {
   playerDB[playerId].roundCount = playerDB[playerId].roundCount + 1;
 };
 