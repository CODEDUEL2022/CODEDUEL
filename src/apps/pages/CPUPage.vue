<template>
  <FieldTemplate
    :message="message"
    :showGeneralCutIn="showGeneralCutIn"
    :showActionCutIn="showActionCutIn"
    :action="action"
    :value="value"
    :yourHP="yourHP"
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
import FieldTemplate from "/src/libs/feature-field/templates/field-template.vue";

export default {
  name: "cpu",
  components: {
    FieldTemplate,
  },
  data() {
    return {
      message: "準備が整うまでしばらくお待ちください",
      showGeneralCutIn: true,
      showActionCutIn: false,
      action: "attack",
      value: 20,
      yourHP: 150,
      opponentHP: 180,
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
      usedCardIdList: [], 
    };
  },
  created() {
    this.yourCardsData = [];
    console.log(this.yourCardsData);
    this.$axios.get("/getComboDb").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.comboData.push(res.data[i]);
      }
    });
    this.$axios
      .get("/cpuHPReload", {
        playerId: searchParams.get("id"),
      })
      .then((res) => {
        console.log(res.data);
        this.yourHP = res.data.yourHP;
        this.opponentHP = res.data.opponentHP;
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
        if (updatedData[i] == ableCombo[0].idList[i] &&updatedData.length == ableCombo[0].idList.length) return true;
        return false;
      }
    },
    closeGeneralCutIn: function () {
      this.showGeneralCutIn = false;
    },
    closeActionCutIn: function () {
      this.showActionCutIn = false;
      this.roundCount += 1;
    },
    handleAction: function () {
      this.showActionCutIn = true;
      this.selectedCardsData.splice(this.index, this.selectedCardsData.length);
      const searchParams = new URLSearchParams(window.location.search);
      this.$axios.post("/cpuControlTurn", { playerId: searchParams.get("id") });

      let cardValue = {
        userId: searchParams.get("id"),
        selectedCardData: this.selectedCardsData
      }
      this.$axios.post("/cpuAction", { cardValue })
      .then((res) => {
        //色素さん宛て：正常に動いていればresの中にはCPUが使用したカードが入っています
      });

      this.$axios.post("/cpuControlTurn", { playerId: searchParams.get("id") });

      this.$axios.post("/cpuGetTurn", { player_Id: searchParams.get("id") })
      .then((res) => {
        if (res.data % 2 == 0) {
          this.oponentTurn = false;
        } else {
          this.oponentTurn = true;
          this.message = "相手のターンです";
        }
      });;
      
    },
  },
  mounted() {},
};
</script>
<style scoped></style>
