<template>
  <div class="overlay" @click.self="$emit('handleModalClose')">
    <div class="modal">
      <span class="close-btn" @click="$emit('handleModalClose')">×</span>
      <div v-if="modalContent == 'selectGameMode'" class="contents">
        <span class="modal-title">Choose Game Mode.</span>
        <div class="select">
          <div class="select-icon" @click="handleChangeFirstToSecond('human')">
            <span>
              <img src="../../ui/assets/bi_people-fill.svg" />
              <br />
              Play with Human
            </span>
          </div>
          <span>or</span>
          <div class="select-icon" @click="handleStart('cpu')">
            <span>
              <img src="../../ui/assets/bi_robot.svg" />
              <br />
              Play with CPU
            </span>
          </div>
        </div>
      </div>
      <div v-if="modalContent == 'selectMatchType'" class="contents">
        <span class="modal-title">Choose match type.</span>
        <div class="select">
          <div class="select-icon" @click="handleChangeSecondToThird('free')">
            <span>
              <img src="../../ui/assets/bi_people-fill.svg" />
              <br />
              free match
            </span>
          </div>
          <span>or</span>
          <div class="select-icon" @click="handleStart('random')">
            <span>
              <img src="../../ui/assets/bi_robot.svg" />
              <br />
              random match
            </span>
          </div>
        </div>
      </div>

      <div v-else-if="modalContent == 'inputRoomId'" class="contents">
        <span class="modal-title">Input room ID.</span>
        <span class="input-text">
          <input
            :value="roomId"
            type="text"
            placeholder="room ID:"
            @input="$emit('update:roomId', $event.target.value)"
          />
        </span>
        <span class="start-btn" @click="handleStart(roomId)"
          >＞ GAME START</span
        >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StartModal",
    props: ["roomId"],
    data() {
      return {
        modalContent: "selectGameMode",
      };
    },
    methods: {
      handleChangeFirstToSecond: function (gameMode) {
        this.modalContent = "selectMatchType";
        this.$emit("handleChangeFirstToSecond", gameMode);
      },
      handleChangeSecondToThird: function (matchType) {
        this.modalContent = "inputRoomId";
        this.$emit("handleChangeSecondToThird", matchType);
      },
      handleStart: function (roomId) {
        if (roomId == "cpu") {
          alert("Play with CPU.");
        }
        if (roomId == "random") {
          alert("Play random match.");
        }
        this.$emit("handleStart", roomId);
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
      min-height: 400px;
      height: fit-content;
      padding: 1rem;
      font-size: 1.25rem;
      border: 9px solid #d3fffd;
      background-color: #0e3145;
      box-shadow: 0px 0px 20px #d3fffd;
      z-index: 10;

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
        display: block;
        padding: 0;
        cursor: pointer;
        text-align: right;
        z-index: 10;
        text-shadow: none;
        animation: none;
      }

      .contents {
        display: flex;
        flex-direction: column;
        z-index: 10;

        .modal-title {
          font-size: 28px;
        }

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
          margin: 1rem 0;
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
          display: inline-block;
          width: fit-content;
          margin: 1rem auto;
          padding: 1rem;
          background-color: #186883;
          font-size: 1.25rem;

          &:hover {
            background-color: #2d909e;
            cursor: pointer;
          }
        }

        .auto-matching {
          font-size: 0.75rem;
          padding: 0.75rem;
        }
      }
    }
  }
</style>
