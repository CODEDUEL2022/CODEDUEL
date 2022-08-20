/**
 * cardDraw -> カードをドローする関数
 * postCardDraw -> フロントにドローしたカードリストを送る関数　帰り値はプレイヤーのカードリスト
 */

import {playerDB} from "../DB.js";
import {comboDB} from "../DB.js";
import {cardDB} from "../DB.js";

export const cardDraw = function (selectId) {
  console.log("ドロー関数が発火されました");
  for (let j = playerDB[selectId].cardList.length; j < 6; ) {
    const tmp = Number(Math.floor(Math.random() * 56));
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
