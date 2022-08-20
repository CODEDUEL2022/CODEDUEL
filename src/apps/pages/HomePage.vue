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
      turn_flag: 0,
      RoomId: "",
      player_Id: "",
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
    //追加機能：クエリにplayer_Idを追加。同じルーム内でのプレイヤーを識別するのに利用。
    onSendRoomId: function (id) {
      this.player_Id = Math.random().toString(32).substring(2);
      this.RoomId = id;
      this.socket.emit("login", this.RoomId);
      this.$axios
        .post("/player_data", {
          RoomId: this.RoomId,
          player_Id: this.player_Id,
        })
        .then((res) => {
          //res.dataがRoomにいる人数ここで場合分けすればOK
          console.log(res.data);
        });
    },
    //ページ遷移機能
    onPush: function () {
      alert("start!");
      console.log(this.RoomId);
      this.$router.push({
        name: "field",
        query: { room: this.RoomId, id: this.player_Id },
      });
    },
  },
};
</script>
<style scoped></style>
