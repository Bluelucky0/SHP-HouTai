<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>益禾堂</el-dropdown-item>
            <el-dropdown-item>炸鸡</el-dropdown-item>
            <el-dropdown-item>醉翁之意</el-dropdown-item>
            <el-dropdown-item>武汉鸭脖</el-dropdown-item>
            <el-dropdown-item>王婆大虾</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <LineChart></LineChart>
          </el-col>
          <el-col :span="12">
            <LineChart></LineChart>
          </el-col>
        </el-row>
      </div>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" label="排名" width="80">
        </el-table-column>
        <el-table-column label="搜索关键字" width="180"> </el-table-column>
        <el-table-column label="用户数" sortable> </el-table-column>
        <el-table-column label="周涨幅" sortable> </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import LineChart from "./LineChart";
export default {
  name: "Search",
  components: {
    LineChart,
  },
  data() {
    return {
      tableData: [{}],
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination {
  float: right;
  margin: 10px 0;
}
</style>