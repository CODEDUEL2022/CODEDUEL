<template>
  <div>
    <span class="round">Round {{ roundCount }}</span>
  </div>
</template>

<script>
  export default {
    props: ["roundCount"],
  };
</script>

<style scoped lang="scss">
  .round {
    font-size: 2.5rem;
    font-weight: medium;
    letter-spacing: 0.15em;
    text-align: center;
    padding: 0 3rem 0.5rem 3rem;
    border-bottom: solid 2px #ff5c00;
    text-shadow: 0 0 20px #ff5c00;
  }
</style>
