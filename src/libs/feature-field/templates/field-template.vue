<template>
  <v-app>
    <GeneralCutIn :message="message" />
    <div v-show="showCutIn">
      <ActionCutIn @closeActionCutIn="$emit('closeActionCutIn')" />
    </div>
    <ActionButton></ActionButton>
    <HpDisplay></HpDisplay>
    <RoundDisplay></RoundDisplay>
    <div class="field">
      <VueDrag
        v-model="selectedData"
        group="myGroup"
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
      v-model="myData"
      group="myGroup"
      @start="drag = true"
      @end="drag = false"
      :options="options"
      class="area"
    >
      <div v-for="mine in myData" :key="`second-${mine.id}`" class="item">
        <v-card hover class="black" height="222px">
          <v-img :src="require(`../../ui/assets/cards/${mine.img}`)"> </v-img>
        </v-card>
      </div>
    </VueDrag>
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
  props: ["message", "showCutIn"],
  data() {
    return {
      myData: [
        {
          id: 1,
          name: "Javascript",
          type: "language",
          img: "JavaScript.png",
          action: "attack",
          value: 10,
          field: "",
          set_id: 0,
        },
        {
          id: 2,
          name: "HTML",
          type: "language",
          img: "HTML.png",
          action: "attack",
          value: 10,
          field: "",
          set_id: 0,
        },
        {
          id: 3,
          name: "CSS",
          type: "language",
          img: "CSS.png",
          action: "attack",
          value: 10,
          field: "",
          set_id: 0,
        },
        {
          id: 4,
          name: "Django",
          type: "framework",
          img: "Django.png",
          action: "attack",
          value: 20,
          field: "LinuxOS",
          set_id: 10,
        },
        {
          id: 5,
          name: "FastAPI",
          type: "framework",
          img: "FastAPI.png",
          action: "attack",
          value: 10,
          field: "LinuxOS",
          set_id: 10,
        },
        {
          id: 6,
          name: "jQuery",
          type: "framework",
          img: "jQuery.png",
          action: "attack",
          value: 10,
          field: "",
          set_id: 10,
        },
      ],
      selectedData: [],
      message: message,
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

.item {
  margin: 10px;
  width: 12%;
}
</style>
