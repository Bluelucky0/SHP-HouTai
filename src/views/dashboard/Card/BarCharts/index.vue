<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "BarCharts",
  mounted() {
    let myChart = echarts.init(this.$refs.charts);
    myChart.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "bar",
          data: [25, 36, 51, 22, 33, 65, 56, 89, 94, 13, 54, 51],
          color: "pink",
        },
      ],
      //设置整个折线图在容器的位置
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
       tooltip:{}
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>