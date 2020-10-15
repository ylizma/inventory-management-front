<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  props: {
    label: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
    chartColors: {
      type: Array,
    },
  },
  mounted() {
    this.renderLineChart();
  },
  computed: {
    data: function() {
      return this.chartData;
    },
  },
  watch: {
    chartData: function() {
      this.$data._chart.destroy();
      this.renderLineChart();
    },
  },
  methods: {
    renderLineChart() {
      console.log(this.chartData);
      const incomingDates = this.data[0].map((d) => d.date);
      const incomingtotals = this.data[0].map((d) => d.total);
      const outcomingtotals = this.data[1].map((d) => d.total);
      this.renderChart(
        {
          labels: incomingDates,
          datasets: [
            {
              label: this.label[0],
              data: incomingtotals,
              borderColor: this.chartColors[0].borderColor,
              pointBorderColor: this.chartColors[0].pointBorderColor,
              pointBackgroundColor: this.chartColors[0].pointBackgroundColor,
            },
            {
              label: this.label[1],
              data: outcomingtotals,
              borderColor: this.chartColors[1].borderColor,
              pointBorderColor: this.chartColors[1].pointBorderColor,
              pointBackgroundColor: this.chartColors[1].pointBackgroundColor,
            },
          ],
        },
        this.options
      );
    },
  },
};
</script>
