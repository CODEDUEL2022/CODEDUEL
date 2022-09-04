<template>
  <div>
    <Header />
    <div class="field-container">
      <v-row class="first-row">
        <v-col>
          <HPDisplay
            :yourName="yourName"
            :yourHP="yourHP"
            :opponentName="opponentName"
            :opponentHP="opponentHP"
          />
        </v-col>
        <v-col>
          <span class="round">Round {{ roundCount }}</span>
          <div class="turn-display">
            <span>- Your Turn -</span>
          </div>
        </v-col>
        <v-col>
          <div><span>windows OS</span></div>
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
        </v-col>
      </v-row>
    </div>

    <div v-show="showGeneralCutIn">
      <GeneralCutIn
        :message="message"
        @closeGeneralCutIn="$emit('closeGeneralCutIn')"
      />
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
  import Header from "/src/libs/layout/Header.vue";
  import ActionButton from "../components/ActionButton.vue";
  import HPDisplay from "../components/HpDisplay.vue";
  import VueDrag from "vuedraggable";
  import GeneralCutIn from "../components/GeneralCutIn.vue";
  import ActionCutIn from "../components/ActionCutIn.vue";
  import TerminalUI from "../components/TerminalUI.vue";
  import SimpleCard from "../components/SimpleCard.vue";

  export default {
    name: "FieldTemplate",
    components: {
      Header,
      ActionButton,
      HPDisplay,
      VueDrag,
      GeneralCutIn,
      ActionCutIn,
      TerminalUI,
      SimpleCard,
    },
    props: [
      "message",
      "showGeneralCutIn",
      "showActionCutIn",
      "actionType",
      "actionPoint",
      "yourHP",
      "opponentHP",
      "roundCount",
      "yourName",
      "opponentName",
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
    margin: 1rem 2rem;

    .first-row {
      margin-bottom: 2rem;
      text-align: center;
      height: 9rem;
      .round {
        font-size: 2rem;
        font-weight: medium;
        letter-spacing: 0.15em;
        text-align: center;
        padding: 0 3rem 0.5rem 3rem;
        border-bottom: solid 2px #ff5c00;
        text-shadow: 0 0 10px #ff5c00;
      }
      .turn-display {
        padding-top: 0.5rem;
        letter-spacing: 0.1em;
      }
    }

    .second-row {
      margin-bottom: 1rem;
      .field {
        height: 15rem;
        width: 98%;
        background: rgba(211, 255, 253);
        border: 2px solid #d3fffd;
        box-shadow: 0px 0px 50px #d3fffd;

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
