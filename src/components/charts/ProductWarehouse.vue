<template>
    <div class="col" v-if="allData.length > 0" >
      <h2 class="text-center">Number of products per warehouse</h2>
      <bar-chart :chartData="allData" :options="chartOptions" />
    </div>
</template>

<script>
import BarChart from "./BarChart.vue";
export default {
  components: {
    BarChart,
  },
  data() {
    return {
      config: {
        headers: {
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
      },
      allData: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales:{
            xAxes   :[{
                ticks:{
                    minRotation:10,
                    maxRotation:20
                }
            }]
        }
      },
    };
  },
  methods: {
    async getChartData() {
      const { data } = await this.$http.get("/warehouses/chart", this.config);
      data.forEach((el) => {
        this.allData.push({ count: el.pcnt, name: el.whName });
      });
    //   console.log(this.allData);
    },
  },
  created() {
    this.getChartData();
  },
};
</script>

<style></style>
