<template>
  <div class="overlay">
    <p class="alone">{{ message }}</p>
  </div>
</template>
<script>
export default {
  name: "GeneralCutIn",
  props: ["message"],
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

.alone {
  font-size: 2.5rem;
  animation: neon_blink 2s infinite alternate;
}

@keyframes neon_blink {
  0% {
    text-shadow: 0 0 10px #00fff2, 0 0 5px #fff, 0 0 13px #d3fffd;
  }
  100% {
    text-shadow: 0 0 30px #00fff2, 0 0 15px #fff, 0 0 40px #d3fffd;
  }
}
</style>
