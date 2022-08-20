<template>
  <v-app>
    <header class="header-menu"></header>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script></script>

<style scoped>
template {
  margin: 0px;
}
#app {
  font-family: "Chakra Petch", sanserif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #ffffff;
  background: radial-gradient(#134e61, #102335);
}
.header-menu {
  background: #102335;
}
v-main {
  margin: 0;
  max-width: 1440px;
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
