<template>
  <div class="mx-auto container flex items-center" id="nav">
    <div class="w-full pt-2 p-4">
      <div class="mx-auto md:p-6 md:w-1/2">
        <div class="flex flex-wrap justify-center">
          <h1
            class="text-3xl font-bold text-purple-600 transition duration-500 p-4"
          >
            <i class="fas fa-sign-in-alt fa-fw fa-lg"></i>
            Login
          </h1>
        </div>

        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form @submit.prevent="login">
            <div class="mb-8">
              <label
                for="username"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                <span class="text-purple-600">&nbsp;*</span>
                username
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                >
                  <svg
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <input
                  id="username"
                  class="block pr-10 shadow appearance-none border-2 border-purple-200 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition duration-500 ease-in-out"
                  placeholder="username"
                  v-model="username"
                />
              </div>
            </div>

            <div class="mb-8">
              <label
                for="password"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                <span class="text-purple-600">&nbsp;*</span>
                Password
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                >
                  <svg
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
                <input
                  name="password"
                  id="password"
                  type="password"
                  v-model="password"
                  placeholder="password"
                  class="block pr-10 shadow appearance-none border-2 border-purple-200 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition duration-500 ease-in-out"
                />
              </div>
            </div>
            <div class="">
              <p class="text-sm py-2 text-red-600" v-show="error">
                {{ msg }}
              </p>
            </div>
            <div class="mb-4 text-center">
              <button
                class="transition duration-500 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      error: false,
      msg: "",
    };
  },
  methods: {
    login() {
      const user = {
        userName: this.username,
        password: this.password,
      };
      this.$store
        .dispatch("login", user)
        .then(() => {
          this.$router.push({name:'dashboard'})
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style></style>
