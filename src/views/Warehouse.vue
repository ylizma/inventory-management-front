<template>
  <div class="">
      <add-form v-on:addToList="addNewWareHouseToList" />
      <ware-house-list ref="wareHouseList" />
  </div>
</template>

<script>
import WareHouseList from '../components/warehouse/WareHouseList.vue'
import AddForm from "../components/warehouse/AddForm.vue";
export default {
components:{
    WareHouseList,
    AddForm
},
methods: {
  addNewWareHouseToList(wh){
    this.$refs.wareHouseList.addNewWareHouseToList(wh)
  }
},
}
</script>

<style>

</style>