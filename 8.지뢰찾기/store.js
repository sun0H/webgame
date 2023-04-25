import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0이상이면 다 OPENED
};

const plantMine = (row, cell, mine) => {

  console.log("지뢰심기",row,cell,mine);
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i; // 숫자는 0부터 row*cell-1까지
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i=0; i<row; i++){
    const rowData = [];
    data.push(rowData);
    for (let j=0; j<cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  for (let k = 0; k<shuffle.length; k++){
    const ver = Math.floor(shuffle[k]/cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
}
export default new Vuex.Store({
  state: { //data와 비슷
    tableData: [],
    data: {
      row: 0,
      cell: 0,
      mine: 0,
    },
    timer: 0,
    halted: true, //중단시키기 위하여
    result: '', //게임 결과 멘트
    openedCount: 0, //게임을 끝내기 위하여 (다 열리면 게임 종료)
  },
  getters: { //computed와 비슷
  },
  mutations: { //state를 수정할 때 사용 (동기적으로)
    [START_GAME](state, {row, cell, mine}) {
      state.data = {
        row,
        cell,
        mine
      };
      state.tableData = plantMine(row, cell, mine); //지뢰심는 함수
      state.timer = 0;
      state.halted = false;
      state.openedCount = 0;
      state.result = '';
    },
    [OPEN_CELL](state, {row, cell}) {
      let openedCount = 0;
      const checked = [];

      function checkAround(row,cell){ //주변 8칸 지뢰인지 검색
        const checkRowOrCellIsUndefined = row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
        if(checkRowOrCellIsUndefined) {
          return ;
        }
        if([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION, CODE.QUESTION_MINE].includes(state.tableData[row][cell])){
          return;
        }
        if(checked.includes(row+'/'+cell)){ //이미 확인한 칸이면 재확인하지 않음
          return;
        } else {
          checked.push(row + '/' + cell);
        }
        let around = [];
        if (state.tableData[row-1]){
          around = around.concat([
            state.tableData[row-1][cell-1], state.tableData[row-1][cell], state.tableData[row-1][cell+1]
          ]);
        }
        around = around.concat([
          state.tableData[row][cell-1], state.tableData[row][cell+1]
        ]);
        if (state.tableData[row+1]){
          around = around.concat([
            state.tableData[row+1][cell-1], state.tableData[row+1][cell], state.tableData[row+1][cell+1]
          ]);
        }
        const counted = around.filter(function(v){
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        });
        if(counted.length === 0 && row > -1){ //주변 칸에 지뢰가 하나도 없으면 주변 8개 모두 주변을 탐색
          const near=[];
          if (row-1>-1){
            near.push([row-1,cell-1]);
            near.push([row-1,cell]);
            near.push([row-1,cell+1]);
          }
          near.push([row,cell-1]);
          near.push([row,cell+1]);
          if (row+1<state.tableData.length){
            near.push([row+1,cell-1]);
            near.push([row+1,cell]);
            near.push([row+1,cell+1]);
          }
          near.forEach((n)=>{
            if(state.tableData[n[0],n[1]] !== CODE.OPENED){ //n[0]은 row, n[1]은 cell
              checkAround(n[0],n[1]);
            }
          });
        }
        if(state.tableData[row][cell] === CODE.NORMAL){
          openedCount += 1;
        }
        Vue.set(state.tableData[row], cell, counted.length);
      }
      checkAround(row,cell);
      let halted = false;
      let result = '';
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){ //지뢰 빼고 다 열렸으면 게임 종료
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다.`;
      }
      state.openedCount += openedCount;
      state.halted = halted;
      state.result = result;
    },
    [CLICK_MINE](state, {row, cell}) {
      state.halted = true;
      Vue.set(state.tableData[row],cell, CODE.CLICKED_MINE);
      state.result = `${state.timer}초에 게임이 종료되었습니다.`;
    },
    [FLAG_CELL](state, {row, cell}) {
      if (state.tableData[row][cell] === CODE.MINE){
        Vue.set(state.tableData[row],cell,CODE.FLAG_MINE);
      } else {
        Vue.set(state.tableData[row],cell,CODE.FLAG);
      }
    },
    [QUESTION_CELL](state, {row, cell}) {
      if (state.tableData[row][cell] === CODE.FLAG_MINE){
        Vue.set(state.tableData[row],cell,CODE.QUESTION_MINE);
      } else {
        Vue.set(state.tableData[row],cell,CODE.QUESTION);
      }
    },
    [NORMALIZE_CELL](state, {row, cell}) {
      if (state.tableData[row][cell] === CODE.QUESTION_MINE){
        Vue.set(state.tableData[row],cell,CODE.MINE);
      } else {
        Vue.set(state.tableData[row],cell,CODE.NORMAL);
      }
    },
    [INCREMENT_TIMER](state) {
      state.timer += 1;
    },

  },
  actions: { //비동기적으로 수정할 때, 또는 여러 mutations를 연달아 실행할 때

  }


});
