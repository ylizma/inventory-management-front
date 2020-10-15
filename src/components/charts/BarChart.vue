<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: {
    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
  },
  mounted() {
    this.renderBarChart();
  },
  methods: {
    renderBarChart() {
      console.log(this.chartData);
      const allLabels = this.chartData.map((e)=>e.name);
      const allData = this.chartData.map((d)=>d.count);
      this.renderChart(
        {
          labels: allLabels,
          datasets: [
            {
              label: 'Number of products',
              data: allData,
              backgroundColor: '#f87979',
            }
          ],
        },
        this.options
      );
      // console.log(allData);
    },
  },
};
</script>

<style></style>
