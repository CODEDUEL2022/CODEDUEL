<template>
  <header class="header-menu">
    <span class="title">CODE DUEL</span>
    <v-spacer></v-spacer>
    <v-btn class="btn" @click="handleShowHowToPlay()">遊び方</v-btn>
    <HowToPlay
      v-if="isHowToPlayOpen"
      @handleHowToPlayModalClose="$emit('handleHowToPlayModalClose')"
    />
  </header>
</template>
<script>
import HowToPlay from "/src/libs/ui/HowToPlay/HowToPlay.vue";
export default {
  name: "Header",
  components: {
    HowToPlay,
  },
  props: ["isHowToPlayOpen"],
  methods: {
    handleShowHowToPlay: function () {
      this.$emit("handleShowHowToPlay");
    },
  },
};
</script>
<style scoped lang="scss">
.header-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background-color: transparent;

  .title {
    font-family: "Gill Sans", sans-serif;
    font-weight: 200;
    letter-spacing: 0.15em;
    @keyframes neon {
      0% {
        text-shadow: 0 0 10px #00fff2, 0 0 5px #fff, 0 0 13px #d3fffd;
      }
      100% {
        text-shadow: 0 0 10px #00fff2, 0 0 10px #fff, 0 0 0px #d3fffd;
      }
    }
    animation: neon 2s infinite alternate;
  }

  .btn {
    background-color: #0e3145;
    color: #ffff;
    text-align: center;
    text-decoration: none;
    text-decoration-color: transparent;
    margin: 1rem;
    justify-content: center;
    border: none;
    border-radius: 0;
    @keyframes neon {
      0% {
        text-shadow: 0 0 10px #00fff2, 0 0 5px #fff, 0 0 13px #d3fffd;
      }
      100% {
        text-shadow: 0 0 10px #00fff2, 0 0 10px #fff, 0 0 0px #d3fffd;
      }
    }
    animation: neon 2s infinite alternate;
  }
}
</style>
