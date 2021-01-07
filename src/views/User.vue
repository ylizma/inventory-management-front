<template>
  <div class="">
    <add-form v-on:addToList="addNewUserToList" />
    <user-list ref="usersList" />
  </div>
</template>

<script>
// import SupplierList from '../components/supplier/SupplierList.vue'
import addForm from "../components/users/AddForm.vue";
import userList from "../components/users/UserList";

export default {
  components: {
    addForm,
    userList,
  },
  methods: {
    addNewUserToList(user) {
      console.log("================>"+ user);
      this.$refs.usersList.addNewUserToList(user);
    },
  },
};
</script>

<style></style>
