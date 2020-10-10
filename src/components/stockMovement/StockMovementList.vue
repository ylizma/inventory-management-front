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
              <th class="px-4 py-3">Product</th>
              <th class="px-4 py-3">Quantity</th>
              <th class="px-4 py-3">Movement Type</th>
              <th class="px-4 py-3">description</th>
              <th class="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody
            class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
          >
            <tr
              class="text-gray-700 dark:text-gray-400"
              v-for="(sm, index) in stockMovements"
              :key="index"
            >
              <td class="px-4 py-3">
                {{ sm.product.name }}
              </td>
              <td class="px-4 py-3 text-sm">
                {{ sm.quantity }}
              </td>
              <td class="px-4 py-3 text-xs" :class="(sm.movementType === 'INCOMING')?'text-green-400':'text-red-400'">
                {{sm.movementType}}
              </td>
              <td class="px-4 py-3 text-xs">
                {{sm.description || ''}}
              </td>
              <td class="px-4 py-3 text-sm" v-show="sm.createdAt">
                {{ sm.createdAt.slice(0, 10) }}
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
        <pagination v-if="response" :endPoint="'stockmovements'" :response="response" v-on:loadData="loadData"/>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/shared/SearchForm.vue";
import Pagination from '@/components/shared/Pagination.vue';
export default {
  components: {
    SearchForm,
    Pagination
  },
  data() {
    return {
      stockMovements: [],
      response:'',
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
    loadData(url) {
      this.$http
        .get(url || "/stockmovements/all", this.config)
        .then((res) => {
          this.stockMovements = res.data.content;
          this.response = res.data
        })
        .catch((err) => {
          if (err.response.status == 403) {
            this.$router.push("/login");
          }
        });
    },
    search(key) {
      if (key) {
        this.stockMovements = this.stockMovements.filter((item) => {
          return item.product.name.includes(key);
        });
      } else {
        this.loadData();
      }
    },
    addNewStockMovementToList(wh) {
      this.stockMovements.unshift(wh);
    },
  },
};
</script>

<style></style>
