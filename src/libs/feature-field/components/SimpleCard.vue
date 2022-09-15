<template>
    <div class="grab">
      <v-img :src="require(`../../ui/assets/cards/${focusedCard.img}`)" />
    </div>
</template>

<script>
  export default {
    name: "SimpleCard",
    props: ["focusedCard"],
  };
</script>

<style scoped lang="scss">
  .grab {
    margin: 0.5rem;
    width: 15%;
    max-height: 222px;
    &:hover {
      cursor: grab;
    }

    &:active {
      cursor: grabbing;
    }
  }
</style>
