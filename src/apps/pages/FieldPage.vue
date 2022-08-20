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
    :yourCardsData="yourCardsData"
    :selectedCardsData="selectedCardsData"
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
      attackSignal: 0,
      comboData: [],
      sampleHp: {
        yours: 200,
        opponent: 200,
      },
      opponentTrun: false,
    };
  },
  created() {
    this.yourCardsData = [];
    const searchParams = new URLSearchParams(window.location.search);
    console.log(this.yourCardsData);
    this.attacksignal = 0;
    //バックエンドからコンボdbを受け取る処理
    this.$axios.get("/getComboDb").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.comboData.push(res.data[i]);
      }
    });
    //HPの共有
    this.$axios
      .post("/HPReload", {
        playerId: searchParams.get("id"),
      })
      .then((res) => {
        console.log(res.data);
        this.sampleHp.yours = res.data.yourHP;
        this.sampleHp.opponent = res.data.opponentHP;
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

    //joinするための送信
    this.yourId = searchParams.get("id");
    let RoomID = searchParams.get("room");
    this.socket.emit("roomJoin", RoomID, this.yourId);
    //turn_flagに応じて、showAttackなどの表示、非表示を決定する。
    //偶数の時は自分の番
    this.$axios
      .post("/getTurn", { playerId: searchParams.get("id") })
      .then((res) => {
        if (res.data % 2 == 0) {
          this.oponentTurn = false;
        } else if (res.data == 1) {
          this.oponentTurn = true;
          this.message = "相手が入室するまでしばらくお待ちください";
        } else {
          this.oponentTurn = true;
          this.message = "相手のターンです";
        }
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
