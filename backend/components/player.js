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

export const reload = function (req, res) {
  let playerDBFromLocalStorage = {
    RoomId: localStorage.getItem("RoomId"),
    playerId: localStorage.getItem("playerId"),
    cardList: localStorage.getItem("cardList"),
    yourHP: localStorage.getItem("yourHP"),
    opponentHP: localStorage.getItem("opponentHP"),
    cardListNumber: localStorage.getItem("cardListNumber"),
    trunFlag: localStorage.getItem("trunFlag"),
  };
  return playerDBFromLocalStorage;
};

export const culculateHP = function (cardValue, playerId) {
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
  let updatedData = cardValue.selectedCardData.map((obj) => obj.id);
  let thisTrunField = playerDB[indexAttacked].field;
  chengeField(indexAttacked);
  chengeField(indexDamaged);
  let nextTrunField = playerDB[indexAttacked].field;
  let fieldBonus = 1;
  let fieldBonusFlag = "false";
  if (cardValue.selectedCardData.length == 1) {
    if (cardValue.selectedCardData[0].field == thisTrunField) {
      fieldBonus = 1.3;
      fieldBonusFlag = "true";
    }
    let damageValue = cardValue.selectedCardData[0].value * fieldBonus;
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
    effect += ableAttacks(selectedCardData)[0].nameEn;
    const isIncludes = (arr, target) => arr.every((el) => target.includes(el));
    comboDB.filter((comboDB) => {
      if (isIncludes(updatedData, comboDB.idList)) {
        if (updatedData.length == comboDB.idList.length) {
          let damageValue = comboDB.actionValue;
          playerDB[indexAttacked].opponentHP -= damageValue;
          playerDB[indexDamaged].yourHP -= damageValue;
        }
      }
    });
  }
  const HPinfo = {
    action: effect,
    attackedPlayerID: playerDB[indexAttacked].playerId,
    damagedPlayerID: playerDB[indexDamaged].playerId,
    attackedPlayerHP: playerDB[indexAttacked].yourHP,
    damagedPlayerHP: playerDB[indexDamaged].yourHP,
    usedCardIdList: updatedData,
    nextTrunField: nextTrunField,
    fieldBonusFlag: fieldBonusFlag,
  };
  return HPinfo;
};

const ableAttacks = function (selectedData) {
  // selecteddataのidだけを集めた
  let updatedData = selectedData.map((obj) => obj.id);
  let canAttackData = updatedData.sort((a, b) => (a < b ? -1 : 1));

  // 一致してるものがあるかを判定
  const isIncludes = (arr, target) => arr.every((el) => target.includes(el));
  //recent_selectdataに、idに対応するカードの名前を入れたい
  if (canAttackData.length === 0) {
    // 何も選択されていないとき空の配列を返す
    return [];
  } else {
    // updateddataにあるのと一致した攻撃だけを返す
    return this.comboDB.filter((comboDB) => {
      return isIncludes(canAttackData, comboDB.idList);
    });
  }
};

const chengeField = function (playerId) {
  playerDB[playerId].field = (playerDB[playerId].field + 1) % 5;
};
