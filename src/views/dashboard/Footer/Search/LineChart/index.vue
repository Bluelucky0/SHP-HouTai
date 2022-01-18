<template>
  <div>
    <div class="header">
      <span class="header-title">搜索用户数</span>
      <svg
        t="1642259617941"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1222"
        width="20"
        height="20"
      >
        <path
          d="M512 958.016C266.08 958.016 65.984 757.952 65.984 512 65.984 266.08 266.08 65.984 512 65.984c245.952 0 446.016 200.064 446.016 446.016C958.016 757.952 757.952 958.016 512 958.016zM512 129.984C301.344 129.984 129.984 301.344 129.984 512c0 210.624 171.36 382.016 382.016 382.016 210.624 0 382.016-171.36 382.016-382.016C894.016 301.344 722.624 129.984 512 129.984z"
          p-id="1223"
          fill="#929284"
        ></path>
        <path
          d="M512 304m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z"
          p-id="1224"
          fill="#929284"
        ></path>
        <path
          d="M512 768c-17.664 0-32-14.304-32-32l0-288c0-17.664 14.336-32 32-32s32 14.336 32 32l0 288C544 753.696 529.664 768 512 768z"
          p-id="1225"
          fill="#929284"
        ></path>
      </svg>
    </div>
    <div class="content">
      <span class="content-number">254635</span>
      <span class="content-footer"
        >17.1
        <svg
          t="1642261127982"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2406"
          width="12"
          height="12"
        >
          <path
            d="M951.1626 819.412438 72.8374 819.412438 511.999488 204.586538Z"
            p-id="2407"
            fill="#1afa29"
          ></path>
        </svg>
        <svg
          t="1642261216985"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2623"
          width="12"
          height="12"
        >
          <path
            d="M511.999488 819.413462 72.8374 204.586538 951.1626 204.586538Z"
            p-id="2624"
            fill="#d81e06"
          ></path>
        </svg>
      </span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineChart",
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
          type: "line",
          data: [23, 12, 31, 25, 23, 31, 16, 26, 23, 17],
          color: "blue",
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
.header {
  display: flex;
  align-items: center;
}
.header-title {
  font-size: 16px;
  margin-right: 20px;
  color: rgb(139, 139, 139);
}
.content {
  margin: 18px 0;
}
.content-number {
  margin-right: 30px;
}
.content-footer {
  font-size: 12px;
  text-align: center;
}
.charts {
  width: 100%;
  height: 80px;
  margin: 5px 0;
}
</style>