<template>
  <div class="item">
    <v-card hover class="grab">
      <v-img :src="require(`../../ui/assets/cards/${focusedCard.img}`)">
      </v-img>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "SimpleCard",
    props: ["focusedCard"],
  };
</script>

<style scoped lang="scss">
  .item {
    margin: 0.5rem;
    width: 15%;
    max-height: 222px;

    .grab {
      &:hover {
        cursor: grab;
      }

      &:active {
        cursor: grabbing;
      }
    }
  }
</style>
