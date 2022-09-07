<template>
  <HomeTemplate
    :gameMode="gameMode"
    :roomId.sync="roomId"
    :isStartModalOpen="isStartModalOpen"
    @handleStart="onPushField"
    @handleSetIssue="onSetId()"
    @handleMoveCPUPage="onPushCPU()"
    @handleModalOpen="onStartModalOpen()"
    @handleModalClose="onStartModalClose()"
    @handleChangeModalContent="onChangeModalContent"
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
        socket: io("localhost:3000"),
        turn_flag: 0,
        playerId: "",
        isStartModalOpen: false,
        gameMode: null,
        roomId: null,
      };
    },
    mounted() {
      this.socket.on("logined");
    },
    methods: {
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
      onPushField: function (value) {
        this.roomId = value;
        console.log(this.roomId);
        this.playerId = Math.random().toString(32).substring(2);
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
        this.$router.push({
          name: "field",
          query: { room: this.roomId, id: this.playerId },
        });
      },
      onPushCPU: function () {
        this.playerId = Math.random().toString(32).substring(2);
        this.$axios.post("/cpuPlayerData", {
          playerId: this.playerId,
          decId: 0, //仮においている。本来はデッキ選択用
        });
        this.$router.push({
          name: "cpu",
          query: { id: this.playerId },
        });
      },
      onStartModalOpen: function () {
        this.isStartModalOpen = true;
      },
      onStartModalClose: function () {
        console.log("onStartModalClose");
        this.isStartModalOpen = false;
      },
      onChangeModalContent: function (value) {
        this.gameMode = value;
        console.log(this.gameMode);
      },
    },
  };
</script>
<style scoped></style>
