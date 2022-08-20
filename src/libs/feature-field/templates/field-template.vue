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
    <HpDisplay :yourHp="yourHp" :opponentHp="opponentHp"></HpDisplay>
    <RoundDisplay :roundCount="roundCount"></RoundDisplay>
    <div class="field">
      <VueDrag
        v-model="selectedData"
        group="yourGroup"
        @start="drag = true"
        @end="drag = false"
        :options="options"
        class="area"
      >
        <div
          v-for="select in selectedData"
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
    <VueDrag
      v-model="yourData"
      group="yourGroup"
      @start="drag = true"
      @end="drag = false"
      :options="options"
      class="area"
    >
      <div v-for="yours in yourData" :key="`second-${yours.id}`" class="item">
        <v-card hover class="black" height="222px">
          <v-img :src="require(`../../ui/assets/cards/${yours.img}`)"> </v-img>
        </v-card>
      </div>
    </VueDrag>
    <ActionButton
      :isEnableAction="isEnableAction"
      @handleAction="$emit('handleAction')"
    ></ActionButton>
  </v-app>
</template>

<script>
import ActionButton from "../components/ActionButton.vue";
import HpDisplay from "../components/HpDisplay.vue";
import RoundDisplay from "../components/RoundDisplay.vue";
import VueDrag from "vuedraggable";
import GeneralCutIn from "../components/GeneralCutIn.vue";
import ActionCutIn from "../components/ActionCutIn.vue";

export default {
  name: "FieldTemplate",
  components: {
    ActionButton,
    HpDisplay,
    RoundDisplay,
    VueDrag,
    GeneralCutIn,
    ActionCutIn,
  },
  props: [
    "message",
    "showGeneralCutIn",
    "showActionCutIn",
    "isEnableAction",
    "action",
    "value",
    "yourHp",
    "opponentHp",
    "roundCount",
  ],
  data() {
    return {
      // draganddrop用のデータ
      options: {
        group: "yourGroup",
        animation: 200,
      },
      yourData: [],
      selectedData: [],
      message: message,
    };
  },
  created() {
    this.yourData = [];
    const searchParams = new URLSearchParams(window.location.search);
    console.log(this.yourData);
    // カードをドローする処理
    this.$axios
      .post("/cardDraw", {
        cardData: this.yourData,
        playerId: searchParams.get("id"),
      })
      .then((res) => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          this.yourData.push(res.data[i]);
        }
        console.log(this.yourData);
        console.log("hogehoge");
      });
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
