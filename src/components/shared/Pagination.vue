<template>
  <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul class="inline-flex items-center">
              <li>
                <button
                  class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                  aria-label="Previous"
                  :class="pagination.lastPage ? 'disabled' : ''"
                  @click="
                    pagination.currentPage > 0
                      ? loadData(
                          pagination.nextPage + pagination.currentPage - 1
                        )
                      : ''
                  "
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
              <li class="lowercase">
                {{ pagination.currentPage + 1 }} of {{ pagination.totalPages }}
              </li>
              <li>
                <button
                  class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                  aria-label="Next"
                  :class="pagination.lastPage ? 'disabled' : ''"
                  @click="
                    !pagination.lastPage
                      ? loadData(
                          pagination.nextPage + pagination.currentPage + 1
                        )
                      : ''
                  "
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
</template>

<script>
export default {
  props: {
      endPoint:String,
      response:Object
  },
  data() {
    return {
      pagination: {},
    };
  },
  methods: {
    makepagination(response) {
      let pagination = {
        totalPages: response.totalPages,
        currentPage: response.number,
        lastPage: response.last,
        nextPage: "/"+this.endPoint+"/all?page="
      };
      this.pagination = pagination;
    },
    loadData(url){
        console.log(url);
        this.$emit('loadData',url);
    }
  },
  created(){
      this.makepagination(this.response)
      console.log(this.response );
  }
};
</script>

<style></style>
