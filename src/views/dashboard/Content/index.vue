<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="clearfix">
      <el-tabs v-model="activeName" class="tabs">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="getDay">今日</span>
        <span @click="getWeek">本周</span>
        <span @click="getMonth">本月</span>
        <span @click="getYear">本年</span>
        <!-- 请注意  value-format="yyyy-MM-dd"中yy和dd的大小写！！！-->
        <el-date-picker
          type="daterange"
          range-separator="—"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          class="data"
          v-model="value"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :span="18">
        <div class="charts" ref="charts"></div>
      </el-col>
      <el-col :span="6">
        <h3>门店{{ title }}排名</h3>
        <ul>
          <li>
            <span class="index">1</span>
            <span>肯德基</span>
            <span class="number">8898</span>
          </li>
          <li>
            <span class="index">2</span>
            <span>汉堡包</span>
            <span class="number">7888</span>
          </li>
          <li>
            <span class="index">3</span>
            <span>炸鸡</span>
            <span class="number">6566</span>
          </li>
          <li>
            <span class="lindex">4</span>
            <span>烤鱼</span>
            <span class="number">6500</span>
          </li>
          <li>
            <span class="lindex">5</span>
            <span>火锅</span>
            <span class="number">5616</span>
          </li>
          <li>
            <span class="lindex">6</span>
            <span>烤肉</span>
            <span class="number">4220</span>
          </li>
          <li>
            <span class="lindex">7</span>
            <span>可乐</span>
            <span class="number">3000</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "Content",
  data() {
    return {
      activeName: "sale",
      myCharts: null,
      value: [],
    };
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.charts);
    this.myCharts.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 254, 78, 100, 125, 352],
          clcor: "yellowgreen",
        },
      ],
    });
  },
  //计算标题的切换
  computed: {
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
    ...mapState({
      listData: (state) => state.home.list,
    }),
  },
  //监听标题的变化，因为我们渲染echarts图表是在mounted挂载完成之后渲染
  //而mounted之后渲染一次，所以我们监听当title发生变化时，我们重新设置图表的标题
  //重新调用配置，只有发生改变的才会被替换，不发生变化的使用原来的值
  watch: {
    title() {
      this.myCharts.setOption({
        title: {
          text: this.title + "趋势",
        },
      });
    },
  },
  methods: {
    //设置本日
    getDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.value = [day, day];
      console.log(this.value);
    },
    //设置本周
    getWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.value = [start, end];
    },
    //设置本月
    getMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.value = [start, end];
    },
    //设置本年
    getYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.value = [start, end];
    },
  },
};
</script>

<style scoped>
>>> .el-card__header {
  border-bottom: none;
}
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tabs {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  margin: 0 10px;
  font-size: 14px;
}
.data {
  width: 250px;
  margin: 0 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 8%;
  margin: 10px 0;
}
.index {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  color: white;
  text-align: center;
  margin-right: 10px;
}
.number {
  float: right;
  margin-right: 10px;
}
.lindex {
  float: left;
  width: 20px;
  height: 20px;
  text-align: center;
  margin-right: 10px;
}
</style>