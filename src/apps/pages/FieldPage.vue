<template>
  <FieldTemplate
    :cardsList="cardsList"
    :message="message"
    :showGeneralCutIn="showGeneralCutIn"
    :showActionCutIn="showActionCutIn"
    :actionType="actionType"
    :actionPoint="actionPoint"
    :yourHP="yourHP"
    :opponentHP="opponentHP"
    :roundCount="roundCount"
    :yourCardsData.sync="yourCardsData"
    :selectedCardsData.sync="selectedCardsData"
    :selectedId="selectedId"
    :yourId="yourId"
    :effectImages="effectImages"
    :attackOptions="attackOptions()"
    :isEnableAction="isEnableAction()"
    @closeGeneralCutIn="closeGeneralCutIn()"
    @closeActionCutIn="closeActionCutIn()"
    @handleAction="handleAction()"
  />
</template>
<script>
import FieldTemplate from "/src/libs/feature-field/templates/field-template.vue";
import io from "socket.io-client";

export default {
  name: "field",
  components: {
    FieldTemplate,
  },
  data() {
    return {
      message: "マッチング中",
      showGeneralCutIn: true,
      showActionCutIn: false,
      actionType: "",
      actionPoint: "",
      yourHP: 200,
      yourName: "User1",
      opponentHP: 200,
      opponentName: "User2",
      roundCount: 1,
      yourCardsData: [],
      selectedCardsData: [],
      comboData: [],
      cardData: [],
      yourId: "",
      roomId: "",
      selectedId: "",
      attackSignal: 0,
      opponentTurn: false,
      isAlone: false,
      usedCardIdList: [], //攻撃された、攻撃したカードのIDのリスト
      effectImages: [],
      socket: io("localhost:3000"),
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
    this.$axios.get("/getCardDB").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.cardData.push(res.data[i]);
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
          //ここ、issue13ではcomboDataになっていたけれど、多分違うので修正します
          this.yourCardsData.push(res.data[i]);
        }
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
        console.log(res.data);
        if (res.data % 2 == 0) {
          this.opponentTurn = false;
        } else if (res.data % 2 == 1) {
          this.opponentTurn = true;
          this.message = "マッチング中";
        } else {
          this.opponentTurn = true;
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
          // updateddataにあるのと一致した攻撃だけを返す
          return this.comboData.filter((comboData) => {
            return isIncludes(ableAttackData, comboData.idList);
          });
        }
      });
      // 一致してるものがあるかを判定
      const isIncludes = (arr, target) =>
        arr.every((el) => target.includes(el));
      // 配列の完全一致
      const isEqualArray = function (array1, array2) {
        if (array1.length != array2.length) return false;
        for (let i = 0; i < array1.length; j++) {
          if (array1[i] !== array2[i]) return false;
        }
        return true;
      };
      if (updatedData.length === 0) return false;
      if (updatedData.length === 1) return true;

      const ableCombo = this.comboData.filter((comboData) => {
        return isIncludes(updatedData, comboData.idList);
      });
      // 完全一致した攻撃だけを返す
      if (ableCombo.length == 0) {
        return false;
      } else if (isEqualArray(updatedData, ableCombo[0].idList)) {
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
      const searchParams = new URLSearchParams(window.location.search);
      this.$axios.post("/controlTurn", { playerId: searchParams.get("id") });
      let cardValue = {
        selectedCardData: this.selectedCardsData,
        roomId: searchParams.get("room"),
      };
      this.socket.emit("cardValue", cardValue, searchParams.get("id"));
      this.selectedCardsData.splice(this.index, this.selectedCardsData.length);
      this.effectImages.splice(this.index, this.effectImages.length);
      this.showActionCutIn = true;
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
    this.socket.on(
      "gameStart",
      function () // 報告:この処理が走るとルームに二人が入ったことになる
      {
        //ここに処理を書いてほしいです
        //ゲームスタート！みたいなカットイン＋opponentTurnによる場合分けで相手のターンみたいなのを表示する
        anotherThis.showGeneralCutIn = true;
        anotherThis.message = "Game Start";
        const chengeMessage = () => (anotherThis.message = "相手のターンです");
        if (anotherThis.opponentTurn) {
          setTimeout(chengeMessage, 1000);
        }
      }
    );
    this.socket.on("HPinfo", function (HPinfo) {
      anotherThis.actionType = HPinfo.actionType; //攻撃の種類
      // エフェクト用に画像を持ってくる
      for (let i = 0; i < HPinfo.usedCardIdList.length; i++) {
        let usedCard = "";
        usedCard = anotherThis.cardData.find(
          (element) => element.id == HPinfo.usedCardIdList[i]
        );
        anotherThis.effectImages.push(usedCard.img);
      }
      if (HPinfo.attackedPlayerID == anotherThis.playerId) {
        //攻撃した時の処理
        anotherThis.yourHP = HPinfo.attackedPlayerHP;
        anotherThis.opponentHP = HPinfo.damagedPlayerHP;
        anotherThis.opponentTurn = true;
      } else if (HPinfo.damagedPlayerID == anotherThis.playerId) {
        //攻撃された時の処理
        anotherThis.yourHP = HPinfo.damagedPlayerHP;
        anotherThis.opponentHP = HPinfo.attackedPlayerHP;
        anotherThis.opponentTurn = false;
      }
    });
  },
};
</script>
<style scoped></style>
