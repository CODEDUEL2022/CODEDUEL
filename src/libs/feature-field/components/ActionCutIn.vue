<template>
  <div class="overlay" @click="$emit('closeActionCutIn')">
    <div>
      <v-card height="475px" width="400px" class="black">
        <v-img src="../../ui/assets/cards/Angular.png" />
      </v-card>
    </div>
    <div class="dalayEffect">{{ action }} {{ value }} pt</div>
  </div>
</template>
<script>
export default {
  name: "ActionCutIn",
  props: ["action", "value"],
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
  animation-delay: 0.8s;
  /* opacityが戻らないようにする */
  animation-fill-mode: forwards;
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
