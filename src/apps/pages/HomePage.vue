<template>
  <HomeTemplate
    :userName.sync="userName"
    :roomId.sync="roomId"
    :isStartModalOpen="isStartModalOpen"
    :isDeckModalOpen="isDeckModalOpen"
    :deckImg="deckImg"
    :isHowToPlayOpen="isHowToPlayOpen"
    @openDeckModal="openDeckModal()"
    @closeDeckModal="closeDeckModal"
    @handleStart="onPushField"
    @handleSetIssue="onSetId()"
    @handlePushCPUPage="onPushCPU()"
    @handlePushAutoMatching="onPushAutoMatching()"
    @handleModalOpen="onStartModalOpen"
    @getDeckCardsImg="getDeckCardsImg()"
    @handleModalClose="onStartModalClose()"
    @handleHowToPlayModalClose="onHowToPlayClose()"
    @handleShowHowToPlay="onShowHowToPlay()"
  />
</template>
<script>
import HomeTemplate from "/src/libs/feature-home/templates/home-template.vue";
import io from "socket.io-client";

export default {
  title: "CODE DUEL",
  name: "home",
  components: {
    HomeTemplate,
  },
  data() {
    return {
      number: "",
      userName: null,
      socket: io("https://codeduel2.herokuapp.com/"),
      turn_flag: 0,
      playerId: "",
      deckList: [],
      isStartModalOpen: false,
      isHowToPlayOpen: false,
      isDeckModalOpen: false,
      roomId: null,
      // deckCardData: [],
      deckImg: "deck1.png",
      cardDB: [],
      customStartSE: new Audio(
        require("/src/libs/ui/assets/sounds/game-start/custom-start.mp3")
      ),
      randomStartSE: new Audio(
        require("/src/libs/ui/assets/sounds/game-start/random-start.mp3")
      ),
      cpuStartSE: new Audio(
        require("/src/libs/ui/assets/sounds/game-start/cpu-start.mp3")
      ),
      openModalSE: new Audio(
        require("/src/libs/ui/assets/sounds/open-modal.mp3")
      ),
      backSE: new Audio(require("/src/libs/ui/assets/sounds/back.mp3")),
    };
  },
  created() {
    this.$axios.get("/getCardDB").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.cardDB.push(res.data[i]);
      }
    });
  },
  mounted() {
    this.socket.on("logined");
  },
  methods: {
    onPushField: function (value) {
      let anotherThis = this;
      this.customStartSE.play();
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
          anotherThis.$axios
            .post("/dec", {
              playerId: anotherThis.playerId,
              decIdList: anotherThis.$store.state.selectedDeck,
            })
            .then((res) => {
              console.log(res.data);
            });
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
      this.cpuStartSE.play();
      alert("Happy hacking!");
      this.playerId = Math.random().toString(32).substring(2);
      this.$axios.post("/cpuPlayerData", {
        playerId: this.playerId,
        playerName: this.userName,
        decId: 0, //仮においている。本来はデッキ選択用
      });
      this.$axios
        .post("/cpuDec", {
          playerId: this.playerId,
          decIdList: this.$store.state.selectedDeck,
        })
        .then((res) => {
          console.log(res.data);
        });
      this.$router.push({
        name: "cpu",
        query: { id: this.playerId },
      });
    },
    onPushAutoMatching: function () {
      this.randomStartSE.play();
      alert("Happy hacking!");
      this.playerId = Math.random().toString(32).substring(2);
      this.socket.emit("AutoMatchingPreLogin", this.playerId);
      this.$router.push({
        name: "waitingroom",
        query: {
          id: this.playerId,
          playerName: this.userName,
          dec: this.$store.state.selectedDeck,
        },
      });
    },
    onStartModalOpen: function (user) {
      this.backSE.play();
      this.userName = user;
      this.isStartModalOpen = true;
    },
    onStartModalClose: function () {
      this.backSE.play();
      this.isStartModalOpen = false;
    },
    openDeckModal: function () {
      this.isDeckModalOpen = true;
    },
    closeDeckModal: function () {
      this.isDeckModalOpen = false;
    },
    getDeckCardsImg: function () {
      if (this.$store.state.selectedDeck == 1) {
        // this.$axios.get("/getDec1").then((res) => {
        //   let deckCardData = []
        //   for (let i = 0; i < res.data.length; i++) {
        //     this.deckList.push(res.data[i]);
        //     const matchedCard = this.cardDB.find(e => e.id == res.data[i]);
        //     deckCardData.push(matchedCard)
        //   }
        //   let setDeckCardData = new Set(deckCardData)
        //   this.deckCardData = setDeckCardData
        // });
        this.deckImg = "deck1.png";
      }
      if (this.$store.state.selectedDeck == 2) {
        // this.$axios.get("/getDec2").then((res) => {
        //   let deckCardData = []
        //   for (let i = 0; i < res.data.length; i++) {
        //     this.deckList.push(res.data[i]);
        //     const matchedCard = this.cardDB.find(e => e.id == res.data[i]);
        //     deckCardData.push(matchedCard)
        //   }
        //   let setDeckCardData = new Set(deckCardData)
        //   this.deckCardData = setDeckCardData
        // });
        this.deckImg = "deck2.png";
      }
      if (this.$store.state.selectedDeck == 3) {
        // this.$axios.get("/getDec3").then((res) => {
        //   let deckCardData = []
        //   for (let i = 0; i < res.data.length; i++) {
        //     this.deckList.push(res.data[i]);
        //     const matchedCard = this.cardDB.find(e => e.id == res.data[i]);
        //     deckCardData.push(matchedCard)
        //   }
        //   let setDeckCardData = new Set(deckCardData)
        //   this.deckCardData = setDeckCardData
        // });
        this.deckImg = "deck3.png";
      }
    },
    onShowHowToPlay: function () {
      this.openModalSE.play();
      this.isHowToPlayOpen = true;
    },
    onHowToPlayClose: function () {
      this.backSE.play();
      this.isHowToPlayOpen = false;
    },
  },
};
</script>
<style scoped></style>
