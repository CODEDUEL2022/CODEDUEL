<template>
  <HomeTemplate
    @handleSendId="onSendRoomId(id)"
    @handleStart="onPush()"
    @handleSetIssue="onSetIssue()"
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
      id: "",
      socket: io("localhost:3000"),
      turnFlag: 0,
      RoomId: "",
      playerId: "",
    };
  },
  mounted() {
    this.socket.on("logined", function (userId) {
      console.log(userId);
    });
  },
  methods: {
    onSetIssue: function () {
      // HACK: ID作る関数入れておく
      this.id = Math.random().toString(32).substring(2);
    },
    //追加機能：クエリにplayerIdを追加。同じルーム内でのプレイヤーを識別するのに利用。
    onSendRoomId: function (id) {
      console.log(id)
      this.playerId = Math.random().toString(32).substring(2);
      this.RoomId = id;
      this.socket.emit("login", this.RoomId);
      this.$axios
        .post("/playerData", {
          RoomId: this.RoomId,
          playerId: this.playerId,
        })
        .then((res) => {
          //res.dataがRoomにいる人数 ここで場合分けすればOK
          console.log(res.data);
        });
    },
    //ページ遷移機能
    onPush: function () {
      console.log(this.RoomId);
      alert("start!");
      this.$router.push({
        name: "field",
        query: { room: this.RoomId, id: this.playerId },
      });
    },
  },
};
</script>
<style scoped></style>
