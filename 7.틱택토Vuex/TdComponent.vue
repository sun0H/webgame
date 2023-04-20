<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
import { CLICK_CELL, SET_WINNER, REST_GAME, CHANGE_TURN, NO_WINNER } from './store';
import {mapState} from "vuex";

export default {
  name: "TdComponent",
  props: {
    rowIndex : Number,
    cellIndex : Number,
  },
  computed:{
    ...mapState({
      tableData: state => state.tableData,
      turn: state => state.turn,
      cellData(state){
        return state.tableData[this.rowIndex][this.cellIndex];
      },
    })
    // cellData() {
    //   return this.$store.state.tableData[this.rowIndex][this.cellIndex];
    // },
    // tableData() {
    //   return this.$store.state.tableData;
    // },
    // turn() {
    //   return this.$store.state.turn;
    // },
  },
  methods: {
    onClickTd(){
      if (this.cellData) return;

      this.$store.commit(CLICK_CELL, {row:this.rowIndex, cell:this.cellIndex});

      let win = false;
      if (this.tableData[this.rowIndex][0] === this.turn && this.tableData[this.rowIndex][1] === this.turn && this.tableData[this.rowIndex][2] === this.turn){
        win = true;
      }
      if (this.tableData[0][this.cellIndex] === this.turn && this.tableData[1][this.cellIndex] === this.turn && this.tableData[2][this.cellIndex] === this.turn){
        win = true;
      }
      if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn){
        win = true;
      }
      if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn){
        win = true;
      }

      if (win) { // 이긴경우
        this.$store.commit(SET_WINNER,this.turn);
        this.$store.commit(REST_GAME);
      } else {
        let all = true;
        this.tableData.forEach((row) => {
          row.forEach((cell) => {
            if(!cell){
              all = false; // 빈칸이 있으면
            }
          });
        });
        if (all) { // 무승부
          this.$store.commit(NO_WINNER);
          this.$store.commit(REST_GAME);
        } else {
          this.$store.commit(CHANGE_TURN);
        }

      }
    }
  }
}
</script>

<style scoped>

</style>
