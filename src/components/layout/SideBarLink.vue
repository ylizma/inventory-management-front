<template>
          <li class="relative px-6 py-4">
            <router-link
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              :to="linkObject.linkTo"
            >
              <v-icon class="w-5 h-5" :name="linkObject.iconName" />
              
              <span class="ml-4">{{linkObject.name}}</span>
              
            </router-link>
          </li>
</template>
<script>
import Icon from 'vue-awesome/components/Icon';
export default {
  props:["linkObject"],
  components:{
    'v-icon':Icon
  },
}
</script>