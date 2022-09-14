<template>
  <div>
    <Header
      :isHowToPlayOpen="isHowToPlayOpen"
      @handleShowHowToPlay="handleShowHowToPlay"
      @handleHowToPlayModalClose="$emit('handleHowToPlayModalClose')"
    />
    <div class="home-container">
      <div class="code-duel">
        <span>CODE DUEL</span>
        <br />
        <div class="line"></div>
      </div>
      <div class="firstSetting">
        <div class="setting">
          <span class="input-text">
            <p>Input your name</p>
            <input
              :value="userName"
              type="text"
              placeholder="user name:"
              @input="$emit('update:userName', $event.target.value)"
            />
          </span>
        </div>
        <div class="setting">
          <p>Select your Deck</p>
          <div class="deck-btn" @click="$emit('openDeckModal')">
            <span>&emsp;Deck {{ $store.state.selectedDeck }}</span>
            <v-img src="../../ui/assets/inverted-triangle.svg" class="icon" width="40" height="40"></v-img>
          </div>
        </div>
      </div>
      <div class="play-btn" @click="handleModalOpen(userName)">
        <span>＞ PLAY</span>
      </div>
      <StartModal
        v-if="isStartModalOpen"
        :userName="userName"
        :roomId.sync="roomId"
        @handleModalClose="$emit('handleModalClose')"
        @handleStart="handleStart"
        @handlePushCPUPage="handlePushCPUPage"
        @handlePushAutoMatching="handlePushAutoMatching"
      />
      <SelectDeckModal
        v-if="isDeckModalOpen"
        :deckImg="deckImg"
        @closeDeckModal="$emit('closeDeckModal')"
        @getDeckCardsImg="getDeckCardsImg"
      ></SelectDeckModal>
    </div>
  </div>
</template>
<script>
import Header from "/src/libs/layout/Header.vue";
import StartModal from "@/libs/feature-home/components/StartModal.vue";
import SelectDeckModal from "../components/SelectDeckModal.vue";

export default {
  name: "HomeTemplate",
  components: {
    Header,
    StartModal,
    SelectDeckModal,
  },
  props: [
    "isStartModalOpen",
    "isDeckModalOpen",
    "selectedDeck",
    "roomId",
    "userName",
    "deckImg",
    "isHowToPlayOpen",
  ],
  methods: {
    handleShowHowToPlay: function () {
      this.$emit("handleShowHowToPlay");
    },
    handleModalOpen: function (userName) {
      if (!userName) {
        alert("ERROR! : Input your name.");
        return;
      }
      console.log(userName);
      this.$emit("handleModalOpen", userName);
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
    receiveDeckFromChild: function (receivedDeck) {
      this.receivedDeck = receivedDeck;
    },
    getDeckCardsImg: function () {
      this.$emit("getDeckCardsImg");
      console.log("aaa");
    },
  },
};
</script>
<style scoped lang="scss">
.home-container {
  font-family: "Gill Sans", sans-serif;
  font-weight: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10rem;
  text-align: center;
  animation: neon 2s infinite alternate;
  @keyframes neon {
    0% {
      text-shadow: 0 0 10px #00fff2, 0 0 5px #fff, 0 0 13px #d3fffd;
    }
    100% {
      text-shadow: 0 0 12px #00fff2, 0 0 10px #fff, 0 0 0px #d3fffd;
    }
  }

  .code-duel {
    margin-bottom: 2rem;
    font-size: 4rem;
    letter-spacing: 0.15em;
    @keyframes title-blink {
      from,
      to {
        border-color: #ffffff;
      }
      50% {
        border-color: #ffffff;
      }
    }
    animation: title-blink 3s;

    span {
      width: fit-content;
      padding: 0 0 2rem;
      font-weight: light;
      animation: blurAnime 3s forwards;

      hr {
        width: 50%;
        color: #ffffff;
      }

      @keyframes blurAnime {
        from {
          filter: blur(10px);
          transform: scale(1.02);
          opacity: 0;
        }

        to {
          filter: blur(0);
          transform: scale(1);
          opacity: 1;
        }
      }
    }
    .line {
      margin-top: 1rem;
      margin-bottom: 3rem;
      height: 2px;
      background-image: linear-gradient(
        to left,
        transparent,
        #d3fffd,
        transparent
      );
    }
  }

  .firstSetting {
    display: flex;
    justify-content: space-between;
    .setting {
      margin-left: 32px;
      margin-right: 32px;
    }
  }
  .input-text {
    cursor: text;

    p {
      font-size: 1.5rem;
    }

    input {
      width: 220px;
      padding: 0.5rem;
      border-top: solid 1px #d3fffd;
      border-bottom: solid 2px #d3fffd;
      font-size: 1rem;
      color: #ffffff;
    }
  }
  .play-btn {
    margin: 5rem;
    width: fit-content;
    padding: 0.75rem 3rem;
    position: relative;
    border: 4px solid #d3fffd;
    background-color: #0e3145;
    box-shadow: 0px 0px 20px #d3fffd;
    cursor: pointer;

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

    &::before {
      background-color: #0e3145;
      position: absolute;
      content: "";
      display: block;
      top: -3px;
      bottom: -3px;
      left: 10px;
      right: 10px;
    }

    &::after {
      background-color: #0e3145;
      position: absolute;
      content: "";
      display: block;
      top: 10px;
      bottom: 10px;
      left: -3px;
      right: -3px;
    }

    span {
      position: relative;
      z-index: 1;
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
  }

  .play-btn:hover,
  .play-btn:hover:before,
  .play-btn:hover:after {
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

  .deck-btn {
      border-top: solid 1px #d3fffd;
      border-bottom: solid 2px #d3fffd;
      width: 220px;
      display: flex;
      cursor: pointer;

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

      span {
        font-size: 24px;
        width: 90%;
      }

      .icon {
        width: 10%;
      }
      
      animation: neon 2s infinite alternate;
    }
  }

  .deck-btn:hover,
  .deck-btn:hover:before,
  .deck-btn:hover:after {
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

  p {
    margin-top: 32px;
    font-size: 1.5rem;
  }

  .tempolary-btn {
    font-size: 1rem;
  }


@media screen and (max-width: 959px) {
  /* 959px以下に適用されるCSS（タブレット用） */
}
@media screen and (max-width: 480px) {
  /* 480px以下に適用されるCSS（スマホ用） */
}
</style>
