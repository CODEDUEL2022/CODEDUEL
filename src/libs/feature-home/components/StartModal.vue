<template>
  <div class="overlay" @click.self="$emit('handleModalClose')">
    <div class="modal">
      <span>Hello, {{ userName }}!!</span>
      <span class="close-btn" @click="$emit('handleModalClose')">×</span>
      <div v-if="modalContent == 'selectGameMode'" class="contents">
        <span class="modal-title gameMode">Choose Game Mode.</span>
        <div class="select">
          <div class="select-icon" @click="handleChangeFirstToSecond('human')">
            <span>
              <img src="../../ui/assets/people.png" decoding="async"/>
              <br />
              <span>Play against Human</span>
            </span>
          </div>
          <span>or</span>
          <div class="select-icon" @click="handlePushCPUPage()">
            <span>
              <img src="../../ui/assets/cpu.png" decoding="async"/>
              <br />
              <span>Play against CPU</span>
            </span>
          </div>
        </div>
        <span class="back-btn" @click="$emit('handleModalClose')">＜ back</span>
      </div>
      <div v-if="modalContent == 'selectMatchType'" class="contents">
        <span class="modal-title matchType">Choose match type.</span>
        <div class="select">
          <div class="select-icon" @click="handleChangeSecondToThird('free')">
            <span>
              <img src="../../ui/assets/custom-match.png" decoding="async"/>
              <br />
              <span>Custom match</span>
            </span>
          </div>
          <span>or</span>
          <div class="select-icon" @click="handlePushAutoMatching()">
            <span>
              <img src="../../ui/assets/random-match.png" decoding="async"/>
              <br />
              <span>Random match</span>
            </span>
          </div>
        </div>
        <span class="back-btn" @click="handleBackToFirst">＜ back</span>
      </div>

      <div v-if="modalContent == 'inputRoomId'" class="contents">
        <span class="modal-title roomId">Input room ID.</span>
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
        <span class="back-btn" @click="handleBackToSecond">＜ back</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StartModal",
    props: ["roomId", "userName"],
    data() {
      return {
        selectSE: new Audio(require("/src/libs/ui/assets/sounds/select.mp3")),
        backSE: new Audio(require("/src/libs/ui/assets/sounds/back.mp3")),
        modalContent: "selectGameMode",
      };
    },
    methods: {
      handleChangeFirstToSecond: function () {
        this.selectSE.play();
        this.modalContent = "selectMatchType";
      },
      handleChangeSecondToThird: function () {
        this.selectSE.play();
        this.modalContent = "inputRoomId";
      },
      handleStart: function (roomId) {
        this.$emit("handleStart", roomId);
      },
      handlePushCPUPage: function () {
        this.$emit("handlePushCPUPage");
      },
      handlePushAutoMatching: function () {
        this.$emit("handlePushAutoMatching");
      },
      handleBackToFirst: function () {
        this.backSE.play();
        this.modalContent = "selectGameMode";
      },
      handleBackToSecond: function () {
        this.backSE.play();
        this.modalContent = "selectMatchType";
      },
    },
  };
</script>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    .modal {
      position: relative;
      width: 500px;
      min-height: 400px;
      height: fit-content;
      margin: auto;
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
            text-shadow: 0 0 20px #00fff2, 0 0 10px #fff, 0 0 0px #d3fffd;
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
        display: grid;
        place-items: center;
        align-items: top;
        min-height: 325px;
        z-index: 10;

        .modal-title {
          &.gameMode {
            width: 23ch;
          }

          &.matchType {
            width: 22ch;
          }
          &.roomId {
            width: 16ch;
          }
          text-align: center !important;
          font-size: 28px;
          display: block;
          overflow: hidden;
          white-space: nowrap;
          animation: typing 1.25s steps(15), caret 1s steps(1) infinite,
            neon 2s infinite alternate;
          border-right: 1px solid transparent;

          @keyframes typing {
            from {
              width: 0;
            }
          }
          @keyframes caret {
            50% {
              border-right-color: #ffffff;
            }
          }
        }

        .select {
          display: flex;
          align-items: center;
          padding: 1rem;
          z-index: 100;

          .select-icon {
            margin: 1rem;
            min-width: 165px;
            span {
              padding: 1.25rem 0;
              font-size: 1.15rem;
            }

            &:hover {
              cursor: pointer;
              animation: fadein 0.5s forwards;
              @keyframes fadein {
                0% {
                  background-color: transparent;
                }
                100% {
                  background-color: #134e61;
                }
              }
            }
          }
        }

        .input-text {
          margin-top: 3rem;
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
          margin: 3rem auto 2rem auto;
          padding: 1rem;
          background-color: #0e3145;
          font-size: 1.25rem;

          &:hover {
            cursor: pointer;
            animation: fadein 0.5s forwards !important;
            @keyframes fadein {
              0% {
                background-color: #0e3145;
              }
              100% {
                background-color: #134e61;
              }
            }
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
