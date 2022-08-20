<template>
  <v-app>
    <GeneralCutIn :message="message" />
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
// import io from "socket.io-client"

export default {
  name: "FieldTemplate",
  components: {
    ActionButton,
    HpDisplay,
    RoundDisplay,
    VueDrag,
    GeneralCutIn,
    },
    data() {
        return {
            // draganddrop用のデータ
            options: {
                group: "myGroup",
                animation: 200,
            },
            myData: [],
            selectedData: [],
            message: message,
        };
    },
    created() {
    this.myData = []
    const searchParams = new URLSearchParams(window.location.search);
    console.log(this.myData)
    // カードをドローする処理
    this.$axios
      .post("/cardDraw", {
        cardData: this.myData,
        playerId: searchParams.get("id"),
      })
      .then((res) => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          this.myData.push(res.data[i]);
        }
        console.log(this.myData);
        console.log("hogehoge");
      });
    }
}
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
