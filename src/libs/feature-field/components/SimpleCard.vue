<template>
<div class="item">
  <v-card height="222px" hover class="black">
    <v-img :src="require(`../../ui/assets/cards/${focusedCard.img}`)">
    </v-img>
  </v-card>
</div>
</template>

<script>
export default {
    name: "SimpleCard",
    props: ["focusedCard"]
}
</script>

<style scoped>
.item {
  margin: 10px;
  width: 12%;
}
</style>

