import fieldDB from "backend/DB.js";

export const chengeField = function (req, res) {
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
  playerDB[selectId].field = (playerDB[selectId].field + 1) % 5;
  playerDB[selectTrunId].field = (playerDB[selectTrunId].field + 1) % 5;
};
