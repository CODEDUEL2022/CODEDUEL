<template>
  <div class="item">
    <v-card class="black" color="grey lighten-4">
      <v-img
        :src="require(`../../ui/assets/cards/${focusedCard.img}`)"
        @click="onCardDetailModalOpen"
      >
      </v-img>
    </v-card>
    <CardDetail
      v-if="isCardDetailOpen"
      :focusedCard="focusedCard"
      :key="focusedCard.index"
      :isCardDetailOpen="isCardDetailOpen"
      @handleCardDetailModalClose="onCardDetailModalClose"
      @handleCardDetailModalOpen="onCardDetailModalOpen"
    />
  </div>
</template>

<script>
  import CardDetail from "./CardDetail.vue";
  export default {
    name: "SimpleCard",
    components: {
      CardDetail,
    },
    props: ["focusedCard"],
    data() {
      return {
        hoverFlag: false,
        thisImage: null,
        isCardDetailOpen: false,
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
        document.documentElement.style.overflow = "hidden";
        this.isCardDetailOpen = true;
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
