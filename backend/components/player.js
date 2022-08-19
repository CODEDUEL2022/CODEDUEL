/**
 * postHP -> フロントエンドからHPを受け取る関数　帰り値はプレイヤーのHP配列
 * HPreload -> そのまんま
 * postPlayerData -> 帰り値はjson化したnumclients
 * getTurn -> 帰り値はturnFlag
 * controlTrun -> turnFlagを1進める
 */

import playerDB from "../DB.js";
import numClients from "../server.js";
import comboDB from "../DB.js";
import cardDB from "../DB.js";
import { json } from "body-parser";

export const postHP = function (req, res) {
  let selectId = playerDB.findIndex((e) => e.playerId === req.body.playerId);
  playerDB[selectId].myHP = req.body.HPs.mine;
  playerDB[selectId].enemyHP = req.body.HPs.yours;
  HPdata = {
    myHP: playerDB[selectId].myHP,
    enemyHP: playerDB[selectId].enemyHP,
  };
  return HPdata;
};

export const HPreload = function (req, res) {
  let selectId = playerDB.findIndex((e) => e.playerId === req.body.playerId);
  HPdata = {
    myHP: playerDB[selectId].myHP,
    enemyHP: playerDB[selectId].enemyHP,
  };
  return HPdata;
};

export const postPlayerData = function (req, res) {
  if (numClients[req.body.RoomId] == 1) {
    playerDB.push({
      RoomId: req.body.RoomId,
      playerId: req.body.PlayerId,
      cardList: [],
      myHP: 200,
      enemyHP: 200,
      cardListNumber: [],
      trunFlag: 1,
    });
  } else {
    playerDB.push({
      RoomId: req.body.RoomId,
      playerId: req.body.PlayerId,
      cardList: [],
      myHP: 200,
      enemyHP: 200,
      cardListNumber: [],
      trunFlag: 0,
    });
  }
  return json(numClients[req.body.RoomId]);
};

export const getTurn = function (req, res) {
  const selectTrunId = playerDB.findIndex(
    (e) => e.playerId === req.body.playerId
  );
  return json(playerDB[selectTrunId].trunFlag);
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

  const selestId = playerDB.findIndex(
    (e) => e.playerId === thisRoomPlayer[0].playerId
  );
  playerDB[selectId].trunFlag += 1;
  playerDB[selectTrunId].trunFlag += 1;
};
