<template>
  <div class="row mt-5" >
    <product-movement-chart />
    <product-warehouse-chart />
  </div>
</template>

<script>
import ProductMovementChart from "@/components/charts/ProductMovement.vue";
import ProductWarehouseChart from "@/components/charts/ProductWarehouse.vue";
export default {
  components: {
    ProductMovementChart,
    ProductWarehouseChart,
  },
};
</script>

<style></style>
