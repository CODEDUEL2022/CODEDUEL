<template>
  <FieldTemplate
    :message="message"
    :showGeneralCutIn="showGeneralCutIn"
    :showActionCutIn="showActionCutIn"
    :isEnableAction="isEnableAction"
    :action="action"
    :value="value"
    :yourHp="yourHp"
    :opponentHp="opponentHp"
    :roundCount="roundCount"
    :yourCardsData.sync="yourCardsData"
    :selectedCardsData.sync="selectedCardsData"
    :selectedId="selectedId"
    :selectedImg="selectedImg"
    :yourId="yourId"
    :yourImg="yourImg"
    @closeGeneralCutIn="closeGeneralCutIn()"
    @closeActionCutIn="closeActionCutIn()"
    @handleAction="handleAction()"
    @handleSelectCards="handleSelectCards()"
  />
</template>
<script>
import FieldTemplate from "/src/libs/feature-field/templates/field-template.vue";

export default {
  name: "field",
  components: {
    FieldTemplate,
  },
  data() {
    return {
      message: "相手が入室するまでしばらくお待ちください",
      showGeneralCutIn: true,
      showActionCutIn: false,
      isEnableAction: true,
      action: "attack",
      value: 20,
      yourHp: 150,
      opponentHp: 180,
      roundCount: 1,
      yourCardsData: [],
      selectedCardsData: [],
      yourId: "",
      yourImg: "",
      selectedId: "",
      selectedImg: "",
    };
  },
  created() {
    this.yourCardsData = [];
    const searchParams = new URLSearchParams(window.location.search);
    console.log(this.yourCardsData);
    // this.attacksignal = 0;
    //バックエンドからコンボdbを受け取る処理
    // this.$axios.get("/getComboDb").then((res) => {
    //   for (let i = 0; i < res.data.length; i++) {
    //     this.comboData.push(res.data[i]);
    //   }
    // });
    // カードをドローする処理
    this.$axios
      .post("/cardDraw", {
        cardData: this.yourCardsData,
        playerId: searchParams.get("id"),
      })
      .then((res) => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          this.yourCardsData.push(res.data[i]);
        }
        console.log(this.yourCardsData);
        console.log("hogehoge");
      });
  },
  methods: {
    closeGeneralCutIn: function () {
      this.showGeneralCutIn = false;
    },
    closeActionCutIn: function () {
      this.showActionCutIn = false;
      this.roundCount += 1;
    },
    handleAction: function () {
      this.showActionCutIn = true;
    },
    handleSelectCards: function (newVal) {
      console.log(newVal);
      this.yourCardsData = newVal;
    },
  },
};
</script>
<style scoped></style>
