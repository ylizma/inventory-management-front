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
              <th class="px-4 py-3">username</th>
              <th class="px-4 py-3">Role</th>
              <th class="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody
            class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
          >
            <tr
              class="text-gray-700 dark:text-gray-400"
              v-for="(user, index) in users"
              :key="index"
            >
              <td class="px-4 py-3">
                {{ user.username }}
              </td>
              <td class="px-4 py-3 text-sm">
                {{ user.role.name }}
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center space-x-4 text-sm">
                  <update-form :user="user" />
                  <button
                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                    aria-label="Delete"
                    @click="deleteSupplier(supplier.id)"
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
import SearchForm from "@/components/shared/SearchForm.vue";
import UpdateForm from "@/components/users/UpdateForm.vue";
export default {
  components: {
    SearchForm,
    UpdateForm,
  },
  data() {
    return {
      users: [],
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
        .get("/accounts/users", this.config)
        .then((res) => {
          this.users = res.data;
          console.log(res);
        })
        .catch((err) => {
          if (err.response.status == 403) {
            this.$router.push("/login");
          }
        });
    },
    search(key) {
      if (key) {
        this.users = this.users.filter((item) => {
          return item.username.includes(key) || item.role.name.includes(key);
        });
      } else {
        this.loadData();
      }
    },
    addNewUserToList(user) {
      this.users.unshift(user);
    },
  },
  computed: {
    allUsers() {
      return this.users.filter(
        (user) => user.username !== this.$store.getters.user.name
      );
    },
  },
};
</script>

<style></style>
