<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥ 888555">
            <template slot="charts">
              <span
                >周同比 &nbsp;&nbsp;56.57%&nbsp;<svg
                  t="1642261127982"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2406"
                  width="16"
                  height="16"
                >
                  <path
                    d="M951.1626 819.412438 72.8374 819.412438 511.999488 204.586538Z"
                    p-id="2407"
                    fill="#1afa29"
                  ></path></svg
              ></span>
              <span
                >日同比&nbsp;&nbsp;19.16%&nbsp;<svg
                  t="1642261216985"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2623"
                  width="16"
                  height="16"
                >
                  <path
                    d="M511.999488 819.413462 72.8374 204.586538 951.1626 204.586538Z"
                    p-id="2624"
                    fill="#d81e06"
                  ></path></svg
              ></span>
            </template>
            <template slot="footer"> 日销售额&nbsp;&nbsp;￥12345 </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="55890">
            <template slot="charts">
              <LineCharts></LineCharts>
            </template>
            <template slot="footer"> 日访问量&nbsp;&nbsp;4562 </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="888987">
            <template slot="charts">
              <BarCharts></BarCharts>
            </template>
            <template slot="footer"> 转化率&nbsp;&nbsp;56.69% </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <ProgressCharts />
            </template>
            <template slot="footer">
              <span
                >周同比 &nbsp;&nbsp;56.57%&nbsp;<svg
                  t="1642261127982"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2406"
                  width="16"
                  height="16"
                >
                  <path
                    d="M951.1626 819.412438 72.8374 819.412438 511.999488 204.586538Z"
                    p-id="2407"
                    fill="#1afa29"
                  ></path></svg
              ></span>
              <span
                >日同比&nbsp;&nbsp;19.16%&nbsp;<svg
                  t="1642261216985"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2623"
                  width="16"
                  height="16"
                >
                  <path
                    d="M511.999488 819.413462 72.8374 204.586538 951.1626 204.586538Z"
                    p-id="2624"
                    fill="#d81e06"
                  ></path></svg
              ></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import LineCharts from "./LineCharts";
import BarCharts from "./BarCharts";
import ProgressCharts from "./ProgressCharts";
export default {
  name: "Card",
  components: { Detail, LineCharts, BarCharts, ProgressCharts },
};
</script>

<style>
</style>