import playerDB from "DB.js";
import cardDB from "DB.js";
import comboDB from "DB.js";

export const initialize = function (req, res) {
  playerDB.push({
    RoomId: req.body.RoomId,
    playerId: req.body.PlayerId,
    cardList: [],
    myHP: 200,
    enemyHP: 200,
    cardListNumber: [],
    trunFlag: 0,
  });
};

export const cpuAttack = function (req, res) {
  let flag = Math.floor(Math.random() * 3);
  if (flag % 2 == 0) {
    const tmp = Number(Math.floor(Math.random() * cardDB.length));
    return cardDB[tmp];
  } else {
    const tmp = Number(Math.floor(Math.random() * comboDB.length));
    return comboDB[tmp];
  }
};
