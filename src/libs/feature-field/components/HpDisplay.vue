<template>
  <div>
    <h4 class="text">HP</h4>
    <h2 class="text">自分：{{ yourHP }}</h2>
    <h4 class="text">相手：{{ opponentHP }}</h4>
  </div>
</template>

<script>
// HPの処理はバックエンドに移行するのでまだ書かない
export default {
  name: "HPDisplay",
  props: ["yourHP", "opponentHP"],
};
</script>

<style scoped>
.text {
  font-weight: 300;
}
</style>
