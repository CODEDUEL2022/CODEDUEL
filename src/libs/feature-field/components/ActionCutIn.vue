<template>
  <div class="overlay" @click="$emit('closeActionCutIn')">
    <div class="cards">
      <div
        class="cardParent"
        v-for="effectImage in effectImages"
        :key="effectImage.index"
      >
        <v-img :src="require(`../../ui/assets/cards/${effectImage}`)"></v-img>
      </div>
    </div>
    <div class="dalayEffect">
      <div class="player-name" v-if="change()">
        <div>{{ yourName }}</div>
        <div>'s action</div>
      </div>
      <div class="player-name" v-else>
        <div>{{ opponentName }}</div>
        <div>'s action</div>
      </div>
      {{ actionType }} {{ actionPoint }} pt
    </div>
  </div>
</template>
<script>
  import SimpleCard from "./SimpleCard.vue";

  export default {
    name: "ActionCutIn",
    props: [
      "effectImages",
      "actionType",
      "actionPoint",
      "yourName",
      "opponentName",
      "attackedPlayerId",
    ],
    components: {
      SimpleCard,
    },
    methods: {
      change() {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get("id") == this.attackedPlayerId) {
          return true;
        }
      },
    },
  };
</script>
<style scoped lang="scss">
  .overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;

    .cards {
      display: flex;
      align-items: center;
      .cardParent {
        margin: 0.5rem;
      }
    }

    .dalayEffect {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 100%;
      height: 30%;
      font-family: "Gill Sans", sans-serif;
      font-weight: 100;
      font-size: 6rem;
      letter-spacing: 1.1rem;
      text-shadow: 0 0 20px #d3fffd;
      background: radial-gradient(#186883, #020508);
      opacity: 0;
      z-index: 3;
      animation: SlideIn 0.4s;
      animation-delay: 0.6s;
      animation-fill-mode: forwards;

      .player-name {
        display: flex;
        text-align: center;
        font-size: 2rem;
        letter-spacing: 0.25rem;
        padding-top: 1.25rem;

        div {
          max-width: 400px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  @keyframes SlideIn {
    0% {
      opacity: 0;
      transform: translate(-700px);
    }
    100% {
      opacity: 0.9;
      transform: translate(0);
    }
  }
</style>
