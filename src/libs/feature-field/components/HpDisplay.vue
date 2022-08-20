<template>
  <div>
    <h4 class="text">HP</h4>
    <h2 class="text">自分：{{ yourHp }}</h2>
    <h4 class="text">相手：{{ opponentHp }}</h4>
  </div>
</template>

<script>
export default {
  name: "HpDisplay",
  props: ["yourHp", "opponentHp"],
};
</script>

<style scoped>
.text {
  font-weight: 300;
}
</style>
