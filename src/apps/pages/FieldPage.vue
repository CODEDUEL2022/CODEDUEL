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
    :attackedPlayerId="attackedPlayerId"
    :roundCount="roundCount"
    :currentFieldName="currentFieldName"
    :currentFieldImg="currentFieldImg"
    :nextFieldName="nextFieldName"
    :yourCardsData.sync="yourCardsData"
    :selectedCardsData.sync="selectedCardsData"
    :selectedId="selectedId"
    :yourId="yourId"
    :effectImages="effectImages"
    :isHowToPlayOpen="isHowToPlayOpen"
    :attackOptions="attackOptions()"
    :isEnableAction="isEnableAction()"
    :isCardListModalOpen="isCardListModalOpen"
    @goHome="goHome()"
    @closeActionCutIn="closeActionCutIn()"
    @handleAction="handleAction()"
    @handleModalOpen="onCardListModalOpen()"
    @handleModalClose="onCardListModalClose()"
    @handleHowToPlayModalClose="onHowToPlayClose()"
    @handleShowHowToPlay="onShowHowToPlay()"
  />
</template>
<script>
import FieldTemplate from "/src/libs/feature-field/templates/field-template.vue";
import io from "socket.io-client";
import nonNumericOnlyHash from "webpack/lib/util/nonNumericOnlyHash";

export default {
  title: "CODE DUEL",
  name: "field",
  components: {
    FieldTemplate,
  },
  data() {
    return {
      generalAttackSE: new Audio(
        require("/src/libs/ui/assets/sounds/action/general-attack.mp3")
      ),
      comboAttackSE: new Audio(
        require("/src/libs/ui/assets/sounds/action/combo-attack.mp3")
      ),
      enhancementSE: new Audio(
        require("/src/libs/ui/assets/sounds/action/enhancement.mp3")
      ),
      hackerSE: new Audio(
        require("/src/libs/ui/assets/sounds/action/hacker.mp3")
      ),
      damageSE: new Audio(
        require("/src/libs/ui/assets/sounds/action/damage.mp3")
      ),
      openModalSE: new Audio(
        require("/src/libs/ui/assets/sounds/open-modal.mp3")
      ),
      backSE: new Audio(require("/src/libs/ui/assets/sounds/back.mp3")),
      clickSE: new Audio(require("/src/libs/ui/assets/sounds/click.mp3")),
      winSE: new Audio(require("/src/libs/ui/assets/sounds/data.mp3")),
      loseSE: new Audio(require("/src/libs/ui/assets/sounds/lose.mp3")),
      increaseHPSE: new Audio(
        require("/src/libs/ui/assets/sounds/increase-hp.mp3")
      ),
      decreaseHPSE: new Audio(
        require("/src/libs/ui/assets/sounds/decrease-hp.mp3")
      ),
      message: "",
      showGeneralCutIn: true,
      showActionCutIn: false,
      showBattleOutcome: false,
      judgeWin: true,
      isHowToPlayOpen: false,
      isCardListModalOpen: false,
      actionType: "",
      actionPoint: "",
      yourHP: 200,
      yourTmpHP: 200,
      yourName: "User1",
      opponentHP: 200,
      opponentTmpHP: 200,
      opponentName: "User2",
      roundCount: 0,
      fieldIndex: 0,
      currentFieldName: "iOS,macOS",
      currentFieldImg: "apple.png",
      nextFieldName: "AndroidOS",
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
      socket: io("code-duel.onrender.com/"),
      attackedPlayerId: "",
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
    this.$axios
      .post("/getPlayerName", {
        roomId: searchParams.get("room"),
        playerId: searchParams.get("id"),
      })
      .then((res) => {
        console.log("playername" + res.data.yourName);
        this.yourName = res.data.yourName;
        this.opponentName = res.data.opponentName;
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
        if (this.yourHP <= 0) {
          this.showGeneralCutIn = false;
          this.judgeWin = false;
          this.showBattleOutcome = true;
        }
        if (this.opponentHP <= 0) {
          this.showGeneralCutIn = false;
          this.showBattleOutcome = true;
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
        console.log(res.data);
        if (res.data == 0) {
          this.opponentTurn = false;
          this.showGeneralCutIn = false;
        } else if (res.data == 1) {
          this.opponentTurn = true;
          this.message = "Matching...";
        } else if (res.data % 2 == 0) {
          this.opponentTurn = false;
          this.showGeneralCutIn = false;
        } else {
          this.message = this.opponentName;
          this.opponentTurn = true;
        }
      });
    this.$axios
      .post("/getRoundCount", { playerId: searchParams.get("id") })
      .then((res) => {
        this.roundCount = res.data;
      });
    this.$axios
      .post("/getPlayerName", {
        roomId: searchParams.get("room"),
        playerId: searchParams.get("id"),
      })
      .then((res) => {
        console.log("playername" + res.data.yourName);
        this.yourName = res.data.yourName;
        this.opponentName = res.data.opponentName;
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
        if (this.yourHP <= 0) {
          this.showGeneralCutIn = false;
          this.judgeWin = false;
          this.showBattleOutcome = true;
        }
        if (this.opponentHP <= 0) {
          this.showGeneralCutIn = false;
          this.showBattleOutcome = true;
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
      this.clickSE.play();
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
      if (this.roundCount % 8 == 0 || this.roundCount % 8 == 1) {
        this.fieldIndex = 0;
      } else if (this.roundCount % 8 == 2 || this.roundCount % 8 == 3) {
        this.fieldIndex = 1;
      } else if (this.roundCount % 8 == 4 || this.roundCount % 8 == 5) {
        this.fieldIndex = 2;
      } else if (this.roundCount % 8 == 6 || this.roundCount % 8 == 7) {
        this.fieldIndex = 3;
      }
      this.currentFieldName = this.fieldData[this.fieldIndex].name;
      this.currentFieldImg = this.fieldData[this.fieldIndex].img;
      if ((this.roundCount + 1) % 8 == 0 || (this.roundCount + 1) % 8 == 1) {
        this.fieldIndex = 0;
      } else if (
        (this.roundCount + 1) % 8 == 2 ||
        (this.roundCount + 1) % 8 == 3
      ) {
        this.fieldIndex = 1;
      } else if (
        (this.roundCount + 1) % 8 == 4 ||
        (this.roundCount + 1) % 8 == 5
      ) {
        this.fieldIndex = 2;
      } else if (
        (this.roundCount + 1) % 8 == 6 ||
        (this.roundCount + 1) % 8 == 7
      ) {
        this.fieldIndex = 3;
      }
      this.nextFieldName = this.fieldData[this.fieldIndex].name;
      if (this.yourHP > this.yourTmpHP) {
        this.decreaseHPSE.volume = 0.3;
        this.decreaseHPSE.play();
        const moveYourBar = document.getElementById("your-hp-frame");
        moveYourBar.classList.add("moveHPBar");
      }
      if (this.opponentHP > this.opponentTmpHP) {
        this.decreaseHPSE.volume = 0.3;
        this.decreaseHPSE.play();
        const moveOpponentBar = document.getElementById("opponent-hp-frame");
        moveOpponentBar.classList.add("moveHPBar");
      }
      if (
        this.yourHP < this.yourTmpHP ||
        this.opponentHP < this.opponentTmpHP
      ) {
        this.increaseHPSE.volume = 0.3;
        this.increaseHPSE.play();
      }
      this.yourHP = this.yourTmpHP;
      this.opponentHP = this.opponentTmpHP;
      // 負け！
      if (this.yourHP <= 0) {
        this.showGeneralCutIn = false;
        this.judgeWin = false;
        this.showBattleOutcome = true;
        this.loseSE.play();
      }
      // 勝ち！
      if (this.opponentHP <= 0) {
        this.showGeneralCutIn = false;
        this.showBattleOutcome = true;
        this.winSE.play();
      }
    },
    handleAction: function () {
      this.generalAttackSE.play();
      console.log("handleAction発火");
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
    onCardListModalOpen: function () {
      this.openModalSE.play();
      this.isCardListModalOpen = true;
    },
    onCardListModalClose: function () {
      this.backSE.play();
      this.isCardListModalOpen = false;
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
      function (
        playersName // 報告:この処理が走るとルームに二人が入ったことになる
      ) {
        anotherThis.$axios
          .post("/getTurn", { playerId: searchParams.get("id") })
          .then((res) => {
            if (res.data < 2) {
              console.log("gamestart");
              // 2回書いているのは仕様です。
              anotherThis.$axios.post("/controlTurn", {
                playerId: searchParams.get("id"),
              });
              anotherThis.$axios.post("/controlTurn", {
                playerId: searchParams.get("id"),
              });
              //ゲームスタート！みたいなカットイン＋opponentTurnによる場合分けで相手のターンみたいなのを表示する
              anotherThis.showGeneralCutIn = true;
              anotherThis.message = "Hello World!";
              const changeMessage = () =>
                (anotherThis.message = `It's ${anotherThis.opponentName}'s turn.`);
              const closeCutIn = () => (anotherThis.showGeneralCutIn = false);
              if (anotherThis.opponentTurn % 2 == 1) {
                setTimeout(changeMessage, 1000);
              } else {
                setTimeout(closeCutIn, 1000);
              }
            }
          });
        setTimeout(
          anotherThis.$axios
            .post("/getPlayerName", {
              roomId: searchParams.get("room"),
              playerId: searchParams.get("id"),
            })
            .then((res) => {
              console.log(res.data);
              anotherThis.yourName = res.data.yourName;
              anotherThis.opponentName = res.data.opponentName;
            }),
          1000
        );
      }
    );
    this.socket.on("HPinfo", function (HPinfo) {
      anotherThis.$axios
        .post("/getTurn", { playerId: searchParams.get("id") })
        .then((res) => {});
      anotherThis.actionType = HPinfo.actionType; //攻撃の種類
      anotherThis.roundCount = HPinfo.roundCount; // 何ターン目かの情報
      anotherThis.actionPoint = HPinfo.actionPoint;
      anotherThis.attackedPlayerId = HPinfo.attackedPlayerID;
      console.log(anotherThis.attackedPlayerId);
      console.log("round:" + anotherThis.roundCount);
      anotherThis.effectImages.splice(
        anotherThis.index,
        anotherThis.effectImages.length
      );
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
        anotherThis.generalAttackSE.play();
        anotherThis.yourTmpHP = HPinfo.attackedPlayerHP;
        anotherThis.opponentTmpHP = HPinfo.damagedPlayerHP;
        anotherThis.opponentTurn = true;
        anotherThis.message = `It's ${anotherThis.opponentName}'s turn.`;
        anotherThis.showGeneralCutIn = true;
      } else if (HPinfo.damagedPlayerID == playerId) {
        //攻撃された時の処理
        anotherThis.damageSE.play();
        anotherThis.yourTmpHP = HPinfo.damagedPlayerHP;
        anotherThis.opponentTmpHP = HPinfo.attackedPlayerHP;
        anotherThis.opponentTurn = false;
        anotherThis.showGeneralCutIn = false;
        anotherThis.showActionCutIn = true;
      }
    });
  },
};
</script>
<style scoped></style>
