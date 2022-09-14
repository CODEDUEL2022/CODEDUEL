<template>
  <div>
    <Header
      :isHowToPlayOpen="isHowToPlayOpen"
      @handleShowHowToPlay="$emit('handleShowHowToPlay')"
      @handleHowToPlayModalClose="$emit('handleHowToPlayModalClose')"
    />
    <div v-show="showGeneralCutIn">
      <GeneralCutIn :message="message" />
    </div>
    <div v-show="showActionCutIn">
      <ActionCutIn
        :effectImages="effectImages"
        :actionType="actionType"
        :actionPoint="actionPoint"
        @closeActionCutIn="$emit('closeActionCutIn')"
      />
    </div>
    <div v-show="showBattleOutcome">
      <BattleOutcomeView :judgeWin="judgeWin" @goHome="$emit('goHome')" />
    </div>
    <div class="field-container">
      <v-row class="first-row">
        <v-col cols="4">
          <HPDisplay
            :yourName="yourName"
            :yourHP="yourHP"
            :opponentName="opponentName"
            :opponentHP="opponentHP"
          />
        </v-col>
        <v-col cols="4">
          <RoundCounter :roundCount="roundCount" />
        </v-col>
        <v-col cols="4">
          <FieldDisplay
            :currentFieldName="currentFieldName"
            :currentFieldImg="currentFieldImg"
            :nextFieldName="nextFieldName"
          />
        </v-col>
      </v-row>
      <v-row class="second-row">
        <v-col cols="10">
          <div class="field">
            <VueDrag
              :list="selectedCardsData"
              @input="$emit('update:selectedCardsData', $event.target.list)"
              group="yourGroup"
              @start="drag = true"
              @end="drag = false"
              :options="options"
              class="area"
            >
              <SimpleCard
                v-for="card in selectedCardsData"
                :focusedCard="card"
                :key="`${Math.random().toString(32).substring(2)}-first-${
                  card.id
                }`"
              ></SimpleCard>
            </VueDrag>
          </div>
        </v-col>
        <v-col cols="2">
          <TerminalUI :attackOptions="attackOptions"></TerminalUI>
        </v-col>
      </v-row>
      <v-row class="third-row">
        <v-col cols="10">
          <VueDrag
            :list="yourCardsData"
            @input="$emit('update:yourCardsData', $event.target.list)"
            group="yourGroup"
            @start="drag = true"
            @end="drag = false"
            :options="options"
            class="area"
          >
            <SimpleCard
              v-for="yours in yourCardsData"
              :focusedCard="yours"
              :key="`${Math.random().toString(32).substring(2)}-second-${
                yours.id
              }`"
            />
          </VueDrag>
        </v-col>
        <v-col cols="2">
          <ActionButton
            :isEnableAction="isEnableAction"
            @handleAction="$emit('handleAction')"
          ></ActionButton>
          <div class="card-list-btn" @click="$emit('handleModalOpen')">
            <span>Card List</span>
          </div>
          <CardListModal
            v-if="isCardListModalOpen"
            :isCardListModalOpen="isCardListModalOpen"
            @handleModalClose="$emit('handleModalClose')"
          />
        </v-col>
      </v-row>
    </div>

    <div v-show="showGeneralCutIn">
      <GeneralCutIn :message="message" />
    </div>
    <div v-show="showActionCutIn">
      <ActionCutIn
        :effectImages="effectImages"
        :actionType="actionType"
        :actionPoint="actionPoint"
        @closeActionCutIn="$emit('closeActionCutIn')"
      />
    </div>
  </div>
</template>

<script>
  import Header from "../../layout/Header.vue";
  import ActionButton from "../components/ActionButton.vue";
  import HPDisplay from "../components/HpDisplay.vue";
  import VueDrag from "vuedraggable";
  import GeneralCutIn from "../components/GeneralCutIn.vue";
  import ActionCutIn from "../components/ActionCutIn.vue";
  import TerminalUI from "../components/TerminalUI.vue";
  import SimpleCard from "../components/SimpleCard.vue";
  import BattleOutcomeView from "../components/BattleOutcomeView.vue";
  import CardListModal from "../components/CardListModal.vue";
  import RoundCounter from "../components/RoundCounter.vue";
  import FieldDisplay from "../components/FieldDisplay.vue";

  export default {
    name: "FieldTemplate",
    components: {
      Header,
      ActionButton,
      HPDisplay,
      VueDrag,
      GeneralCutIn,
      CardListModal,
      ActionCutIn,
      TerminalUI,
      SimpleCard,
      BattleOutcomeView,
      RoundCounter,
      FieldDisplay,
    },
    props: [
      "message",
      "showGeneralCutIn",
      "showActionCutIn",
      "showBattleOutcome",
      "judgeWin",
      "actionType",
      "actionPoint",
      "yourHP",
      "yourName",
      "opponentHP",
      "opponentName",
      "roundCount",
      "currentFieldName",
      "currentFieldImg",
      "nextFieldName",
      "yourCardsData",
      "selectedCardsData",
      "yourGroup",
      "yourId",
      "effectImages",
      "selectedId",
      "comboData",
      "isEnableAction",
      "attackOptions",
      "focusedCard",
      "isHowToPlayOpen",
      "isCardListModalOpen",
    ],
    data() {
      return {
        // drag&drop用のデータ
        options: {
          group: "yourGroup",
          animation: 200,
        },
      };
    },
  };
</script>

<style scoped lang="scss">
  .field-container {
    font-family: "Gill Sans", sans-serif;
    font-weight: 200;
    font-size: 1.5rem;
    margin: 0.25rem 2rem;

    .first-row {
      margin-bottom: 2rem;
      text-align: center;
      height: 9rem;
    }

    .second-row {
      margin-bottom: 1rem;
      .field {
        height: 15rem;
        width: 98%;
        background: #144f61;
        border: 1px solid #00fff2;
        box-shadow: 0px 0px 10px #00fff2;

        .area {
          display: flex;
          justify-content: stretch;
          width: 100%;
          height: 100%;
        }
      }
    }

    .third-row {
      .area {
        display: flex;
        justify-content: stretch;
        height: fit-content;
      }

      .card-list-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 180px;
        height: fit-content;
        padding: 0.75rem 2rem;
        margin-top: 2rem;
        position: relative;
        border: 4px solid #00fff2;
        background-color: #0e3145;
        box-shadow: 0px 0px 5px #00fff2;
        cursor: pointer;

        span {
          position: relative;
          z-index: 1;
          color: #00fff2;
          font-size: 1.25rem;
          letter-spacing: 0.15rem;
        }
      }
      .card-list-btn::before {
        position: absolute;
        content: "";
        display: block;
        top: -3px;
        bottom: -3px;
        left: 10px;
        right: 10px;
        background-color: #0e3145;
      }
      .card-list-btn::after {
        position: absolute;
        content: "";
        display: block;
        top: 10px;
        bottom: 10px;
        left: -3px;
        right: -3px;
        background-color: #0e3145;
      }

      .card-list-btn:hover,
      .card-list-btn:hover::after,
      .card-list-btn:hover::before {
        background-color: #144f61;
      }
    }
  }

  @media screen and (max-width: 959px) {
    /* 959px以下に適用されるCSS（タブレット用） */
  }
  @media screen and (max-width: 480px) {
    /* 480px以下に適用されるCSS（スマホ用） */
  }
</style>
