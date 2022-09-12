<template>
  <div class="overlay" @click.self="$emit('handleCardDetailModalClose')">
    <div class="modal">
      <v-row>
        <v-col cols="4">
          <v-card class="black" color="grey lighten-4">
            <v-img
              :src="require(`../../ui/assets/cards/${focusedCard.img}`)"
            ></v-img>
          </v-card>
        </v-col>
        <v-col cols="8">
          <p>{{ focusedCard.name }}</p>
          <p>{{ focusedCard.shortDescription }}</p>
          <p>Install URL</p>
          <a :href="focusedCard.installUrl" target="_blank">{{
            focusedCard.installUrl
          }}</a>
        </v-col>
      </v-row>
    </div>
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
    },
    methods: {
      onCardDetailModalOpen: function () {
        console.log("onStartModalOpen   ");
        document.documentElement.style.overflow = "hidden";
        this.isCardDetailOpen = true;
      },
      onCardDetailModalClose: function () {
        console.log("onCardListModalClose");
        document.documentElement.style.overflow = "auto";
        this.isCardDetailOpen = false;
      },
    },
    mounted() {},
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
    z-index: 9999;

    .modal {
      position: relative;
      width: 1000px;
      height: 600px;
      margin: auto;
      padding: 1rem;
      font-size: 1.25rem;
      border: 9px solid #d3fffd;
      background-color: #0e3145;
      box-shadow: 0px 0px 20px #d3fffd;
      z-index: 1000;
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
        font-size: 1rem;
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

      .modal-title {
        margin-top: 1rem;
        font-size: 1.75rem;
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
        margin-top: 1rem;
        overflow-y: scroll;

        .list {
          .card {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding-bottom: 2rem;

            &:hover {
              cursor: pointer;
            }

            div {
              width: 12%;
              margin: 1rem 1rem;
            }
          }
        }
      }
    }
  }
</style>
