<template>
<div>
  <div>{{turn}}님의 턴입니다.</div>
  <table-component></table-component>
  <div v-if="winner">{{winner}}님의 승리.</div>
</div>
</template>

<script>
  import {mapState} from 'vuex';
  import store from './store';
  import TableComponent from "./TableComponent.vue";
  export default {
    store,
    components: {TableComponent},
    data(){
      return {
      };
    },
    computed:{
      ...mapState(['winner','turn']),
      // turn(){
      //   return this.$store.state.turn;
      // },
      // winner(){
      //   return this.$store.state.winner;
      // },
    }
  };
</script>

<style>
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }


</style>
