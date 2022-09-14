import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedDeck: 1,
    deck1: []
  },
  getters: {
  },
  mutations: {
    deckUpdate: function (state, updatedDeck){
        state.selectedDeck = updatedDeck
    },
    setDeck1: function(state, deck) {
        state.deck1 = deck
    }
  },
  actions: {
    getDeck1: function({commit}){
        return axios.get("/getDec1").then((res) => {
            let aaa = []
            for (let i = 0; i < res.data.length; i++) {
              aaa.push(res.data[i]);
            }
            commit('setDeck1', aaa)
        })
    }
  },
  modules: {
  }
})