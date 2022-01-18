<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="categoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSPU"
          >添加Spu</el-button
        >
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
                @click="addSku(row)"
              >
              </hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                @click="lookSpu(row)"
                title="查看当前spu的所有sku"
              ></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
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
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeScene="changeScenes"
      ></SkuForm>

      <el-dialog
        :title="`${spu.spuName}的所有sku列表`"
        :visible.sync="dialogTableVisible"
        :before-close="close"
      >
        <el-table
          :data="skuList"
          style="width: 100%"
          border
          v-loading="loading"
        >
          <el-table-column prop="skuName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="width">
          </el-table-column>
          <el-table-column prop="weight" label="重量" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="默认图片" width="width">
            <template slot-scope="{ row, $index }">
              <img
                :src="row.skuDefaultImg"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import SkuForm from "./SkuForm";
import SpuForm from "./SpuForm";
export default {
  name: "Spu",
  components: { SkuForm, SpuForm },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,
      limit: 3,
      records: [],
      total: 0,
      //三个状态切换 0：spu页面 1：添加或修改sku页面 2：spu页面
      scene: 0,
      dialogTableVisible: false,
      spu: {},
      skuList: [],
      loading: true,
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
    addSPU() {
      this.scene = 1;
      //获取到子组件发请求
      this.$refs.spu.addSpuData(this.category3Id);
    },
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.getSpuList(row);
    },
    changeScene({ scene, flag }) {
      //scene:场景  flag：判断是添加还是修改
      this.scene = scene;
      //切换场景后，要重新发请求渲染数据
      if (flag == "修改") {
        //修改--保持在当前页  添加---回到第一要务
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    //删除spu
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    //添加sku属性
    addSku(row) {
      this.scene = 2;
      //通知子组件去请求数据
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    changeScenes(scene) {
      this.scene = scene;
    },
    //查看所有的sku列表
    async lookSpu(spu) {
      this.dialogTableVisible = true;
      this.spu = spu;
      //发请求
      let result = await this.$API.spu.reqSkuList(spu.id);
      console.log(result);
      if (result.code == 200) {
        this.skuList = result.data;
        this.loading = false;
      }
    },
    //关闭对话框时打开loading效果并清除上一次的数据
    close(done) {
      this.loading = true;
      this.skuList = [];
      done();
    },
  },
};
</script>

<style>
</style>