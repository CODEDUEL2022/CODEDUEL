<template>
  <header class="header-menu">
    <span class="title">CODE DUEL</span>
    <v-spacer></v-spacer>
    <v-btn class="btn">遊び方</v-btn>
  </header>
</template>
<script>
  export default {
    name: "Header",
  };
</script>
<style scoped lang="scss">
  .header-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color: transparent;
    @keyframes neon {
      0% {
        text-shadow: 0 0 10px #00fff2, 0 0 5px #fff, 0 0 13px #d3fffd;
      }
      100% {
        text-shadow: 0 0 10px #00fff2, 0 0 10px #fff, 0 0 0px #d3fffd;
      }
    }
    animation: neon 2s infinite alternate;
    .title {
      font-family: "Gill Sans", sans-serif;
      font-weight: 200;
      letter-spacing: 0.15em;
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
    }
  }
</style>
