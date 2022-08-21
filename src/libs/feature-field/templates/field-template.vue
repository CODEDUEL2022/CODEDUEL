<template>
  <v-app>
    <div v-show="showGeneralCutIn">
      <GeneralCutIn
        :message="message"
        @closeGeneralCutIn="$emit('closeGeneralCutIn')"
      />
    </div>
    <div v-show="showActionCutIn">
      <ActionCutIn
        :action="action"
        :value="value"
        @closeActionCutIn="$emit('closeActionCutIn')"
      />
    </div>
    <HPDisplay :yourHP="yourHP" :opponentHP="opponentHP"></HPDisplay>
    <RoundDisplay :roundCount="roundCount"></RoundDisplay>
    <v-row>
      <v-col cols="3">
        <TerminalUI :attackOptions="attackOptions"></TerminalUI>
      </v-col>
      <v-col cols="9">
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
              :key="`first-${card.id}`"
            ></SimpleCard>
          </VueDrag>
        </div>
      </v-col>
    </v-row>
    <div>
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
          :key="`second-${yours.id}`"
        ></SimpleCard>
      </VueDrag>
    </div>
    <ActionButton
      :isEnableAction="isEnableAction"
      @handleAction="$emit('handleAction')"
    ></ActionButton>
  </v-app>
</template>

<script>
import ActionButton from "../components/ActionButton.vue";
import HPDisplay from "../components/HPDisplay.vue";
import RoundDisplay from "../components/RoundDisplay.vue";
import VueDrag from "vuedraggable";
import GeneralCutIn from "../components/GeneralCutIn.vue";
import ActionCutIn from "../components/ActionCutIn.vue";
import TerminalUI from "../components/TerminalUI.vue";
import SimpleCard from "../components/SimpleCard.vue";

export default {
  name: "FieldTemplate",
  components: {
    ActionButton,
    HPDisplay,
    RoundDisplay,
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
    "action",
    "value",
    "yourHP",
    "opponentHP",
    "roundCount",
    "yourCardsData",
    "selectedCardsData",
    "yourGroup",
    "yourId",
    "yourImg",
    "selectedId",
    "selectedImg",
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

<style scoped>
.field {
  height: 300px;
  width: 100%;
  background: rgba(211, 255, 253);
  border: 2px solid #d3fffd;
  box-shadow: 0px 0px 50px #d3fffd;
}

.area {
  display: flex;
  justify-content: stretch;
  width: 1500px;
  height: 300px;
}
</style>
