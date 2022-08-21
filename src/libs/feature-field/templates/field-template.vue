<template>
  <div>
    <Header />
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
    <HpDisplay
      :yourName="yourName"
      :yourHp="yourHp"
      :opponentName="opponentName"
      :opponentHp="opponentHp"
    ></HpDisplay>
    <RoundDisplay :roundCount="roundCount"></RoundDisplay>
    <div class="field">
      <VueDrag
        v-model="selectedCardsData"
        group="yourGroup"
        @start="drag = true"
        @end="drag = false"
        :options="options"
        class="area"
      >
        <div
          v-for="select in selectedCardsData"
          :key="`first-${select.id}`"
          class="item"
        >
          <v-card height="242px" max-width="200px" hover class="black">
            <v-img
              aspect-ratio="475/400"
              height="242px"
              :src="require(`../../ui/assets/cards/${select.img}`)"
            >
            </v-img>
          </v-card>
        </div>
      </VueDrag>
    </div>
    <div>
      <VueDrag
        v-model="handleSelectCards"
        group="yourGroup"
        @start="drag = true"
        @end="drag = false"
        :options="options"
        class="area"
      >
        <div
          v-for="yours in yourCardsData"
          :key="`second-${yours.id}`"
          class="item"
        >
          <v-card hover class="black" height="222px">
            <v-img :src="require(`../../ui/assets/cards/${yours.img}`)">
            </v-img>
          </v-card>
        </div>
      </VueDrag>
    </div>
    <ActionButton
      :isEnableAction="isEnableAction"
      @handleAction="$emit('handleAction')"
    ></ActionButton>
  </div>
</template>

<script>
import ActionButton from "../components/ActionButton.vue";
import HpDisplay from "../components/HpDisplay.vue";
import RoundDisplay from "../components/RoundDisplay.vue";
import VueDrag from "vuedraggable";
import GeneralCutIn from "../components/GeneralCutIn.vue";
import ActionCutIn from "../components/ActionCutIn.vue";
import Header from "@/libs/layout/Header.vue";

export default {
  name: "FieldTemplate",
  components: {
    ActionButton,
    HpDisplay,
    RoundDisplay,
    VueDrag,
    GeneralCutIn,
    ActionCutIn,
    Header,
  },
  props: [
    "message",
    "showGeneralCutIn",
    "showActionCutIn",
    "isEnableAction",
    "action",
    "value",
    "yourName",
    "yourHp",
    "yourName",
    "opponentName",
    "opponentHp",
    "roundCount",
    "yourCardsData",
    "selectedCardsData",
    "yourGroup",
    "yourId",
    "yourImg",
    "selectedId",
    "selectedImg",
  ],
  data() {
    return {
      options: {
        group: "yourGroup",
        animation: 200,
      },
    };
  },
  computed: {
    handleSelectCards: {
      get() {
        return this.yourCardsData;
      },
      set(newVal) {
        this.$emit("handleSelectCards", newVal);
      },
    },
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

.item {
  margin: 10px;
  width: 12%;
}
</style>
