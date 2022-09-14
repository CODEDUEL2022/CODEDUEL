<template>
  <div class="overlay" @click.self="$emit('closeDeckModal')">
    <div class="animation">
      <div class="modal">
        <div class="full">
          <p class="text">デッキを選択してください</p>
          <span class="close-btn" @click="$emit('closeDeckModal')">×</span>
        </div>
        <div class="full">
          <div class="container">
            <ul>
            <li>
              <input type="radio" id="f-option" name="selector" value=1 v-model="selectedDeck">
              <label for="f-option">Deck1</label>
              <div class="check"></div>
            </li>
            <li>
              <input type="radio" id="s-option" name="selector" value=2 v-model="selectedDeck">
              <label for="s-option">Deck2</label>
              <div class="check"></div>
            </li>
            <li>
              <input type="radio" id="t-option" name="selector" value=3 v-model="selectedDeck">
              <label for="t-option">Deck3</label>
              <div class="check"></div>
            </li>
            </ul>
          </div>
          <div class="cards">
            <!-- <div v-for="card in deckCardData" :key="card.id" >
              <v-img height="150" width="110" :src="require(`../../ui/assets/cards/${card.img}`)" lazy-src></v-img>
            </div> -->
            <v-img :src="require(`../../ui/assets/decks/${deckImg}`)"></v-img>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["deckImg"],
  computed: {
    selectedDeck: {
      get: function() {
        return this.$store.state.selectedDeck;
      },
      set: function(updatedDeck) {
        this.$store.commit('deckUpdate', updatedDeck);
        this.$emit('getDeckCardsImg');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;

    .animation {
      .modal {
        position: relative;
        width: 1200px;
        min-height: 700px;
        height: fit-content;
        margin: 5rem auto;
        padding: 1rem;
        font-size: 1.25rem;
        border: 9px solid #d3fffd;
        background-color: #0e3145;
        box-shadow: 0px 0px 20px #d3fffd;
        z-index: 10;

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
        }
      }
    }

    .full {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .text {
      z-index: 99;
      font-size: 22px;
      margin-top: 16px;
      margin-left: 16px;
    }

    .close-btn {
      cursor: pointer;
      text-align: right;
      font-size: 2rem;
      text-shadow: none;
      z-index: 1;
    }

    .container{
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 20%;
    margin: 0;
    z-index: 1;
  }
  .container ul{
    border: 1px solid #FFFFFF;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: auto;
    background-color: #062833;
  }
  
  ul li{
    color: #AAAAAA;
    display: block;
    position: relative;
    float: left;
    width: 100%;
    height: 100px;
  }
  
  ul li input[type=radio]{
    position: absolute;
    visibility: hidden;
  }
  
  ul li label{
    display: block;
    position: relative;
    font-weight: 300;
    font-size: 1.35em;
    padding: 25px 25px 25px 80px;
    margin: 10px auto;
    height: 30px;
    z-index: 9;
    cursor: pointer;
    -webkit-transition: all 0.25s linear;
  }
  
  ul li:hover label{
    color: #FFFFFF;
  }
  
  ul li .check{
    display: block;
    position: absolute;
    border: 5px solid #AAAAAA;
    border-radius: 100%;
    height: 25px;
    width: 25px;
    top: 36px;
    left: 20px;
    z-index: 5;
    transition: border .25s linear;
    -webkit-transition: border .25s linear;
  }
  
  ul li:hover .check {
    border: 5px solid #FFFFFF;
  }
  
  ul li .check::before {
    display: block;
    position: absolute;
    content: '';
    border-radius: 100%;
    height: 15px;
    width: 15px;
    margin: auto;
    transition: background 0.2s linear;
    -webkit-transition: background 0.2s linear;
  }
  
  input[type=radio]:checked ~ .check {
    border: 5px solid #00f7ff;
  }
  
  input[type=radio]:checked ~ .check::before{
    background: #00f7ff;
  }
  
  input[type=radio]:checked ~ label{
    color: #00f7ff;
  }

.cards {
  z-index: 1000;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 70%;
}
</style>
