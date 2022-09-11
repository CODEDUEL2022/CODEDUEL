<template>
  <header class="header-menu">
    <span class="title">CODE DUEL</span>
    <v-spacer></v-spacer>
    <v-btn outlined class="btn">遊び方</v-btn>
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
      box-shadow: 0 0 0.75rem #d3fffd;
    }
  }
</style>
