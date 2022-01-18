<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineCharts",
  mounted() {
    var myChart = echarts.init(this.$refs.charts);
    myChart.setOption({
      xAxis: {
        //不显示X轴
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [88, 45, 55, 32, 78, 21, 65, 95],
          //设置拐点的颜色--为透明就是不显示拐点
          itemStyle: {
            opacity: 0,
          },
          //设置线的颜色
          lineStyle: {
            color: "purple",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          //设置拐点位置为平滑
          smooth: true,
        },
      ],
      //设置整个折线图在容器的位置
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
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