<template>
  <header class="header-menu">
    <v-app-bar elevation="1" color="#263238">
      <!-- <v-toolbar-title color="#E8EAF6">PLbattle</v-toolbar-title>-->
      <span class="title">CODE DUEL</span>
      <v-spacer></v-spacer>
      <v-btn outlined class="btn">遊び方</v-btn>
    </v-app-bar>
  </header>
</template>
<script>
export default {
  name: "Header",
};
</script>
<style scoped>
.header-menu {
  background: #102335;
}

.title {
  color: #ffffff;
}

.btn {
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  text-decoration-color: transparent;
  margin: 1rem;
  justify-content: center;
  box-shadow: 0 0 0.75rem #d3fffd;
}
</style>
