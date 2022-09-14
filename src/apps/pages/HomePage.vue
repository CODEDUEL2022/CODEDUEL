<template>
  <HomeTemplate
    :userName.sync="userName"
    :roomId.sync="roomId"
    :userName="userName"
    :isStartModalOpen="isStartModalOpen"
    :isDeckModalOpen="isDeckModalOpen"
    :deckCardData="deckCardData"
    @openDeckModal="openDeckModal()"
    @closeDeckModal="closeDeckModal"
    @handleStart="onPushField"
    @handleSetIssue="onSetId()"
    @handlePushCPUPage="onPushCPU()"
    @handleAutoMatching="onPushAutoMatching()"
    @handleModalOpen="onStartModalOpen()"
    @getDeckCardsImg="getDeckCardsImg()"
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
        deckList: [],
        isStartModalOpen: false,
        isDeckModalOpen: false,
        roomId: null,
        deckCardData: [],
        cardDB: [],
        startSE: new Audio(require("/src/libs/ui/assets/sounds/start.mp3")),
        back1SE: new Audio(require("/src/libs/ui/assets/sounds/back1.mp3")),
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
        this.userName = user;
        this.isStartModalOpen = true;
      },
      onStartModalClose: function () {
        this.back1SE.play();
        this.isStartModalOpen = false;
      },
      openDeckModal: function () {
        this.isDeckModalOpen = true;
      },
      closeDeckModal: function (){
        this.isDeckModalOpen = false;
        console.log(this.$store.state.deck1)
      },
      getDeckCardsImg: function () {
        this.deckList = []
        if(this.$store.state.selectedDeck == 1) {
          this.$axios.get("/getDec1").then((res) => {
            let deckCardData = []
            for (let i = 0; i < res.data.length; i++) {
              this.deckList.push(res.data[i]);
              const matchedCard = this.cardDB.find(e => e.id == res.data[i]);
              deckCardData.push(matchedCard)
            }
            let setDeckCardData = new Set(deckCardData)
            this.deckCardData = setDeckCardData
          });
        };
        if(this.$store.state.selectedDeck == 2) {
          this.$axios.get("/getDec2").then((res) => {
            let deckCardData = []
            for (let i = 0; i < res.data.length; i++) {
              this.deckList.push(res.data[i]);
              const matchedCard = this.cardDB.find(e => e.id == res.data[i]);
              deckCardData.push(matchedCard)
            }
            let setDeckCardData = new Set(deckCardData)
            this.deckCardData = setDeckCardData
          });
        };
        if(this.$store.state.selectedDeck == 3) {
          this.$axios.get("/getDec3").then((res) => {
            let deckCardData = []
            for (let i = 0; i < res.data.length; i++) {
              this.deckList.push(res.data[i]);
              const matchedCard = this.cardDB.find(e => e.id == res.data[i]);
              deckCardData.push(matchedCard)
            }
            let setDeckCardData = new Set(deckCardData)
            this.deckCardData = setDeckCardData
          });
        };
      }
    },
  };
</script>
<style scoped></style>
