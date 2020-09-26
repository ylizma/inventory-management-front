<template>
  <div class="">
      <add-form />
      <ware-house-list />
  </div>
</template>

<script>
import WareHouseList from '../components/warehouse/WareHouseList.vue'
import AddForm from "../components/warehouse/AddForm.vue";
export default {
components:{
    WareHouseList,
    AddForm
}
}
</script>

<style>

</style>