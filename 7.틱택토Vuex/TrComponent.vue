<template>
  <tr>
    <td-component v-for="(CellData, index) in rowData" :key="index" :cell-index="index" :row-index="rowIndex"></td-component>
  </tr>
</template>

<script>
import TdComponent from "./TdComponent.vue";
export default {
  name: "TrComponent",
  computed: {
    rowData() {
      return this.$store.state.tableData[this.rowIndex];
    },
  },
  components: {TdComponent},
  props: {
    rowIndex: Number,
  },
}
</script>

<style scoped>

</style>
