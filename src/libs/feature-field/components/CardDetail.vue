<template>
  <div>
    <v-row>
      <v-col cols="10"> </v-col>
      <v-col cols="2">
        <span class="close-btn" @click="$emit('handleModalClose')">×</span>
      </v-col>
    </v-row>
    <v-row>
      <div class="contents">
        <v-row>
          <v-col cols="4">
            <span>
              <v-img
                :src="require(`../../ui/assets/cards/${focusedCard.img}`)"
              />
            </span>
          </v-col>
          <v-col cols="8" class="card-info">
            <span class="name">{{ focusedCard.name }}</span>
            <span class="description">{{ focusedCard.shortDescription }}</span>
            <span>Install URL</span>
            <span>
              <a :href="focusedCard.installUrl" target="_blank">{{
                focusedCard.installUrl
              }}</a>
            </span>
          </v-col>
        </v-row>
      </div>
    </v-row>
  </div>
</template>
<script>
  import SimpleCard from "./CardList.vue";

  export default {
    name: "CardListModal",
    props: ["focusedCard"],
    components: {
      SimpleCard,
    },
    data() {
      return {
        cardList: [],
        cardImages: [],
        hoverFlag: false,
        page: 1,
        length: 0,
        pageSize: 12,
        isCardDetailOpen: false,
      };
    },
    created() {
      console.log("CardDetailが正常に発火されてる");
      console.log(this.focusedCard.name);
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
    width: 100% !important;
    height: 100% !important;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;

    .modal {
      position: relative;
      width: 1000px !important;
      height: 600px !important;
      margin: auto;
      padding: 1rem;
      font-size: 1.25rem;
      border: 9px solid #d3fffd;
      background-color: #0e3145;
      box-shadow: 0px 0px 20px #d3fffd;
      z-index: 2;
      text-align: center;

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

      .col {
        padding-bottom: 0;
      }

      span {
        position: relative;
        font-size: 1.1rem;
        letter-spacing: 0.15em;
        z-index: 1;
      }

      .close-btn {
        cursor: pointer;
        text-align: right;
        font-size: 2rem;
        text-shadow: none;
      }

      .contents {
        display: flex;
        flex-direction: column;
        justify-content: start;
        max-height: 400px;
        margin: 0 2rem;

        .card-info {
          display: flex;
          flex-direction: column;
          text-align: left;

          .name {
            margin: 0.5rem 0 2rem;
            font-size: 1.75rem;
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
          .description {
            margin-bottom: 2rem;
          }
        }
      }
    }
  }
</style>
