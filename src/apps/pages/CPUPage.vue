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
    :yourCardsData.sync="yourCardsData"
    :selectedCardsData.sync="selectedCardsData"
    :selectedId="selectedId"
    :yourId="yourId"
    :effectImages="effectImages"
    :isHowToPlayOpen="isHowToPlayOpen"
    :isCardListModalOpen="isCardListModalOpen"
    :attackOptions="attackOptions()"
    :isEnableAction="isEnableAction()"
    @goHome="goHome()"
    @closeActionCutIn="closeActionCutIn()"
    @handleAction="handleAction()"
    @handleModalOpen="onCardListModalOpen()"
    @handleModalClose="onCardListModalClose()"
    @handleHowToPlayModalClose="onHowToPlayClose()"
    @handleShowHowToPlay="onShowHowToPlay()"
    :attackedPlayerId="attackedPlayerId"
  />
</template>
<script>
  import FieldTemplate from "/src/libs/feature-field/templates/field-template.vue";
  export default {
    title: "CODE DUEL",
    name: "cpu",
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
        cardsList: [],
        message: "準備が完了するまでしばらくお待ちください",
        showGeneralCutIn: true,
        showActionCutIn: false,
        showBattleOutcome: false,
        judgeWin: true,
        isHowToPlayOpen: false,
        isCardListModalOpen: false,
        actionType: "",
        actionPoint: "",
        yourName: "User1",
        yourHP: 200,
        yourTmpHP: 200,
        opponentName: "CPU",
        currentFieldName: "macOS",
        currentFieldImg: "",
        opponentHP: 200,
        opponentTmpHP: 200,
        roundCount: 1,
        fieldIndex: 0,
        yourCardsData: [],
        selectedCardsData: [],
        yourId: "",
        roomId: "",
        yourImg: "",
        selectedId: "",
        selectedImg: "",
        attackSignal: 0,
        comboData: [],
        cardData: [],
        fieldData: [],
        opponentTrun: false,
        isAlone: false,
        usedCardIdList: [], //攻撃された、攻撃したカードのIDのリスト
        effectImages: [],
        playerAction: {
          damageValue: 0,
          effect: "",
          cardList: [],
        },
        cpuAction: {
          damageValue: 0,
          effect: "",
          cardList: [],
        },
        showCPUAttack: false,
        attackedPlayerId: "",
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
        .post("/cpuGetPlayerName", {
          playerId: searchParams.get("id"),
        })
        .then((res) => {
          this.yourName = res.data.yourName;
        });

      this.$axios
        .post("/cpuGetTurn", { playerId: searchParams.get("id") })
        .then((res) => {
          console.log(res.data);
          if (res.data % 2 == 0) {
            this.showGeneralCutIn = false;
            this.oponentTurn = false;
          } else {
            this.oponentTurn = true;
            this.message = "It's CPU's turn.";
          }
        });
      this.showGeneralCutIn = true;
      this.message = "Hello World!";
      const closeCutIn = () => (this.showGeneralCutIn = false);
      setTimeout(closeCutIn, 5000);
    },
    methods: {
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
        this.clickSE.play();
        this.$router.push("/");
      },
      closeGeneralCutIn: function () {
        this.showGeneralCutIn = false;
      },
      closeActionCutIn: function () {
        const searchParams = new URLSearchParams(window.location.search);
        const giveNewProperty = function (object) {
          object.isCombined = true;
        };
        if (this.yourHP > this.yourTmpHP) {
          this.decreaseHPSE.volume = 0.3;
          this.decreaseHPSE.pause();
          this.decreaseHPSE.play();
          const moveYourBar = document.getElementById("your-hp-frame");
          moveYourBar.classList.add("moveHPBar");
        }
        if (this.opponentHP > this.opponentTmpHP) {
          this.decreaseHPSE.volume = 0.3;
          this.decreaseHPSE.pause();
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
        this.roundCount += 1;
        this.$axios
          .post("/cpuGetTurn", { playerId: searchParams.get("id") })
          .then((res) => {
            console.log("closeのgetturn発火" + res.data);
            let anotherThis = this;
            if (res.data % 2 == 1) {
              anotherThis.showGeneralCutIn = false;
              console.log("mountedの発火を確認");
              const searchParams = new URLSearchParams(window.location.search);
              let cardValue = {
                userId: searchParams.get("id"),
                selectedCardData: this.selectedCardsData,
              };
              if (anotherThis.opponentHP > 0) {
                anotherThis.$axios
                  .post("cpuAction", { cardValue: cardValue })
                  .then((res) => {
                    console.log(res.data);
                    anotherThis.yourTmpHP = res.data.playerHP;
                    anotherThis.opponentTmpHP = res.data.cpuHP;
                    anotherThis.cpuAction.damageValue = res.data.damageValue;
                    anotherThis.cpuAction.effect = res.data.action;
                    anotherThis.cpuAction.usedCardIdList =
                      res.data.usedCardIdList;
                    anotherThis.isCpuAction(anotherThis.cpuAction);
                  });
              }
            }
          });
        if (this.yourHP > this.yourTmpHP) {
          this.decreaseHPSE.volume = 0.3;
          this.decreaseHPSE.pause();
          this.decreaseHPSE.play();
          const moveYourBar = document.getElementById("your-hp-frame");
          moveYourBar.classList.add("moveHPBar");
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
        this.showActionCutIn = false;
        if (this.yourHP <= 0) {
          this.showActionCutIn = false;
          this.showGeneralCutIn = false;
          this.judgeWin = false;
          this.showBattleOutcome = true;
          this.loseSE.play();
        }
        // 勝ち！
        if (this.opponentHP <= 0) {
          this.showActionCutIn = false;
          this.showGeneralCutIn = false;
          this.showBattleOutcome = true;
          this.winSE.play();
        }
        this.$axios
          .post("/cpuCardDraw", {
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
      },
      isPlayerAction: function (cardValue) {
        const searchParams = new URLSearchParams(window.location.search);
        this.effectImages.splice(this.index, this.effectImages.length);
        this.actionPoint = cardValue.damageValue;
        console.log("length" + cardValue.usedCardIdList);
        for (let i = 0; i < cardValue.usedCardIdList.length; i++) {
          let usedCard = "";
          usedCard = this.cardData.find(
            (element) => element.id == cardValue.usedCardIdList[i]
          );
          this.effectImages.push(usedCard.img);
        }
        this.attackedPlayerId = searchParams.get("id");
        this.showGeneralCutIn = true;
        this.showActionCutIn = true;
      },
      isCpuAction: function (cardValue) {
        this.damageSE.play();
        this.effectImages.splice(this.index, this.effectImages.length);
        this.actionPoint = cardValue.damageValue;
        for (let i = 0; i < cardValue.usedCardIdList.length; i++) {
          let usedCard = "";
          usedCard = this.cardData.find(
            (element) => element.id == cardValue.usedCardIdList[i]
          );
          this.effectImages.push(usedCard.img);
        }
        const searchParams = new URLSearchParams(window.location.search);
        this.$axios.post("/cpuControlTurn", {
          playerId: searchParams.get("id"),
        });
        this.attackedPlayerId = "CPU";
        this.showActionCutIn = true;
      },
      handleAction: function () {
        this.generalAttackSE.play();
        let anotherThis = this;
        const searchParams = new URLSearchParams(window.location.search);
        let cardValue = {
          userId: searchParams.get("id"),
          selectedCardData: this.selectedCardsData,
        };

        this.$axios.post("/cpuControlTurn", {
          playerId: searchParams.get("id"),
        });

        this.$axios
          .post("/cpuPlayerAction", { cardValue: cardValue })
          .then((res) => {
            console.log(res.data);
            anotherThis.yourTmpHP = res.data.playerHP;
            anotherThis.opponentTmpHP = res.data.cpuHP;
            anotherThis.playerAction.damageValue = res.data.damageValue;
            anotherThis.playerAction.effect = res.data.action;
            anotherThis.playerAction.usedCardIdList = res.data.usedCardIdList;
            anotherThis.isPlayerAction(anotherThis.playerAction);
          });
        this.selectedCardsData.splice(
          this.index,
          this.selectedCardsData.length
        );
        console.log(this.selectedCardsData);
      },
      onCardListModalOpen: function () {
        this.isCardListModalOpen = true;
      },
      onCardListModalClose: function () {
        this.isCardListModalOpen = false;
      },
      onShowHowToPlay: function () {
        this.isHowToPlayOpen = true;
      },
      onHowToPlayClose: function () {
        this.isHowToPlayOpen = false;
      },
    },
    mounted() {},
  };
</script>
<style scoped></style>
