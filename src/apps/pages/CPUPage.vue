<template>
  <FieldTemplate
    :cardsList="cardsList"
    :message="message"
    :showGeneralCutIn="showGeneralCutIn"
    :showActionCutIn="showActionCutIn"
    :actionType="actionType"
    :actionPoint="actionPoint"
    :yourName="yourName"
    :yourHP="yourHP"
    :opponentName="opponentName"
    :opponentHP="opponentHP"
    :roundCount="roundCount"
    :yourCardsData.sync="yourCardsData"
    :selectedCardsData.sync="selectedCardsData"
    :selectedId="selectedId"
    :selectedImg="selectedImg"
    :comboData="comboData"
    :yourId="yourId"
    :yourImg="yourImg"
    :attackOptions="attackOptions()"
    :isEnableAction="isEnableAction()"
    @closeGeneralCutIn="closeGeneralCutIn()"
    @closeActionCutIn="closeActionCutIn()"
    @handleAction="handleAction()"
  />
</template>
<script>
  import FieldTemplate from "/src/libs/feature-field/templates/FieldTemplate.vue";
  export default {
    components: {
      FieldTemplate,
    },
    data() {
      return {
        actionSE: new Audio(
          require("/src/libs/ui/assets/sounds/action_se.mp3")
        ),
        damageSE: new Audio(
          require("/src/libs/ui/assets/sounds/damage_se.mp3")
        ),
        clickSE: new Audio(require("/src/libs/ui/assets/sounds/kako.mp3")),
        cardsList: [],
        message: "相手が入室するまでしばらくお待ちください",
        showGeneralCutIn: true,
        showActionCutIn: false,
        actionType: "attack",
        actionPoint: 20,
        yourName: "User1",
        yourHP: null,
        opponentName: "User2",
        opponentHP: null,
        roundCount: 1,
        yourCardsData: [],
        selectedCardsData: [],
        yourId: "",
        roomId: "",
        yourImg: "",
        selectedId: "",
        selectedImg: "",
        attackSignal: 0,
        comboData: [],
        opponentTrun: false,
        isAlone: false,
        usedCardIdList: [], //攻撃された、攻撃したカードのIDのリスト
      };
    },
    created() {
      this.yourCardsData = [];
      console.log(this.yourCardsData);
      const searchParams = new URLSearchParams(window.location.search);
      this.$axios.get("/getComboDb").then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.comboData.push(res.data[i]);
        }
      });
      this.$axios
        .post("/cpuHPReload", {
          playerId: searchParams.get("id"),
        })
        .then((res) => {
          console.log(res.data);
          this.yourHP = res.data.yourHP;
          this.opponentHP = res.data.oponentHP;
        });
      this.$axios
        .post("/cpuCardDraw", {
          cardData: this.yourCardsData,
          playerId: searchParams.get("id"),
        })
        .then((res) => {
          console.log(res.data);
          for (let i = 0; i < res.data.length; i++) {
            this.yourCardsData.push(res.data[i]);
          }
          console.log(this.yourCardsData);
        });

      this.$axios
        .post("/cpuGetTurn", { playerId: searchParams.get("id") })
        .then((res) => {
          if (res.data % 2 == 0) {
            this.oponentTurn = false;
          } else {
            this.oponentTurn = true;
            this.message = "CPUのターンです";
          }
        });
    },
    methods: {
      attackOptions: function () {
        let updatedData = this.selectedCardsData.map((obj) => obj.id);
        let ableAttackData = updatedData.sort((a, b) => (a < b ? -1 : 1));
        const isIncludes = (arr, target) =>
          arr.every((el) => target.includes(el));
        if (ableAttackData.length === 0) return [];
        return this.comboData.filter((comboData) => {
          return isIncludes(ableAttackData, comboData.idList);
        });
      },
      isEnableAction: function () {
        let updatedData = this.selectedCardsData.map((obj) => obj.id);
        updatedData.sort(function (first, second) {
          if (first > second) return 1;
          if (first < second) return -1;
          return 0;
        });
        const isIncludes = (arr, target) =>
          arr.every((el) => target.includes(el));
        if (updatedData.length === 0) return false;
        if (updatedData.length === 1) return true;
        let ableCombo = this.comboData.filter((comboData) => {
          return isIncludes(updatedData, comboData.idList);
        });
        for (let i = 0, n = updatedData.length; i < n; ++i) {
          if (ableCombo.length == 0) return false;
          if (
            updatedData[i] == ableCombo[0].idList[i] &&
            updatedData.length == ableCombo[0].idList.length
          )
            return true;
          return false;
        }
      },
    },
    closeGeneralCutIn: function () {
      this.showGeneralCutIn = false;
    },
    closeActionCutIn: function () {
      this.showActionCutIn = false;
      this.roundCount += 1;
    },
    handleAction: function () {
      this.actionSE.play();
      this.showActionCutIn = true;
      const searchParams = new URLSearchParams(window.location.search);
      this.$axios.post("/cpuControlTurn", {
        playerId: searchParams.get("id"),
      });

      let cardValue = {
        userId: searchParams.get("id"),
        selectedCardData: this.selectedCardsData,
      };
      this.$axios.post("/cpuAction", { cardValue: cardValue }).then((res) => {
        this.damageSE.play();
        //色素さん宛て：正常に動いていればresの中にはCPUが使用したカードが入っています
        //res.data -> { action: 'attack', playerHP: 170, cpuHP: 180, usedCardIdList: [ 34 ] }  こんな感じ
      });

      this.$axios.post("/cpuControlTurn", {
        playerId: searchParams.get("id"),
      });

      this.$axios
        .post("/cpuGetTurn", { playerId: searchParams.get("id") })
        .then((res) => {
          if (res.data % 2 == 0) {
            this.oponentTurn = false;
          } else {
            this.oponentTurn = true;
            this.message = "相手のターンです";
          }
        });
      this.selectedCardsData.splice(this.index, this.selectedCardsData.length);
    },
    mounted() {},
  };
</script>
<style scoped></style>
