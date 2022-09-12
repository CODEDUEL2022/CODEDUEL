<template>
  <div class="overlay" @click.self="$emit('handleModalClose')">
    <div class="modal">
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <span class="modal-title">CODE DUEL　card list</span>
        </v-col>
        <v-col cols="2">
          <span class="close-btn" @click="$emit('handleModalClose')">×</span>
        </v-col>
      </v-row>
      <v-row
        ><v-col><span>Click and you can show detail.</span></v-col></v-row
      >
      <div class="contents">
        <div class="list">
          <span class="card">
            <SimpleCard
              v-for="cardImage in cardImages"
              :focusedCard="cardImage"
              :key="cardImage.index"
            />
          </span>
        </div>
        <span
          ><v-pagination
            color="#30a4a7"
            dark
            v-model="page"
            :length="length"
            @input="pageChange"
        /></span>
      </div>
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
      };
    },
    created() {
      this.$axios.get("/getCardDB").then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.cardList.push(res.data[i]);
        }
        this.cardImages = this.cardList.slice(
          this.pageSize * (this.page - 1),
          this.pageSize * this.page
        );
        this.length = Math.ceil(this.cardList.length / this.pageSize);
      });
    },
    methods: {
      mouseOverAction() {
        this.hoverFlag = true;
      },
      mouseLeaveAction() {
        this.hoverFlag = false;
      },
      pageChange: function (pageNumber) {
        this.cardImages = this.cardList.slice(
          this.pageSize * (pageNumber - 1),
          this.pageSize * pageNumber
        );
      },
    },
    mounted() {
      this.cardImages = this.cardList.slice(
        this.pageSize * (this.page - 1),
        this.pageSize * this.page
      );
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
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;

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
        z-index: 3;
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
