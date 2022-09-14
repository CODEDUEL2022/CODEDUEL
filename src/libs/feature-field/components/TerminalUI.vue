<template>
  <div class="action-list">
    <div v-if="attackOptions.length > 0">
      <div v-for="option in attackOptions" :key="option.comboId">
        <div>> action : {{ option.nameEn }}</div>
        <div>> 必要なカード：{{ option.nameList }}</div>
      </div>
    </div>
    <div v-else>></div>
  </div>
</template>

<script>
  export default {
    name: "TerminalUI",
    props: ["attackOptions"],
  };
</script>

<style scoped>
  .action-list {
    font-size: 1rem;
    padding: 1rem;
    height: 15rem;
    width: 180px;
    border: 1px solid #d3fffd;
    box-shadow: 0px 0px 10px #d3fffd;
    overflow-x: hidden;
  }
</style>
