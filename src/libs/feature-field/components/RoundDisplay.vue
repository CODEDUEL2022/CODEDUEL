<template>
  <div>
    <p class="round">Round {{ roundCount }}</p>
    <p>field {{ currentFieldName }}</p>
    <v-img :src="require(`../../ui/assets/OSfield_tip/${currentFieldImg}`)" width="40"></v-img>
  </div>
</template>

<script>
export default {
  name: "RoundDisplay",
  props: ["roundCount", "currentFieldName", "currentFieldImg"],
};
</script>

<style scoped></style>
