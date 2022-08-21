<template>
  <FieldTemplate
    :message="message"
    :showGeneralCutIn="showGeneralCutIn"
    :showActionCutIn="showActionCutIn"
    :action="action"
    :value="value"
    :yourHp="yourHp"
    :opponentHp="opponentHp"
    :roundCount="roundCount"
    :yourCardsData.sync="yourCardsData"
    :selectedCardsData.sync="selectedCardsData"
    :selectedId="selectedId"
    :selectedImg="selectedImg"
    :comboData="comboData"
    :yourId="yourId"
    :yourImg="yourImg"
    :isEnableAction="isEnableAction()"
    @closeGeneralCutIn="closeGeneralCutIn()"
    @closeActionCutIn="closeActionCutIn()"
    @handleAction="handleAction()"
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
      action: "attack",
      value: 20,
      yourHp: 150,
      opponentHp: 180,
      roundCount: 1,
      yourCardsData: [],
      selectedCardsData: [],
      comboData: [],
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
    // バックエンドからコンボdbを受け取る処理
    this.$axios.get("/getComboDb").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.comboData.push(res.data[i]);
      }
    });
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
    //発動できるかどうかを判定する
    isEnableAction: function () {
      let updatedData = this.selectedCardsData.map((obj) => obj.id);
      updatedData.sort(function (first, second) {
        if (first > second) {
          return 1;
        } else if (first < second) {
          return -1;
        } else {
          return 0;
        }
      });
      // 一致してるものがあるかを判定
      const isIncludes = (arr, target) =>
        arr.every((el) => target.includes(el));
      if (updatedData.length === 0) {
        return false;
      } else if (updatedData.length === 1) {
        // this.cardValue.value = this.selectedCardsData[0].value;
        return true;
      } else {
        let ableCombo = this.comboData.filter((comboData) => {
        return isIncludes(updatedData, comboData.idList);
        });
        // 完全一致した攻撃だけを返す
        for (let i = 0, n = updatedData.length; i < n; ++i) {
        if (ableCombo.length == 0) {
          return false;
        } else if (
          updatedData[i] == ableCombo[0].idList[i] &&
          updatedData.length == ableCombo[0].idList.length
        ) {
          return true;
        } else {
          return false;
        }
        }
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
    },
  },
};
</script>
<style scoped></style>
