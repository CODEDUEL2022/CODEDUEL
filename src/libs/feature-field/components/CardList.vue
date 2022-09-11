<template>
  <div class="item">
    <v-hover v-slot="{ hover }">
      <v-card class="black" color="grey lighten-4">
        <v-img :src="require(`../../ui/assets/cards/${focusedCard.img}`)">
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
              style="height: 100%;"
            >
              へ～い
            </div>
          </v-expand-transition>
        </v-img>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
  export default {
    name: "SimpleCard",
    props: ["focusedCard"],
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
</style>
