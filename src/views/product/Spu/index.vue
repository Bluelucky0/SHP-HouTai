<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="categoryId"
        :show="!show"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button type="primary" icon="el-icon-plus">添加Spu</el-button>
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="Spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="Spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
              >
              </hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu的所有sku"
              ></hint-button>
              <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
              ></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getSpuList"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->, sizes,total"
          :total="total"
          style="text-align: center"
        >
        </el-pagination>
      </div>
      <SkuForm v-show="scene == 1"></SkuForm>
      <SpuForm v-show="scene == 2"></SpuForm>
    </el-card>
  </div>
</template>

<script>
import SkuForm from "./SkuForm";
import SpuForm from "./SpuForm";
export default {
  name: "Spu",
  compoments: { SkuForm, SpuForm },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      show: true,
      page: 1,
      limit: 3,
      records: [],
      total: 0,
      //三个状态切换 0：spu页面 1：添加或修改sku页面 3：spu页面
      scene: 0,
    };
  },
  methods: {
    categoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //发送请求
        this.getSpuList();
      }
    },
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      // console.log(result);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
  },
};
</script>

<style>
</style>