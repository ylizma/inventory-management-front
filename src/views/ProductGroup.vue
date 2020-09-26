<template>
  <div class="">
    <!-- add form  -->
    <add-form v-on:addToList="addNewProductGroup"  />
    <!-- product group list -->
    <product-group-list ref="productGroupForm" />
  </div>
</template>

<script>
import ProductGroupList from "@/components/productGroup/ProductGroupList.vue";
import AddForm from "../components/productGroup/AddForm.vue";
export default {
  components: {
    ProductGroupList,
    AddForm
  },
  methods: {
    addNewProductGroup(pgroup){
      this.$refs.productGroupForm.addNewProductGroupToList(pgroup)
    }
  },
};
</script>

<style></style>
