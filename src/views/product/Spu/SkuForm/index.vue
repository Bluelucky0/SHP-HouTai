<template>
  <div>
    <el-form ref="form" label-width="100px" :data="skuInfo">
      <el-form-item label="SPU名称:"> {{ spu.spuName }} </el-form-item>
      <el-form-item label="SKU名称:">
        <el-input v-model="skuInfo.skuName" placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元):">
        <el-input
          v-model="skuInfo.price"
          placeholder="价格(元)"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克):">
        <el-input v-model="skuInfo.weight" placeholder="重量(千克)"></el-input>
      </el-form-item>
      <el-form-item label="规格描述:">
        <el-input
          type="textarea"
          v-model="skuInfo.skuDesc"
          rows="4"
          placeholder="规格描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性:">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="attr.attrName"
            v-for="(attr, index) in attrInfoList"
            :key="attr.id"
          >
            <el-select v-model="attr.attrIdAndAttrValueId" placeholder="请选择">
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="(attrValue, index) in attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性:">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="saleAttr.saleAttrName"
            v-for="(saleAttr, index) in spuSaleAttrList"
            :key="saleAttr.id"
          >
            <el-select v-model="saleAttr.saleIdAndValueId" placeholder="请选择">
              <el-option
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
                v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表:">
        <el-table
          style="width: 100%"
          border
          :data="spuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" prop="prop" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row, index }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, index }">
              <el-button
                type="primary"
                v-if="row.isDefault == 0"
                @click="changeDefault(row)"
                size="mini"
                >设置默认</el-button
              >
              <el-button v-else size="mini">默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <template slot-scope="{ row, index }">
          <el-button type="primary" @click="addSku">保存</el-button>
          <el-button @click="canale">取消</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Skuform",
  data() {
    return {
      spuImageList: [],
      //销售属性
      spuSaleAttrList: [],
      //平台属性
      attrInfoList: [],
      skuInfo: {
        //第一类，父组件传过来的
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类：双向绑定收集的参数
        skuName: "",
        price: "",
        weight: "",
        skuDesc: "",
        //第三类：自己收集
        //默认图片
        skuDefaultImg: "",
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        skuImageList: [
          // {
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        skuSaleAttrValueList: [
          // {
          //   saleAttrId: 0,
          //   saleAttrValueId: 0,
          // },
        ],
      },
      spu: {},
      imgList: [],
    };
  },
  methods: {
    async getData(category1Id, category2Id, spu) {
      //父组件带过来的参数
      this.spu = spu;
      this.category3Id = spu.category3Id;
      this.spuId = spu.id;
      this.tmId = spu.tmId;
      //获取图片列表的信息
      let result = await this.$API.spu.reqSpuImageList(spu.id);
      if (result.code == 200) {
        // this.spuImageList = result.data;
        let list = result.data;
        //为每一个图片数据添加一个属性isDefault,默认为0，显示设置默认按钮
        list.forEach((item) => {
          item.isDefault = 0;
        });
        this.spuImageList = list;
      }
      //获取销售属性列表
      let result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }
      //平台属性
      let result2 = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    //当勾选框发生变化时触发，默认有一个参数为被勾选的元素，是一个数组
    handleSelectionChange(params) {
      this.imgList = params;
    },
    //当切换设置默认和默认时，需要用排他思想
    changeDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      //排他思想，设置当前的为显示默认
      row.isDefault = 1;
      //设置默认后，收集默认图片
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    //取消保存
    canale() {
      this.$emit("changeScene", 0);
      //清除数据
      Object.assign(this._data, this.$options.data());
    },
    //保存
    async addSku() {
      //整理参数
      const { attrInfoList, skuInfo, spuSaleAttrList, imgList } = this;
      //整理平台属性参数
      skuInfo.skuAttrValueList = attrInfoList.reduce((prve, item) => {
        if (item.attrIdAndAttrValueId) {
          const [attrId, valueId] = item.attrIdAndAttrValueId.split(":");
          prve.push({ attrId, valueId });
        }
        return prve;
      }, []);
      //整理销售属性参数
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prve, item) => {
        if (item.saleIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.saleIdAndValueId.split(":");
          prve.push({ saleAttrId, saleAttrValueId });
        }
        return prve;
      }, []);
      //整理图片的参数
      skuInfo.skuImageList = imgList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      // console.log(skuInfo);
      //发请求
      let result = await this.$API.spu.reqAddSku(skuInfo);
      // console.log(result);
      if (result.code == 200) {
        this.$message({ type: "success", message: "保存成功" });
        this.$emit("changeScene", 0);
      }
    },
  },
};
</script>

<style>
</style>