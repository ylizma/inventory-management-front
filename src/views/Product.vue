<template>
  <div class="">
    <!-- add form  -->
    <add-form v-on:addToList="addNewProduct"  />
    <!-- product group list -->
    <product-list ref="productForm" />
  </div>
</template>

<script>
import ProductList from "@/components/product/ProductList.vue";
import AddForm from "../components/product/AddForm.vue";
export default {
  components: {
    ProductList,
    AddForm
  },
  methods: {
    addNewProduct(pgroup){
      this.$refs.productForm.addNewProductToList(pgroup)
    }
  },
};
</script>

<style></style>
