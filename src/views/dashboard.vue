<template>
  <div id="app">
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Desktop sidebar -->
    <aside
      class="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0"
    >
      <div class="py-4 text-gray-500 dark:text-gray-400">
        <a
          class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          href="#"
        >
          Stock-INO
        </a>
        <ul class="mt-6">
          <li class="relative px-6 pt-8 pb-5">
            <span
              class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
              aria-hidden="true"
            ></span>
            <a
              class="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
              href="index.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span class="ml-4">Tablea de bord</span>
            </a>
          </li>
        </ul>
        <ul>
          <side-bar-link v-for="(link, index) in links" :key="index" :linkObject=link />
        </ul>
      </div>
    </aside>
    <div class="flex flex-col flex-1 w-full">
      <header class="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
        <div
          class="container flex items-center justify-end h-full px-6 mx-auto text-purple-600 dark:text-purple-300"
        >
        <!-- profile Menu component -->
          <profile-menu />

        </div>
      </header>
      <main class="h-full overflow-y-auto">
        <div class="container px-6 mx-auto grid">
          <charts v-if="currentRouteName === 'dashboard'" />
          <router-view />
        </div>
      </main>
    </div>
  </div>
  </div>
</template>

<script>
import ProfileMenu from "@/components/layout/ProfileMenu.vue";
import SideBarLink from "@/components/layout/SideBarLink.vue";
import links from '@/components/layout/SideBarLinks.js';
import Charts from '@/views/Charts.vue';
export default {
  components:{
    ProfileMenu,
    SideBarLink,
    Charts
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
},
  data() {
    return {
      links:links,
    }
  },
}
</script>
<style>

</style>
