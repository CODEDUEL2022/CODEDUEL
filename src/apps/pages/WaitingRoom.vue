<template>
  <div>
    <div>待機中です</div>
  </div>
</template>

<script>
  import io from "socket.io-client";
  export default {
    data() {
      return {
        socket: io("localhost:3000"),
      };
    },
    mounted() {
      const searchParams = new URLSearchParams(window.location.search);
      let playerId = searchParams.get("id");
      let anotherThis = this;
      this.socket.on("FullRoom", function (roomId, playerId1, playerId2) {
        function logIn() {
          anotherThis.socket.emit("login", roomId);
          anotherThis.$axios
            .post("/playerData", {
              RoomId: roomId,
              playerId: playerId,
              decId: 0, //仮においている。本来はデッキ選択用
            })
            .then((res) => {
              //res.dataがRoomにいる人数ここで場合分けすればOK
              console.log(res.data);
            });
          //デッキを自作する機能を実装。
          //decIdにカードのidをリストとして入れれば成功するように設計
          anotherThis.$axios
            .post("/dec", {
              playerId: playerId,
              decIdList: [0, 1, 2, 3, 4, 5, 6],
            })
            .then((res) => {
              console.log(res.data);
            });
          anotherThis.$router.push({
            name: "FieldPage",
            query: { room: roomId, id: playerId },
          });
        }
        if (playerId == playerId1) {
          logIn();
        }
        if (playerId == playerId2) {
          setTimeout(logIn, 1000);
        }
      });
    },
  };
</script>
