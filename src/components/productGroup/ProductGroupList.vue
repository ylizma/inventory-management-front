<template>
  <div class="">
    <!-- search form component -->
    <search-form v-on:search="search" />

    <div class="w-full overflow-hidden rounded-lg shadow-xs ">
      <div class="w-full overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <thead>
            <tr
              class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
            >
              <th class="px-4 py-3">name</th>
              <th class="px-4 py-3">code</th>
              <th class="px-4 py-3">active</th>
              <th class="px-4 py-3">Date</th>
              <th class="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody
            class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
          >
            <tr
              class="text-gray-700 dark:text-gray-400"
              v-for="(pg, index) in productgroups"
              :key="index"
            >
              <td class="px-4 py-3">
                {{ pg.name }}
              </td>
              <td class="px-4 py-3 text-sm">
                {{ pg.code }}
              </td>
              <td class="px-4 py-3 text-xs">
                <span
                  class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                  v-if="pg.active"
                >
                  YES
                </span>
                <span
                  class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100"
                  v-else
                >
                  NO
                </span>
              </td>
              <td class="px-4 py-3 text-sm">
                {{ pg.createdAt.slice(0, 10) }}
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center space-x-4 text-sm">
                  <update-form :productGroup="pg" />
                  <button
                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                    aria-label="Delete"
                    @click="deleteProductGroup(pg.code)"
                  >
                    <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
      >
        <span class="col-span-2"></span>
        <!-- Pagination -->
        <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul class="inline-flex items-center">
              <li>
                <button
                  class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                  aria-label="Previous"
                >
                  <svg
                    class="w-4 h-4 fill-current"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>

              <li>
                <button
                  class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                  aria-label="Next"
                >
                  <svg
                    class="w-4 h-4 fill-current"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import SearchForm from "@/components/shared/SearchForm.vue";
import UpdateForm from "@/components/productGroup/UpdateForm.vue";
export default {
  components: {
    SearchForm,
    UpdateForm,
  },
  data() {
    return {
      productgroups: [],
      config: {
        headers: {
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
      },
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$http
        .get("/productgroups/all", this.config)
        .then((res) => {
          this.productgroups = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          if (err.response.status == 403) {
            this.$router.push("/login");
          }
        });
    },
    search(key) {
      if (key) {
        this.productgroups = this.productgroups.filter((item) => {
          return item.name.includes(key) || item.code.includes(key);
        });
      } else {
        this.loadData();
      }
    },
    addNewProductGroupToList(pg) {
      this.productgroups.unshift(pg);
    },
    deleteProductGroup(id) {
      this.$http
        .delete("/productgroups/" + id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style></style>
