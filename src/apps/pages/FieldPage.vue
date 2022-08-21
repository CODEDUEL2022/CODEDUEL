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
      usedCardIdList: [], //攻撃された、攻撃したカードのIDのリスト
    };
  },
  created() {
    this.yourCardsData = [];
    const searchParams = new URLSearchParams(window.location.search);
    console.log(this.yourCardsData);
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
        this.yourHP = res.data.yourHP;
        this.opponentHP = res.data.opponentHP;
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
    this.roomID = searchParams.get("room");
    this.socket.emit("roomJoin", this.roomID, this.yourId);
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
    // 可能なコンボを取得
    attackOptions: function () {
      let updatedData = this.selectedCardsData.map((obj) => obj.id);
      let ableAttackData = updatedData.sort((a, b) => (a < b ? -1 : 1));
      // 一致してるものがあるかを判定
      const isIncludes = (arr, target) =>
        arr.every((el) => target.includes(el));
      if (ableAttackData.length === 0) {
        return [];
      } else {
        // updateddataにあるのと一致した攻撃だけを返す
        return this.comboData.filter((comboData) => {
          return isIncludes(ableAttackData, comboData.idList);
        });
      }
    },
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
      this.selectedCardsData.splice(this.index, this.selectedCardsData.length);
    },
  },
  mounted() {
    let anotherThis = this;
    this.socket.on("numPlayer", function (numPlayer) {
      if (numPlayer == 1) {
        anotherThis.isAlone = true;
      } else {
        anotherThis.isAlone = false;
      }
    });

    this.socket.on("HPinfo", function (HPinfo) {
      anotherThis.action = HPinfo.action; //攻撃の種類
      anotherThis.usedCardIdList = HPinfo.usedCardIdList; //カードのIDのリスト
      if (HPinfo.attackedPlayerID == anotherThis.playerId) {
        //攻撃した時の処理
        anotherThis.yourHP = HPinfo.attackedPlayerHP;
        anotherThis.opponentHP = HPinfo.damagedPlayerHP;
        anotherThis.opponentTrun = true;
      } else if (HPinfo.damagedPlayerID == anotherThis.playerId) {
        //攻撃された時の処理
        anotherThis.yourHP = HPinfo.damagedPlayerHP;
        anotherThis.opponentHP = HPinfo.attackedPlayerHP;
        anotherThis.opponentTrun = false;
      }
    });
  },
};
</script>
<style scoped></style>
