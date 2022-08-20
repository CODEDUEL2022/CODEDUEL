<template>
    <v-btn @click="useCards" class="btn action" v-if="attack_decision">発動</v-btn>
    <p v-else>発動可能なカードを選択してください</p>
</template>

<script>

</script>

<style scoped>
.btn {
  margin-right: 1rem;
  width: 100px;
}

.btn.action {
  color: #102335;
  border: 1px solid #d3fffd;
  box-shadow: 0px 0px 20px #d3fffd;
}
</style>