import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex);

export const SET_WINNER ='SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const REST_GAME = 'REST_GAME';
export const NO_WINNER = 'NO_WINNER';
export default new Vuex.Store({
  state: { //data와 비슷
    tableData: [
      ['','',''],
      ['','',''],
      ['','',''],
    ],
    turn: 'O',
    winner: '',
  },
  getters: { //computed와 비슷
  },
  mutations: { //state를 수정할 때 사용 (동기적으로)
    [SET_WINNER](state, winner){
      state.winner = winner;
    },
    [CLICK_CELL](state, {row,cell}){
      Vue.set(state.tableData[row], cell, state.turn);
    },
    [CHANGE_TURN](state) {
      state.turn = state.turn ==='O' ? 'X' : 'O';
    },
    [REST_GAME](state){
      state.turn = 'O';
      state.tableData = [
        ['','',''],
        ['','',''],
        ['','',''],
      ];
    },
    [NO_WINNER](state){
      state.winner = '';
    }
  },
  actions: { //비동기적으로 수정할 때, 또는 여러 mutations를 연달아 실행할 때

  }


});
