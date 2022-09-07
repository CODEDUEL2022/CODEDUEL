<template>
  <div class="overlay" @click.self="$emit('handleModalClose')">
    <div class="modal">
      <div class="close-btn">
        <span @click="$emit('handleModalClose')">×</span>
      </div>
      <!--step1: 人かcpuを選択-->
      <div v-if="firstStep" class="contents">
        <span>Choose Game Mode.</span>
        <div class="select">
          <div class="select-icon" @click="changeModalContent('human')">
            <span>
              <img src="../../ui/assets/bi_people-fill.svg" />
              <br />
              Play with Human
            </span>
          </div>
          <span>or</span>
          <div class="select-icon" @click="changeModalContent('cpu')">
            <span>
              <img src="../../ui/assets/bi_robot.svg" />
              <br />
              Play with CPU
            </span>
          </div>
        </div>
      </div>

      <!--step2: roomIdの入力-->
      <div v-if="secondStep" class="contents">
        <span>Input room ID.</span>
        <span class="input-text">
          <input
            v-model="roomId"
            type="text"
            placeholder="room ID:"
            @input="$emit('update:roomId', $event.target.value)"
          />
        </span>
        <div class="start-btn" @click="handleStart(gameMode, roomId)">
          <span class="start-btn">＞ GAME START</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StartModal",
    props: ["isStartModalOpen", "gameMode", "roomId"],
    data() {
      return {
        firstStep: true,
        secondStep: false,
      };
    },
    methods: {
      changeModalContent: function (gameMode) {
        this.gameMode = gameMode;
        console.log(this.gameMode);
        this.firstStep = false;
        this.secondStep = true;
      },
      handleStart: function (gameMode, roomId) {
        console.log(gameMode);
        console.log(roomId);
        this.$emit("handleStart", gameMode, roomId);
      },
    },
    computed: {
      changeRoomId: function (roomId) {
        return (this.roomId = roomId);
      },
      changeGameMode: function (gameMode) {
        return (this.gameMode = gameMode);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;

    .modal {
      position: relative;
      width: 500px;
      height: 400px;
      padding: 1rem;
      border: 9px solid #d3fffd;
      background-color: #0e3145;
      box-shadow: 0px 0px 20px #d3fffd;

      &::before {
        background-color: #0e3145;
        position: absolute;
        content: "";
        display: block;
        top: -8px;
        bottom: -8px;
        left: 40px;
        right: 40px;
      }

      &::after {
        background-color: #0e3145;
        position: absolute;
        content: "";
        display: block;
        top: 40px;
        bottom: 40px;
        left: -8px;
        right: -8px;
      }

      span {
        position: relative;
        z-index: 10;
        font-size: 28px;
        letter-spacing: 0.15em;
        @keyframes neon {
          0% {
            text-shadow: 0 0 10px #00fff2, 0 0 5px #fff, 0 0 13px #d3fffd;
          }
          100% {
            text-shadow: 0 0 30px #00fff2, 0 0 15px #fff, 0 0 0px #d3fffd;
          }
        }
        animation: neon 2s infinite alternate;
      }

      .close-btn {
        cursor: pointer;
        text-align: right;
        span {
          z-index: 10;
          font-size: 2rem;
          text-shadow: none;
          animation: none;
        }
      }

      .contents {
        display: flex;
        flex-direction: column;
        z-index: 10;

        .select {
          display: flex;
          align-items: center;
          padding: 1rem;

          .select-icon {
            margin: 1rem;
            min-width: 165px;
            span {
              font-size: 1.15rem;
            }
            &:hover {
              cursor: pointer;
              background-color: #186883;
            }
          }
        }

        .input-text {
          margin: 2rem 0;
          cursor: text;

          input {
            padding: 0.5rem;
            border-top: solid 1px #d3fffd;
            border-bottom: solid 2px #d3fffd;
            font-size: 1rem;
            color: #ffffff;
          }
        }

        .start-btn {
          margin-top: 1rem;
          padding: 1rem;
          background-color: #186883;
          font-size: 1.5rem;

          &:hover {
            background-color: #2d909e;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
