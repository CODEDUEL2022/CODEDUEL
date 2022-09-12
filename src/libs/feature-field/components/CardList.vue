<template>
  <div class="item">
    <v-card class="black" color="grey lighten-4">
      <v-img 
      :src="require(`../../ui/assets/new-cards/${focusedCard.img}`)"
      @click="$emit('handleCardDetailModalOpen')">
      </v-img>
    </v-card>
    <CardDetail
      v-if="isCardDetailOpen"
      :focusedCard="focusedCard"
      :key="focusedCard.index"
      :isCardDetailOpen = "isCardDetailOpen"
      @handleCardDetailModalClose="$emit('handleCardDetailModalClose')"
    />
  </div>
</template>

<script>
import CardDetail from "./CardDetail.vue"
  export default {
    name: "SimpleCard",
    components:{
    CardDetail,
},
    props: [
      "focusedCard",
      "isCardDetailOpen",
    ],
    data:{
      hoverFlag: false,
    },
    methods: {
      mouseOverAction(){
        console.log("hover")
        console.log(key)
        this.hoverFlag = true
      },
      mouseLeaveAction(){
        this.hoverFlag = false
      },
      imageClick(){
        console.log("click")
      }
    }
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
    opacity: .5;
    position: absolute;
    width: 100%;
    overflow-y: scroll; 
}
</style>
