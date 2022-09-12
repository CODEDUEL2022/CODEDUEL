<template>
  <v-app style="background-blend-mode: multiply">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script></script>

<style scoped>
#app {
  font-family: "Gill Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  height: 100%;
  color: #ffffff;
  background-image: url("/src/libs/ui/assets/Component 72.png");
  background-color: radial-gradient(#144f61, #020508);
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
