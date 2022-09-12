<template>
  <div class="overlay" @click.self="$emit('handleModalClose')">
    <div>
      <div class="close-btn">
        <span @click="$emit('handleModalClose')">×</span>
      </div>
      <div class = "modal">
        <v-container>
          <v-row>
              <SimpleCard
              v-for="cardImage in cardImages"
              :focusedCard="cardImage"
              :key="cardImage.index"
              />
          </v-row>
        </v-container>
        <v-pagination
            v-model="page"
            :length="length"
            @input = "pageChange"
          ></v-pagination>
      </div>
      <!--step1: 人かcpuを選択-->
    </div>
  </div>
</template>

<script>
import SimpleCard from "./CardList.vue";

  export default {
    name: "CardListModal",
    props:["focusedCard"],
    components: {
        SimpleCard
    },
    data() {
      return {
        cardList: [],
        cardImages: [],
        hoverFlag: false,
        page: 1,
        length:0,
        pageSize: 12,
      };
    },
    created(){
      this.$axios.get("/getCardDB").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.cardList.push(res.data[i]);
      }
      this.cardImages = this.cardList.slice(this.pageSize*(this.page -1), this.pageSize*(this.page));
      this.length = Math.ceil(this.cardList.length/this.pageSize);
  });
},
    methods: {
      mouseOverAction(){
        this.hoverFlag = true
      },
      mouseLeaveAction(){
        this.hoverFlag = false
      },
      pageChange: function(pageNumber){
        this.cardImages = this.cardList.slice(this.pageSize*(pageNumber -1), this.pageSize*(pageNumber));
      },
    
    },
    mounted(){
      this.cardImages = this.cardList.slice(this.pageSize*(this.page -1), this.pageSize*(this.page));
    }
    

    
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

    .cards {
      display: flex;
      align-items: center;
      .cardParent {
        margin: 0.5rem;
      }
    }

    .modal {
      position: relative;
      width: 1200px;
      height: 600px;
      padding: 1rem;
      border: 9px solid #d3fffd;
      background-color: #0e3145;
      box-shadow: 0px 0px 20px #d3fffd;
      overflow: scroll; 
      
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

      span {
        position: relative;
        z-index: 10;
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

      .close-btn {
        cursor: pointer;
        text-align: right;
        span {
          z-index: 10;
          font-size: 2rem;
          text-shadow: none;
          animation: none;
        }
      }

      .contents {
        display: flex;
        flex-direction: column;
        z-index: 10;

        .select {
          display: flex;
          align-items: center;
          padding: 1rem;

          .select-icon {
            margin: 1rem;
            min-width: 165px;
            span {
              font-size: 1.15rem;
            }
            &:hover {
              cursor: pointer;
              background-color: #186883;
            }
          }
        }

        .input-text {
          margin: 2rem 0;
          cursor: text;

          input {
            padding: 0.5rem;
            border-top: solid 1px #d3fffd;
            border-bottom: solid 2px #d3fffd;
            font-size: 1rem;
            color: #ffffff;
          }
        }

        .start-btn {
          margin-top: 1rem;
          padding: 1rem;
          background-color: #186883;
          font-size: 1.5rem;

          &:hover {
            background-color: #2d909e;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>