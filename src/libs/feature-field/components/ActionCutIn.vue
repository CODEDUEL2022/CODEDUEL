<template>
  <div class="overlay" @click="$emit('closeActionCutIn')">
    <div class="cards">
      <div
        class="cardParent"
        v-for="effectImage in effectImages"
        :key="effectImage.index"
      >
        <v-card
          height="345px"
          hover
          class="black"
        >
          <v-img :src="require(`../../ui/assets/cards/${effectImage}`)"></v-img>
        </v-card>
      </div>
    </div>
    <div class="dalayEffect">{{ actionType }} {{ actionPoint }} pt</div>
  </div>
</template>
<script>

import SimpleCard from "./SimpleCard.vue";

export default {
  name: "ActionCutIn",
  props: ["effectImages", "actionType", "actionPoint"],
  components: {
    SimpleCard,
  }
};
</script>
<style scoped>
.overlay {
  /*　要素を重ねた時の順番　*/
  z-index: 1;

  /*　画面全体を覆う設定　*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;
}

.dalayEffect {
  z-index: 3;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
  color: white;
  font-size: 100px;
  background: radial-gradient(#134e61, #102335);
  font: "Oxanium";
  opacity: 0;
  animation: SlideIn 0.4s;
  /* 0.8秒遅らせる */
  animation-delay: 0.6s;
  /* opacityが戻らないようにする */
  animation-fill-mode: forwards;
}

.cards {
  display: flex;
}

.cardParent {
  margin: 10px;
}

@keyframes SlideIn {
  0% {
    opacity: 0;
    transform: translate(-700px);
  }
  100% {
    opacity: 0.9;
    transform: translate(0);
  }
}
</style>
