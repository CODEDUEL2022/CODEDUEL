<template>
  <div class="container">
    <div class="wrapper">
      <div class="bg-square"></div>
      <div
        data-augmented-ui="tl-2-rect tr-2-rect bl-2-rect br-2-rect none"
        class="btn shadow"
        @click="$emit('handleAction')"
        v-if="isEnableAction"
      >
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/augmented-ui@2/augmented-ui.min.css"
        />
        <span>発動</span>
      </div>
      <p v-else>発動可能なカードを選択してください</p>
    </div>

    <div class="wrapper">
      <div class="bg-square"></div>
      <div
        data-augmented-ui="tl-2-rect tr-2-rect bl-2-rect br-2-rect none"
        class="btn shadow"
        @click="$emit('handleAction')"
        v-if="isEnableAction"
      >
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/augmented-ui@2/augmented-ui.min.css"
        />
        <span>発動</span>
      </div>
      <p v-else>発動可能なカードを選択してください</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionButton",
  props: ["isEnableAction"],
};
</script>

<style scoped>
.container {
  display: flex;
}
.wrapper {
  bottom: 1rem;
  right: 1rem;
}
.bd-square {
  box-shadow: 0px 0px 50px #d3fffd;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  width: 10em;
  height: 10em;
  background-color: #144f61;
}

.btn:hover {
  background-color: #41bfb9;
}

.btn span {
  z-index: 1;
  color: #d3fffd;
}
</style>
