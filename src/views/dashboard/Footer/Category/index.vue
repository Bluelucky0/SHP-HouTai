<template>
  <el-card>
    <div slot="header" class="hearder">
      <span>销售额类别占比</span>
      <el-radio-group v-model="value" size="small">
        <el-radio-button label="全部渠道"></el-radio-button>
        <el-radio-button label="线上"></el-radio-button>
        <el-radio-button label="门店"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <div class="charts" ref="charts"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      value: "全部渠道",
    };
  },
  mounted() {
    let myChart = echarts.init(this.$refs.charts);
    myChart.setOption({
      title: {
        text: "视频广告",
        subtext: "1048",
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "视频广告" },
            { value: 735, name: "联盟广告" },
            { value: 580, name: "软件营销" },
            { value: 484, name: "搜索引擎" },
            { value: 300, name: "直接访问" },
          ],
        },
      ],
    });
    //绑定事件
    myChart.on("mouseover", (params) => {
      // console.log(params);
      //params可以获取到当前点击的那个数据
      const { name, value } = params.data;
      myChart.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
    });
  },
};
</script>

<style scoped>
.hearder {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>