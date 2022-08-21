<template>
  <div class="container">
    <div class="action-button disable" v-if="isEnableAction">
      <span>発動</span>
    </div>
    <div
      @click="$emit('handleAction')"
      class="action-button able"
      v-if="isEnableAction"
    >
      <span>発動</span>
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
  width: fit-content;
  height: fit-content;
  padding: 2rem;
  position: relative;
  border: 4px solid #d3fffd;
  background-color: transparent;
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

.css-button span {
  position: relative;
  z-index: 1;
  color: #e8e8e8;
  font-size: 24px;
}

.action-button.able span {
  animation: neon_blink_text 1.5s infinite alternate;
}

.action-button.disable,
.action-button.disable::before,
.action-button.disable::after {
  background-color: #0e3d4c;
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
