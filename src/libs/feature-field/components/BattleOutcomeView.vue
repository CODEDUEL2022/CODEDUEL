<template>
    <div class="overWrap items">
      <p class="judge" v-if="judgeWin">Win!</p>
      <p class="judge" v-else>Lose...</p>
      <v-btn outlined class="btn big" @click="$emit('goHome')">
        <span>home</span>
      </v-btn>
    </div>
</template>

<script>
export default {
  props: ["judgeWin"]
}
</script>

<style scoped>
.items {
  display: flex;
  flex-direction: column;
}

.judge {
  font-size: 4rem;
  animation: neon_blink 2s infinite alternate;
}

.btn.big {
  width: 250px;
  height: 75px;
  margin: 1rem;
  justify-content: center;
  font-size: 28px;
  text-decoration: none;
  color: #ffffff;
  text-align: center;
  text-decoration-color: transparent;
  margin: 1rem;
  box-shadow: 0 0 0.75rem #d3fffd;
}

.overWrap {
  /*　要素を重ねた時の順番　*/
  z-index: 1;
  /*　画面全体を覆う設定　*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>