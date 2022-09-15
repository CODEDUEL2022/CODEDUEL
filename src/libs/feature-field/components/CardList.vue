<template>
  <div class="item">
      <v-img
        :src="require(`../../ui/assets/cards/${focusedCard.img}`)"
        @click="onCardDetailModalOpen"
      >
      </v-img>
  </div>
</template>

<script>
  import CardDetail from "./CardDetail.vue";
  export default {
    name: "CardList",
    components: {
      CardDetail,
    },
    props: ["focusedCard"],
    data() {
      return {
        hoverFlag: false,
        thisImage: null,
        clickSE: new Audio(require("/src/libs/ui/assets/sounds/click.mp3")),
        backSE: new Audio(require("/src/libs/ui/assets/sounds/back.mp3")),
      };
    },
    methods: {
      mouseOverAction() {
        console.log("hover");
        this.hoverFlag = true;
      },
      mouseLeaveAction() {
        this.hoverFlag = false;
      },
      onCardDetailModalOpen: function () {
        this.clickSE.play();
        this.$emit("onCardDetailModalOpen", this.focusedCard);
      },
      onCardDetailModalClose: function () {
        this.backSE.play();
        document.documentElement.style.overflow = "auto";
        this.isCardDetailOpen = false;
      },
    },
    mounted() {
      // this.thisImage = this.focusedCard
    },
  };
</script>

<style scoped>
  .item {
    margin: 0.5rem;
    width: 15%;
    max-height: 222px;
  }
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.5;
    position: absolute;
    width: 100%;
    overflow-y: scroll;
  }

  .skeleton {
    background-color: #c4c4c4;
  }
</style>
