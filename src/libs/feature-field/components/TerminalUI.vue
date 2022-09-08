<template>
<div class="action-list">
  <div>></div>
  <div v-for="option in attackOptions" :key="option.comboId">
    <div>>  action : {{ option.nameEn }}</div>
    <div>>  必要なカード：{{ option.nameList }}</div>
  </div>
</div>
</template>

<script>
export default {
    name: "TerminalUI",
    props: ["attackOptions"]
}
</script>

<style scoped>
.action-list {
  padding: 1rem;
  height: 300px;
  width: 100%;
  border: 2px solid #d3fffd;
  box-shadow: 0px 0px 50px #d3fffd;
  overflow-x: hidden;
}
</style>