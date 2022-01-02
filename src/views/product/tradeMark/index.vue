<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 6px 0">
      添加
    </el-button>
    <el-table style="width: 100%" border>
      <el-table-column prop="prop" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="prop" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
      </el-table-column>
    </el-table>
    <!-- 
       @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
     -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="1"
      :page-sizes="[3, 5, 10]"
      :page-size="10"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="99"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
};
</script>

<style>
</style>