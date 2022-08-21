<template>
  <HomeTemplate
    :roomId="roomId"
    @handleSendId="onSendRoomId(roomId)"
    @handleStart="onPush()"
    @handleSetIssue="onSetId()"
  />
</template>
<script>
import HomeTemplate from "/src/libs/feature-home/templates/home-template.vue";
import io from "socket.io-client";

export default {
  name: "home",
  components: {
    HomeTemplate,
  },
  data() {
    return {
      number: "",
      roomId: "",
      socket: io("localhost:3000"),
      turn_flag: 0,
      playerId: "",
    };
  },
  mounted() {
    this.socket.on("logined");
  },
  methods: {
    onSetId: function () {
      // HACK: ID作る関数入れておく
      this.roomId = Math.random().toString(32).substring(2);
    },
    //追加機能：クエリにplayer_Idを追加。同じルーム内でのプレイヤーを識別するのに利用。
    onSendRoomId: function (roomId) {
      this.playerId = Math.random().toString(32).substring(2);
      this.roomId = roomId;
      this.socket.emit("login", this.roomId);
      this.$axios
        .post("/playerData", {
          RoomId: this.roomId,
          playerId: this.playerId,
          decId: 0, //仮においている。本来はデッキ選択用
        })
        .then((res) => {
          //res.dataがRoomにいる人数ここで場合分けすればOK
          console.log(res.data);
        });
    },
    //ページ遷移機能
    onPush: function () {
      alert("start!");
      this.$router.push({
        name: "field",
        query: { room: this.roomId, id: this.playerId },
      });
    },
  },
};
</script>
<style scoped></style>
