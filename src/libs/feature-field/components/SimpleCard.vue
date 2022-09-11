<template>
  <div class="item">
    <v-card hover class="black">
      <v-img :src="require(`../../ui/assets/new-cards/${focusedCard.img}`)">
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

<style scoped>
.item {
  margin: 0.5rem;
  width: 15%;
  max-height: 222px;
}
</style>
