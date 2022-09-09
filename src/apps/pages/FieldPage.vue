<template>
  <FieldTemplate
    :message="message"
    :showGeneralCutIn="showGeneralCutIn"
    :showActionCutIn="showActionCutIn"
    :showBattleOutcome="showBattleOutcome"
    :judgeWin="judgeWin"
    :actionType="actionType"
    :actionPoint="actionPoint"
    :yourHP="yourHP"
    :yourName="yourName"
    :opponentHP="opponentHP"
    :opponentName="opponentName"
    :roundCount="roundCount"
    :currentFieldName="currentFieldName"
    :currentFieldImg="currentFieldImg"
    :nextFieldName="nextFieldName"
    :yourCardsData.sync="yourCardsData"
    :selectedCardsData.sync="selectedCardsData"
    :selectedId="selectedId"
    :yourId="yourId"
    :effectImages="effectImages"
    :attackOptions="attackOptions()"
    :isEnableAction="isEnableAction()"
    @goHome="goHome()"
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
      actionSE: new Audio(require("/src/libs/ui/assets/sounds/action_se.mp3")),
      damageSE: new Audio(require("/src/libs/ui/assets/sounds/damage_se.mp3")),
      clickSE: new Audio(require("/src/libs/ui/assets/sounds/kako.mp3")),
      message: "",
      showGeneralCutIn: true,
      showActionCutIn: false,
      showBattleOutcome: false,
      judgeWin: true,
      actionType: "",
      actionPoint: "",
      yourHP: 200,
      yourName: "User1",
      opponentHP: 200,
      opponentName: "User2",
      roundCount: 0,
      currentFieldName: "macOS",
      currentFieldImg: "",
      nextFieldName: "",
      yourCardsData: [],
      selectedCardsData: [],
      comboData: [],
      cardData: [],
      fieldData: [],
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
    const giveNewProperty = function (object) {
      object.isCombined = true;
    };
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
    this.$axios.get("/getFieldDB").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.fieldData.push(res.data[i]);
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
          giveNewProperty(res.data[i]);
          this.yourCardsData.push(res.data[i]);
        }
      });

    //joinするための送信
    this.yourId = searchParams.get("id");
    this.roomId = searchParams.get("room");
    this.socket.emit("roomJoin", this.roomId, this.yourId);
    //turn_flagに応じて、showAttackなどの表示、非表示を決定する。
    //偶数の時は自分の番
    this.$axios
      .post("/getTurn", { playerId: searchParams.get("id") })
      .then((res) => {
        this.roundCount = res.data -2
        console.log(res.data);
        if (res.data == 0) {
          this.opponentTurn = false;
          this.showGeneralCutIn = false;
        } else if (res.data == 1) {
          this.opponentTurn = true;
          this.message = "マッチング中";
        } else if(res.data % 2 == 0){
          this.opponentTurn = false;
          this.showGeneralCutIn = false;
        }else {
          this.message = "相手のターンです";
          this.opponentTurn = true;
        }
      });
  },
  methods: {
    // ターミナルuiに表示するために可能なコンボを取得
    attackOptions: function () {
      const updatedData = this.selectedCardsData.map((obj) => obj.id);
      const ableAttackData = updatedData.sort((a, b) => (a < b ? -1 : 1));
      const duplicatedAbleAttack = [...new Set(ableAttackData)]; //重複を消す
      // 一致してるものがあるかを判定
      const isIncludes = (arr, target) =>
        arr.every((el) => target.includes(el));
      if (ableAttackData.length === 0) return [];
      // 同じカードが2枚以上あってもターミナルにコンボが表示されてしまうのを解消
      if (duplicatedAbleAttack.length !== ableAttackData.length) return [];
      // ableAttackDataにあるのと一致した攻撃だけを返す
      return this.comboData.filter((comboData) => {
        return isIncludes(ableAttackData, comboData.idList);
      });
    },
    //発動できるかどうかを判定する
    isEnableAction: function () {
      const updatedData = this.selectedCardsData.map((obj) => obj.id);
      updatedData.sort(function (first, second) {
        if (first > second) {
          return 1;
        } else if (first < second) {
          return -1;
        } else {
          return 0;
        }
      });
      // 一致してるものがあるかを判定する関数
      const isIncludes = (arr, target) =>
        arr.every((el) => target.includes(el));
      // 配列の完全一致を判定する関数
      const isEqualArray = function (array1, array2) {
        if (array1.length != array2.length) return false;
        for (let i = 0; i < array1.length; i++) {
          if (array1[i] !== array2[i]) return false;
        }
        return true;
      };
      // 完全一致した攻撃だけを返す
      if (updatedData.length === 0) {
        return false;
      } else if (updatedData.length === 1) {
        return true;
      } else {
        const ableCombo = this.comboData.filter((comboData) => {
          return isIncludes(updatedData, comboData.idList);
        });
        // 完全一致した攻撃だけを返す
        if (ableCombo.length == 0) {
          return false;
        } else if (isEqualArray(updatedData, ableCombo[0].idList)) {
          return true;
        } else {
          return false;
        }
      }
    },
    goHome: function () {
      this.$router.push("/");
    },
    closeActionCutIn: function () {
      const searchParams = new URLSearchParams(window.location.search);
      const giveNewProperty = function (object) {
        object.isCombined = true;
      };
      this.showActionCutIn = false;
      this.$axios
        .post("/cardDraw", {
          cardData: this.yourCardsData,
          playerId: searchParams.get("id"),
        })
        .then((res) => {
          console.log(res.data);
          this.yourCardsData = [];
          for (let i = 0; i < res.data.length; i++) {
            giveNewProperty(res.data[i]);
            this.yourCardsData.push(res.data[i]);
          }
        });
      // 負け！
      if(this.yourHP <= 0) {
        this.showGeneralCutIn = false;
        this.judgeWin = false;
        this.showBattleOutcome = true;
      }
      // 勝ち！
      if(this.opponentHP <= 0) {
        this.showGeneralCutIn = false;
        this.showBattleOutcome = true;
      }
    },
    handleAction: function () {
      this.actionSE.play();
      console.log("handleAction発火")
      const searchParams = new URLSearchParams(window.location.search);
      this.$axios.post("/controlTurn", { playerId: searchParams.get("id") });
      let cardValue = {
        selectedCardData: this.selectedCardsData,
        roomId: searchParams.get("room"),
      };
      this.socket.emit("cardValue", cardValue, searchParams.get("id"));
      this.selectedCardsData.splice(this.index, this.selectedCardsData.length);
      this.showActionCutIn = true;
    },
  },
  mounted() {
    const searchParams = new URLSearchParams(window.location.search);
    let playerId = searchParams.get("id");
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
      anotherThis.$axios
      .post("/getTurn", { playerId: searchParams.get("id") })
      .then((res) => {
        if(res.data < 2){
          console.log("gamestart")
          //2回書いているのは仕様です。
          anotherThis.$axios.post("/controlTurn", { playerId: searchParams.get("id") });
          anotherThis.$axios.post("/controlTurn", { playerId: searchParams.get("id") });
          //ここに処理を書いてほしいです
          //ゲームスタート！みたいなカットイン＋opponentTurnによる場合分けで相手のターンみたいなのを表示する
          anotherThis.showGeneralCutIn = true;
          anotherThis.message = "Hello World";
          const changeMessage = () => (anotherThis.message = "相手のターンです");
          const closeCutIn = () => (anotherThis.showGeneralCutIn = false);
          if (anotherThis.opponentTurn % 2 == 1) {
            setTimeout(changeMessage, 1000);
          } else {
            setTimeout(closeCutIn, 1000);
          }
        }
      })
      }
    );
    this.socket.on("HPinfo", function (HPinfo) {
      anotherThis.$axios
      .post("/getTurn", { playerId: searchParams.get("id") })
      .then((res) => {
        anotherThis.roundCount = res.data - 2
      })
      anotherThis.actionType = HPinfo.actionType; //攻撃の種類
      anotherThis.roundCount = HPinfo.nextTurnField // 何ターン目かの情報
      anotherThis.actionPoint = HPinfo.actionPoint
      console.log("round:" + anotherThis.roundCount)
      anotherThis.effectImages.splice(anotherThis.index, anotherThis.effectImages.length);
      // エフェクト用に画像を持ってくる
      for (let i = 0; i < HPinfo.usedCardIdList.length; i++) {
        let usedCard = "";
        usedCard = anotherThis.cardData.find(
          (element) => element.id == HPinfo.usedCardIdList[i]
        );
        anotherThis.effectImages.push(usedCard.img);
      }
      if (HPinfo.attackedPlayerID == playerId) {
        //攻撃した時の処理
        anotherThis.yourHP = HPinfo.attackedPlayerHP;
        anotherThis.opponentHP = HPinfo.damagedPlayerHP;
        anotherThis.opponentTurn = true;
        anotherThis.message = "相手のターンです";
        anotherThis.showGeneralCutIn = true;
      } else if (HPinfo.damagedPlayerID == playerId) {
        //攻撃された時の処理
        anotherThis.damageSE.play();
        anotherThis.yourHP = HPinfo.damagedPlayerHP;
        anotherThis.opponentHP = HPinfo.attackedPlayerHP;
        anotherThis.opponentTurn = false;
        anotherThis.showGeneralCutIn = false;
        anotherThis.showActionCutIn = true;
      }
    });
  },
  updated() {
    // roundを受け取ってそこからfieldDBと照らし合わせる
    // room入室時にupdatedが発火されるがfieldDataがないのでエラーがでる。他の実装を考える
    this.currentFieldName = this.fieldData[this.roundCount % 4].name;
    this.currentFieldImg = this.fieldData[this.roundCount % 4].img;
    this.nextFieldName = this.fieldData[(this.roundCount + 1) % 4].name;
  },
};
</script>
<style scoped></style>
