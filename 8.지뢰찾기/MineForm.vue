<template>
<div>
  <input type="number" placeholder="세로" :value="row" @change="onChangeRow"/>
  <input type="number" placeholder="가로" :value="cell" @change="onChangeCell"/>
  <input type="number" placeholder="지뢰" :value="mine" @change="onChangeMine"/>
  <Button @click="onClickBtn">시작</Button>
</div>
</template>

<script>
import {START_GAME} from "./store";

export default {
  name: "MineForm",
  data() {
    return {
      row: 10,
      cell: 10,
      mine: 20,
    }
  },
  methods: {
    onChangeRow(e) {
      this.row = e.target.value;
    },
    onChangeCell(e) {
      this.cell = e.target.value;
    },
    onChangeMine(e) {
      this.mine = e.target.value;
    },
    onClickBtn(){
      this.$store.commit(START_GAME,{row: this.row, cell: this.cell, mine: this.mine});
    }
  },
}
</script>

<style scoped>

</style>
