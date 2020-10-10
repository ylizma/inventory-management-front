<template>
<div class="">
    <add-form v-on:addToList="addNewStockm" />
    <stock-movement-list ref="stockList" />
</div>
</template>

<script>
import StockMovementList from "@/components/stockMovement/StockMovementList.vue";
import AddForm from "../components/stockMovement/AddForm.vue";

export default {
  components: {
    StockMovementList,
    AddForm
  },
  methods: {
    addNewStockm(sm){
      this.$refs.stockList.addNewStockMovementToList(sm)
    }
  },
};
</script>

<style></style>
