<template>
  <div class="">
      <add-form  v-on:addToList="addNewSupplierToList" />
      <supplier-list ref="supplierList" />
  </div>
</template>

<script>
import SupplierList from '../components/supplier/SupplierList.vue'
import AddForm from "../components/supplier/AddForm.vue";
export default {
components:{
    SupplierList,
    AddForm
},
methods: {
  addNewSupplierToList(wh){
    this.$refs.supplierList.addNewSupplierToList(wh)
  }
},
}
</script>

<style>

</style>