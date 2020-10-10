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
              <th class="px-4 py-3">quantity</th>
              <th class="px-4 py-3">product group</th>
              <th class="px-4 py-3">warehouse</th>
              <th class="px-4 py-3">supplier</th>
              <th class="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody
            class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
          >
            <tr
              class="text-gray-700 dark:text-gray-400"
              v-for="(p, index) in products"
              :key="index"
            >
              <td class="px-4 py-3">
                {{ p.name }}
              </td>
              <td class="px-4 py-3 text-sm">
                {{ p.code }}
              </td>
              <td class="px-4 py-3 text-sm">
                {{ p.quantity }}
              </td>
              <td class="px-4 py-3 text-sm">
                {{ p.productGroup.name }}
              </td>
              <td class="px-4 py-3 text-sm">
                {{ p.wareHouse.name }}
              </td>
              <td class="px-4 py-3 text-sm">
                {{ p.supplier.name }}
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center space-x-4 text-sm">
                  <!-- update form -->
                  <update-form
                    :product="p"
                  />
                  <button
                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                    aria-label="Delete"
                    @click="deleteProduct(p.code)"
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
        <pagination v-if="response" :endPoint="'products'" :response="response" v-on:loadData="loadData" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/shared/SearchForm.vue";
import UpdateForm from "@/components/product/UpdateForm.vue";
import Pagination from '@/components/shared/Pagination.vue';
export default {
  components: {
    SearchForm,
    UpdateForm,
    Pagination
  },
  data() {
    return {
      products: [],
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
        .get(url || "/products/all", this.config)
        .then((res) => {
          this.products = res.data.content;
          this.response=res.data
        })
        .catch((err) => {
          if (err.response.status == 403) {
            this.$router.push("/login");
          }
        });
    },
    search(key) {
      if (key) {
        this.products = this.products.filter((item) => {
          return (
            item.name.includes(key) ||
            item.code.includes(key) ||
            item.wareHouse.name.includes(key) ||
            item.supplier.name.includes(key) ||
            item.productGroup.name.includes(key)
          );
        });
      } else {
        this.loadData();
      }
    },
    addNewProductToList(p) {
      this.products.unshift(p);
    },
    async deleteProduct(code) {
      this.$http
        .delete("/products/" + code, this.config)
        .then((res) => {
          this.products = this.products.filter((val) => val.code !== code);
          alert(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style></style>
