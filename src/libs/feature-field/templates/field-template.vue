<template>
  <div>
    <Header />
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
          <span class="round">Round {{ roundCount }}</span>
          <div class="turn-display">
            <span>- Your Turn -</span>
          </div>
        </v-col>
        <v-col cols="4">
          <div class="flex">
            <div id="loading-content"></div>
            <div class="os-info">
              <div class="name">Windows OS</div>
              <div class="content">
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              </div>
              <div>Next >> Mac OS</div>
            </div>
          </div>
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
        text-shadow: 0 0 20px #ff5c00;
      }
      .turn-display {
        padding-top: 0.5rem;
        letter-spacing: 0.1em;
      }
      .flex {
        display: flex;

        text-align: left;
        text-shadow: 0 0 7px #d3fffd;
        .os-info {
          font-size: 1.15rem;
          .name {
            padding: 0.5rem 0;
            font-size: 1.5rem;
            border-bottom: solid 2px #d3fffd;
            letter-spacing: 0.15rem;
          }
          .content {
            max-width: 270px;
            padding: 0.5rem 0;
            font-size: 1.25rem;
            overflow-wrap: break-word;
            text-shadow: none;
            line-height: 1.1em;
          }
        }
      }

      #loading-content {
        display: block;
        width: 5rem;
        height: 5rem;
        margin: 0 1.5rem;
        border: 2px solid #fff;
      }

      #loading-content:after {
        content: "";
        position: absolute;
        border: 2px solid #fff;
        left: 6px;
        right: 6px;
        top: 6px;
        bottom: 6px;
      }

      #loading-content:before {
        content: "";
        position: absolute;
        border: 2px solid #fff;
        left: 2px;
        right: 2px;
        top: 2px;
        bottom: 2px;
      }

      #loading-content {
        border: 2px solid transparent;
        border-top-color: #d3fffd;
        border-bottom-color: #d3fffd;
        border-radius: 50%;
        -webkit-animation: loader 9s linear infinite;
        -moz-animation: loader 9s linear infinite;
        -o-animation: loader 9s linear infinite;
        animation: loader 9s linear infinite;
      }

      #loading-content:before {
        border: 1px solid transparent;
        border-top-color: #d3fffd;
        border-bottom-color: #d3fffd;
        border-radius: 50%;
        -webkit-animation: reverse-loader 3s linear infinite;
        -moz-animation: reverse-loader 3s linear infinite;
        -o-animation: reverse-loader 3s linear infinite;
        animation: reverse-loader 3s linear infinite;
      }

      #loading-content:after {
        border: 3px solid transparent;
        border-top-color: #d3fffd;
        border-bottom-color: #d3fffd;
        border-radius: 60%;
        -webkit-animation: loader 5s linear infinite;
        animation: loader 5s linear infinite;
        -moz-animation: loader 5s linear infinite;
        -o-animation: loader 5s linear infinite;
      }

      @-webkit-keyframes loaders {
        0% {
          -webkit-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          -ms-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }

      @keyframes loader {
        0% {
          -webkit-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          -ms-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }

      @keyframes reverse-loader {
        0% {
          -webkit-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(-360deg);
          -ms-transform: rotate(-360deg);
          transform: rotate(-360deg);
        }
      }
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
