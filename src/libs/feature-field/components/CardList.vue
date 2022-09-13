<template>
  <div class="item">
    <v-card class="black" color="grey lighten-4">
      <v-img
        :src="require(`../../ui/assets/cards/${focusedCard.img}`)"
        @click="onCardDetailModalOpen"
      >
      </v-img>
    </v-card>
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
        this.$emit("onCardDetailModalOpen", this.focusedCard);
      },
      onCardDetailModalClose: function () {
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
