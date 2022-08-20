<template>
  <div data-augmented-ui="tl-round-inset both" class="styleme">
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/augmented-ui@2/augmented-ui.min.css">
      <v-btn @click="$emit('handleAction')" class="btn action" v-if="isEnableAction"
        >発動</v-btn>
      <p v-else>発動可能なカードを選択してください</p>
    </div>
</template>

<script>
export default {
  name: "ActionButton",
  props: ["isEnableAction"],
};
</script>

<style scoped>
.btn {
  margin: 2rem;
  width: 100px;
}

.btn.action {
  color: #102335;
  border: 1px solid #d3fffd;
  box-shadow: 0px 0px 20px #d3fffd;
}
</style>
