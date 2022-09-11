<template>
  <HomeTemplate
    :userName.sync="userName"
    :roomId.sync="roomId"
    :isStartModalOpen="isStartModalOpen"
    @handleStart="onPushField"
    @handleSetIssue="onSetId()"
    @handlePushCPUPage="onPushCPU()"
    @handleAutoMatching="onPushAutoMatching()"
    @handleModalOpen="onStartModalOpen"
    @handleModalClose="onStartModalClose()"
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
        userName: null,
        socket: io("localhost:3000"),
        turn_flag: 0,
        playerId: "",
        isStartModalOpen: false,
        roomId: null,
        startSE: new Audio(require("/src/libs/ui/assets/sounds/start.mp3")),
        back1SE: new Audio(require("/src/libs/ui/assets/sounds/back1.mp3")),
      };
    },
    mounted() {
      this.socket.on("logined");
    },
    methods: {
      onPushField: function (value) {
        alert("Happy hacking!");
        this.startSE.play();
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
        alert("Play with CPU. Happy hacking!");
        this.startSE.play();
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
      onPushAutoMatching: function () {
        alert("Play random match. Happy hacking!");
        this.startSE.play();
        this.playerId = Math.random().toString(32).substring(2);
        this.socket.emit("AutoMatchingPreLogin", this.playerId);
        this.$router.push({
          name: "waitingroom",
          query: { id: this.playerId },
        });
      },
      onStartModalOpen: function (user) {
        this.startSE.play();
        console.log(user);
        this.isStartModalOpen = true;
      },
      onStartModalClose: function () {
        this.back1SE.play();
        this.isStartModalOpen = false;
      },
    },
  };
</script>
<style scoped></style>
