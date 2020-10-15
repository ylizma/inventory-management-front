<template>
    <div class="col" v-if="allData.length > 0">
      <h2 class="text-center">Stock Movemets</h2>
      <label class="block mt-4 text-sm">
        <span class="text-gray-700 dark:text-gray-400">
          Product
        </span>
        <select
          class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
          v-model="selectedProduct"
          v-if="products"
          @change="getProductChart()"
        >
          <option
            v-for="(product, index) in products"
            :key="index"
            :value="product"
          >
            {{ product.name }}
          </option>
        </select>
      </label>
      <line-chart
        :chartData="allData"
        :options="chartOptions"
        :chartColors="chartColors"
        :label="labels"
      />
    </div>
</template>
<script>
// import moment from "moment";
import LineChart from "./LineChart.vue";
export default {
  components: {
    LineChart,
  },
  data() {
    return {
      config: {
        headers: {
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
      },
      selectedProduct: {},
      products: [],
      allData: [],
      chartColors: [],
      labels: ["INCOMING", "OUTCOMING"],
      incommingMovement: [],
      outcomingMovement: [],
      incomingChartColors: {
        borderColor: "#077187",
        pointBorderColor: "#0E1428",
        pointBackgroundColor: "#AFD6AC",
        backgroundColor: "#74A57F",
      },
      outcomingChartColors: {
        borderColor: "#f55742 ",
        pointBorderColor: "#0E1428",
        pointBackgroundColor: "#f71d00",
        backgroundColor: "#f55742",
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    async getChart(id) {
    let data = {};
      if (id)
        data = await this.$http.get(
          "/stockmovements/chart?id=" + id,
          this.config
        );
      else
        data = await this.$http.get(
          "/stockmovements/chart",
          this.config
        );
        console.log(data.data);
      const filterdIncomingData = data.data.filter(
        (s) => s.movementType === "INCOMING"
      );
      const filterdOutcomingData = data.data.filter(
        (s) => s.movementType === "OUTCOMING"
      );
        this.incommingMovement = [];
      filterdIncomingData.forEach((d) => {
        const count = d.cnt;
        const date = d.date;
        this.incommingMovement.push({ date, total: count });
      });
      this.outcomingMovement = [];
      filterdOutcomingData.forEach((d) => {
        const count = d.cnt;
        const date = d.date;
        this.outcomingMovement.push({ date, total: count });
      });
      this.allData = [];
      this.allData.push(this.incommingMovement);
      this.allData.push(this.outcomingMovement);
      this.chartColors.push(
        this.incomingChartColors,
        this.outcomingChartColors
      );
    },
    async getPorudcts() {
      const { data } = await this.$http.get("/products/all", this.config);
      this.products = data.content;
    },
    getProductChart() {
      this.getChart(this.selectedProduct.id)
    },
  },
  created() {
    this.getChart();
    this.getPorudcts();
  },
};
</script>
<style></style>
