<template>
  <HomeTemplate
    :userName.sync="userName"
    :roomId.sync="roomId"
    :isStartModalOpen="isStartModalOpen"
    :isHowToPlayOpen="isHowToPlayOpen"
    @handleStart="onPushField"
    @handleSetIssue="onSetId()"
    @handlePushCPUPage="onPushCPU()"
    @handlePushAutoMatching="onPushAutoMatching()"
    @handleModalOpen="onStartModalOpen"
    @handleModalClose="onStartModalClose()"
    @handleHowToPlayModalClose="onHowToPlayClose()"
    @handleShowHowToPlay="onShowHowToPlay()"
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
        isHowToPlayOpen: false,
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
        this.startSE.play();
        this.roomId = value;
        this.playerId = Math.random().toString(32).substring(2);
        this.socket.emit("login", this.roomId);
        this.$axios
          .post("/playerData", {
            RoomId: this.roomId,
            playerId: this.playerId,
            playerName: this.userName,
            decId: 0, //仮においている。本来はデッキ選択用
          })
          .then((res) => {
            //res.dataがRoomにいる人数ここで場合分けすればOK
            console.log(res.data);
            if (res.data > 2) {
              alert("This room is FULL. Please enter other roomID");
            } else {
              alert("Happy hacking!");
              this.$router.push({
                name: "field",
                query: { room: this.roomId, id: this.playerId },
              });
            }
          });
      },
      onPushCPU: function () {
        this.startSE.play();
        this.playerId = Math.random().toString(32).substring(2);
        this.$axios.post("/cpuPlayerData", {
          playerId: this.playerId,
          playerName: this.userName,
          decId: 0, //仮においている。本来はデッキ選択用
        });
        this.$router.push({
          name: "cpu",
          query: { id: this.playerId },
        });
      },
      onPushAutoMatching: function () {
        this.startSE.play();
        this.playerId = Math.random().toString(32).substring(2);
        this.socket.emit("AutoMatchingPreLogin", this.playerId);
        this.$router.push({
          name: "waitingroom",
          query: { id: this.playerId, playerName: this.userName },
        });
      },
      onStartModalOpen: function (user) {
        this.startSE.play();
        this.userName = user;
        this.isStartModalOpen = true;
      },
      onStartModalClose: function () {
        this.back1SE.play();
        this.isStartModalOpen = false;
      },
      onShowHowToPlay: function () {
        this.isHowToPlayOpen = true;
      },
      onHowToPlayClose: function () {
        this.isHowToPlayOpen = false;
      },
    },
  };
</script>
<style scoped></style>
