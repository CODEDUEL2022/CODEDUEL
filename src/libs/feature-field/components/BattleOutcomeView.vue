<template>
  <div class="overWrap items">
    <p class="judge" v-if="judgeWin">Win!</p>
    <p class="judge" v-else>Lose...</p>
    <v-btn class="home-btn" @click="$emit('goHome')">
      <span>home</span>
    </v-btn>
  </div>
</template>

<script>
  export default {
    props: ["judgeWin"],
  };
</script>

<style scoped lang="scss">
  .overWrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Gill Sans", sans-serif;
    font-weight: 200;
    font-size: 4rem;
    letter-spacing: 0.15rem;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;

    .judge {
      animation: neon 2s infinite alternate;
      @keyframes neon {
        0% {
          text-shadow: 0 0 10px #00fff2, 0 0 5px #fff, 0 0 13px #d3fffd;
        }
        100% {
          text-shadow: 0 0 12px #00fff2, 0 0 10px #fff, 0 0 0px #d3fffd;
        }
      }
    }

    .home-btn {
      background-color: #0e3145;
      color: #ffff;
      font-size: 1.75rem;
      font-weight: 100;
      padding: 2rem;
      margin: 1rem;
      border: none;
      border-radius: 0;
    }
  }
</style>
