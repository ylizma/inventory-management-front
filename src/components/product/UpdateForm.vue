<template>
  <div class="">
    <div>
      <button
        class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
        aria-label="Edit"
        @click="isModalOpen = true"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
          ></path>
        </svg>
      </button>
    </div>
    <div
      v-show="isModalOpen"
      class="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    >
      <!-- Modal -->
      <div
        v-if="isModalOpen"
        @keydown.esc="isModalOpen = false"
        class="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
        role="dialog"
        id="modal"
      >
        <!-- Remove header if you don't want a close icon. Use modal body to place modal tile. -->
        <header class="flex justify-end">
          <button
            class="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
            aria-label="close"
            @click="isModalOpen = false"
          >
            <svg
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              role="img"
              aria-hidden="true"
            >
              <path
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </header>
        <!-- Modal body -->
        <!--product group form  -->
        <form @submit.prevent="sendData">
          <div class="mt-4 mb-6">
            <!-- Modal title -->
            <p
              class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300"
            >
              Product Form
            </p>

            <div class="px-4 py-3 mb-8 rounded-lg shadow-sm dark:bg-gray-800">
              <label class="block text-sm pb-3">
                <span class="text-gray-700 dark:text-gray-400">Name</span>
                <!-- focus-within sets the color for the icon when input is focused -->
                <div
                  class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
                >
                  <input
                    class="block w-full  mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Name"
                    v-model="product.name"
                    required
                  />
                </div>
              </label>
              <label class="block text-sm pb-3">
                <span class="text-gray-700 dark:text-gray-400">Code</span>
                <!-- focus-within sets the color for the icon when input is focused -->
                <div
                  class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
                >
                  <input
                    class="block w-full  mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="code"
                    v-model="product.code"
                    required
                  />
                </div>
              </label>
              <label class="block text-sm pb-3">
                <span class="text-gray-700 dark:text-gray-400"
                  >description</span
                >
                <!-- focus-within sets the color for the icon when input is focused -->
                <div
                  class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
                >
                  <input
                    class="block w-full  mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="description"
                    v-model="product.description"
                    type="text"
                    required
                  />
                </div>
              </label>
              <label class="block text-sm pb-3">
                <span class="text-gray-700 dark:text-gray-400">quantity</span>
                <!-- focus-within sets the color for the icon when input is focused -->
                <div
                  class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400"
                >
                  <input
                    class="block w-full  mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="quantity"
                    type="number"
                    v-model="product.quantity"
                    required
                  />
                </div>
              </label>
              <!-- warehouse -->
              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">
                  warehouse
                </span>
                <select
                  class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  v-model="product.wareHouse"
                  v-if="warehouses"
                >
                  <option
                    v-for="(warehouse, index) in warehouses"
                    :key="index"
                    :value="warehouse"
                  >
                    {{ warehouse.name }}
                  </option>
                </select>
              </label>
              <!-- product group -->
              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">
                  product group
                </span>
                <select
                  class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  v-model="product.productGroup"
                  v-if="productGroups"
                >
                  <option
                    v-for="(pg, index) in productGroups"
                    :key="index"
                    :value="pg"
                  >
                    {{ pg.name }}
                  </option>
                </select>
              </label>
              <!-- supplier -->
              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">
                  supplier
                </span>
                <select
                  class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  v-model="product.supplier"
                  v-if="suppliers"
                >
                  <option
                    v-for="(supplier, index) in suppliers"
                    :key="index"
                    :value="supplier"
                  >
                    {{ supplier.name }}
                  </option>
                </select>
              </label>
              <p
                class="text-sm py-2"
                v-show="error || success"
                :class="success ? 'text-green-500' : 'text-red-600'"
              >
                {{ msg }}
              </p>
            </div>
          </div>
          <footer
            class="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800"
          >
            <button
              @click="isModalOpen = false"
              type="button"
              class="w-full px-5 py-3 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Save
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      selectedWarehouse: "",
      selectedSupplier: "",
      selectedProductg: "",
      warehouses: [],
      suppliers: [],
      productGroups: [],
      isModalOpen: false,
      error: false,
      success: false,
      msg: "",
    };
  },
  methods: {
    sendData() {
      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
      };
      this.$http
        .put("/products/" + this.product.code, this.product, config)
        .then((res) => {
          console.log(res);
          this.success = true;
          this.msg = "the product is successfuly updated";
        })
        .catch((err) => {
          if (err.response.status == 400) {
            console.error(err);
            this.msg = "this product already exist !!";
            this.error = true;
          } else if (err.response.status == 403) {
            this.$router.push({ name: "login" });
          }
        });
    },
    getWarehouses() {
      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
      };
      this.$http
        .get("/warehouses/all", config)
        .then((res) => {
          this.warehouses = res.data;
        })
        .catch((err) => console.error(err));
    },
    getSuppliers() {
      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
      };
      this.$http
        .get("/suppliers/all", config)
        .then((res) => {
          this.suppliers = res.data;
        })
        .catch((err) => console.error(err));
    },
    getProductGroups() {
      const config = {
        headers: {
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
      };
      this.$http
        .get("/productgroups/all", config)
        .then((res) => {
          this.productGroups = res.data;
        })
        .catch((err) => console.error(err));
    },
  },
  created() {
    this.getWarehouses();
    this.getSuppliers();
    this.getProductGroups();
  },
};
</script>

<style></style>
