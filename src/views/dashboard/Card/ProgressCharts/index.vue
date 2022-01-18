<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  naem: "ProgressCharts",
  mounted() {
    let myChart = echarts.init(this.$refs.charts);
    myChart.setOption({
      xAxis: {
        show: false,
        //X轴方向上进度条的最小和最大值
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        //均分
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          color: "yellowgreen",
          barWidth: 10,
          //进度条显示背景，加背景颜色的前提
          showBackground: true,
          //背景颜色
          backgroundStyle: {
            color: "#eee",
          },
          //设置标签
          label: {
            show: true,
            //标签的样式
            formatter: "|",
            //标签的位置，具右
            position: "right",
          },
        },
      ],
      grid: {
        left: 0,
        top: 0,
        rigth: 0,
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