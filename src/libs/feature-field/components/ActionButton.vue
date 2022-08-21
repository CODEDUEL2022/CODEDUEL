<template>
  <div class="container">
    <div
      v-if="isEnableAction"
      @click="$emit('handleAction')"
      class="action-button able"
    >
      <span>発動</span>
    </div>
    <div v-else class="action-button disable">
      <span>発動可能なカードを選択してください</span>
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
.action-button {
  margin: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 180px;
  height: 200px;
  padding: 2rem;
  position: relative;
  border: 4px solid #ff0000cb;
  background-color: transparent;
  box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.798);
}

.action-button.able {
  border: 4px solid #d3fffd;
  box-shadow: 0px 0px 20px #d3fffd;
}

.action-button::before,
.action-button::after {
  position: absolute;
  content: "";
  display: block;
}

.action-button::before {
  top: -3px;
  bottom: -3px;
  left: 10px;
  right: 10px;
}

.action-button::after {
  top: 10px;
  bottom: 10px;
  left: -3px;
  right: -3px;
}

.action-button span {
  position: relative;
  z-index: 1;
  color: #ff0000;
  font-size: 20px;
}

.action-button.able span {
  animation: neon_blink_text 1.5s infinite alternate;
  font-size: 32px;
}

.action-button.disable,
.action-button.disable::before,
.action-button.disable::after {
  background-color: #0e3145;
  cursor: not-allowed;
}

.action-button.able,
.action-button.able::before,
.action-button.able::after {
  animation: neon_blink 1.5s infinite alternate;
  cursor: pointer;
}

@keyframes neon_blink_text {
  0% {
    color: #d3fffd;
  }
  100% {
    color: #d3fffd;
  }
}

@keyframes neon_blink {
  0% {
    background-color: #186883;
  }
  100% {
    background-color: #2d909e;
  }
}

.action-button.able:hover,
.action-button.able:hover:before,
.action-button.able:hover:after {
  background-color: #39b8bb !important;
}
</style>
