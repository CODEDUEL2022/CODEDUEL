<template>
  <div>
    <div
      v-if="isEnableAction"
      @click="$emit('handleAction')"
      class="action-button able"
    >
      <span>発動</span>
    </div>
    <div v-else class="action-button disable" @click="errorSE.play()">
      <span>ERROR : Select cards.</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ActionButton",
    props: ["isEnableAction"],
    data() {
      return {
        ableToActionSE: new Audio(
          require("/src/libs/ui/assets/sounds/able-to-action.mp3")
        ),
        errorSE: new Audio(require("/src/libs/ui/assets/sounds/error.mp3")),
      };
    },
    methods: {
      ableToAction: function () {
        if (isEnableAction == true) {
          this.ableToActionSE.play();
        }
      },
    },
  };
</script>

<style scoped>
  .action-button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 180px;
    height: 120px;
    padding: 1.25rem 2rem;
    margin-top: 0.5rem;
    position: relative;
    border: 5px solid #ff0000;
    background-color: transparent;
    box-shadow: 0px 0px 20px #ff0000;
  }

  .action-button.able {
    border: 5px solid #d3fffd;
    box-shadow: 0px 0px 20px #d3fffd;
  }

  .action-button::before,
  .action-button::after {
    position: absolute;
    content: "";
    display: block;
  }

  .action-button::before {
    top: -4px;
    bottom: -4px;
    left: 20px;
    right: 20px;
  }

  .action-button::after {
    top: 20px;
    bottom: 20px;
    left: -4px;
    right: -4px;
  }

  .action-button span {
    position: relative;
    z-index: 1;
    color: #ff0000;
    font-size: 1.25rem;
  }

  .action-button.able span {
    color: #d3fffd;
    font-size: 1.5rem;
    text-shadow: 0 0 10px #d3fffd;
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

  @keyframes neon_blink {
    0% {
      background-color: #134e61;
    }
    100% {
      background-color: #1a849b;
    }
  }

  .action-button.able:hover,
  .action-button.able:hover:before,
  .action-button.able:hover:after {
    animation: fadein 0.5s forwards;
  }
  @keyframes fadein {
    0% {
      background-color: #1a849b;
    }
    100% {
      background-color: #30a4a7;
    }
  }
</style>
