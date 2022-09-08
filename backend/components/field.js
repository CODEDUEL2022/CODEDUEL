import playerDB from "backend/player.js";

export const changeField = function (playerId) {
  playerDB[playerId].field = (playerDB[playerId].field + 1) % 5;
}