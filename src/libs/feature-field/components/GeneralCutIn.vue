<template>
  <div class="overlay">
    <div v-if="message === opponentName">
      <div class="message">
        It's <span>{{ message }}</span
        >'s turn.
      </div>
    </div>
    <div v-else>
      <p class="message">{{ message }}</p>
    </div>
    <div v-show="message === 'Matching...'">
      <div class="pulse-container">
        <div class="pulse-bubble pulse-bubble-1"></div>
        <div class="pulse-bubble pulse-bubble-2"></div>
        <div class="pulse-bubble pulse-bubble-3"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "GeneralCutIn",
    props: ["message", "opponentName"],
  };
</script>
<style scoped lang="scss">
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Gill Sans", sans-serif;
    font-weight: 200;
    font-size: 3.5rem;
    letter-spacing: 0.3rem;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;

    .message {
      width: 800px;
      animation: neon 2s infinite alternate;
      @keyframes neon {
        0% {
          text-shadow: 0 0 10px #00fff2, 0 0 5px #fff, 0 0 13px #d3fffd;
        }
        100% {
          text-shadow: 0 0 12px #00fff2, 0 0 10px #fff, 0 0 0px #d3fffd;
        }
      }

      span {
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }
    }

    .pulse-container {
      width: 120px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;

      .pulse-bubble {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #d3fffd;

        &.pulse-bubble-1 {
          animation: pulse 0.4s ease 0s infinite alternate;
        }
        &.pulse-bubble-2 {
          animation: pulse 0.4s ease 0.2s infinite alternate;
        }
        &.pulse-bubble-3 {
          animation: pulse 0.4s ease 0.4s infinite alternate;
        }
        @keyframes pulse {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0.25;
            transform: scale(0.75);
          }
        }
      }
    }
  }
</style>
