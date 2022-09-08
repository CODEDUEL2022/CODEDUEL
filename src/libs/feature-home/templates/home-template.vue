<template>
  <div>
    <Header />
    <div class="home-container">
      <div class="code-duel">
        <span>CODE DUEL</span>
        <br />
        <div class="line"></div>
      </div>
      <div class="play-btn" @click="$emit('handleModalOpen')">
        <span>＞ PLAY</span>
      </div>
      <StartModal
        v-if="isStartModalOpen"
        :roomId.sync="roomId"
        :isStartModalOpen="isStartModalOpen"
        @handleModalClose="$emit('handleModalClose')"
        @handleStart="handleStart"
        @changeModalContent="handleChangeModalContent"
      />
      <div class="play-btn" @click="$emit('handleAutoMatting')">
        <span>＞ AUTO MATTING</span>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from "/src/libs/layout/Header.vue";
  import StartModal from "@/libs/feature-home/components/StartModal.vue";

  export default {
    name: "HomeTemplate",
    components: {
      Header,
      StartModal,
    },
    props: ["isStartModalOpen", "roomId"],
    methods: {
      handleChangeModalContent: function (gameMode) {
        this.$emit("handleChangeModalContent", gameMode);
      },
      handleStart: function (roomId) {
        this.$emit("handleStart", roomId);
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
    margin: 2rem;
    padding-top: 10rem;
    text-align: center;

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
        border-bottom: solid 2px linear-gradient(#0e3145, #186883);
        @keyframes neon {
          0% {
            text-shadow: 0 0 10px #00fff2, 0 0 5px #fff, 0 0 13px #d3fffd;
          }
          100% {
            text-shadow: 0 0 30px #00fff2, 0 0 15px #fff, 0 0 0px #d3fffd;
          }
        }
        animation: neon 2s infinite alternate;
        hr {
          width: 50%;
          color: #ffffff;
        }
      }
      .line {
        margin: 1rem;
        height: 2px;
        background-image: linear-gradient(
          to left,
          transparent,
          #d3fffd,
          transparent
        );
      }
    }
    .play-btn {
      margin: 5rem;
      width: fit-content;
      padding: 1rem 3rem;
      position: relative;
      border: 4px solid #d3fffd;
      background-color: transparent;
      box-shadow: 0px 0px 20px #d3fffd;
      cursor: pointer;

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

    .tempolary-btn {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 959px) {
    /* 959px以下に適用されるCSS（タブレット用） */
  }
  @media screen and (max-width: 480px) {
    /* 480px以下に適用されるCSS（スマホ用） */
  }
</style>
