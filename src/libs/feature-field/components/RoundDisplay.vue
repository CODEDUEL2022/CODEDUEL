<template>
  <div>
    <p class="round">Round {{ roundCount }}</p>
  </div>
</template>

<script>
export default {
  name: "RoundDisplay",
  props: ["roundCount"],
};
</script>

<style scoped></style>
