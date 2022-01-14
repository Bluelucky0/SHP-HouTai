<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spuList">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spuList.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spuList.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in trademarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="spuList.description"
          type="textarea"
          :rows="4"
          placeholder="SPU描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="uploadImage"
          :file-list="spuImageLists"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          v-model="attrIdAndAttrName"
          :placeholder="`还有${unSelectAttr.length}未选择`"
        >
          <el-option
            :label="item.name"
            :value="`${item.id}:${item.name}`"
            v-for="(item, index) in unSelectAttr"
            :key="item.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" border :data="spuList.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80px">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spuList.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spuList: {
        //三级分类ID
        category3Id: 0,
        //spu名称
        spuName: "",
        //spu描述
        description: "",
        //spu品牌id
        tmId: "",
        //spu图片列表
        spuImageList: [],
        //销售属性值列表
        spuSaleAttrList: [],
      },
      trademarkList: [],
      spuImageLists: [],
      saleAttrList: [],
      attrIdAndAttrName: "",
    };
  },
  methods: {
    //当删除图片时触发
    //flie:是删除的那张图片信息
    //flieList:是删除之后剩余的图片列表信息
    handleRemove(file, fileList) {
      //收集图片信息
      this.spuImageLists = fileList;
      // console.log(file, fileList);
    },
    //图片预览
    handlePictureCardPreview(file) {
      //把当前点击预览的图片信息赋给dialog
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async getSpuList(spu) {
      //获取spu列表
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      if (spuResult.code == 200) {
        this.spuList = spuResult.data;
      }
      //获取spu品牌的列表
      let tradeMarkResult = await this.$API.spu.reqTrademarkList();
      if (tradeMarkResult.code == 200) {
        this.trademarkList = tradeMarkResult.data;
      }
      //获取spu图片的列表
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        // this.spuImageList = spuImageResult.data;
        //整理参数，图片显示要求带有name和URL
        let imageList = spuImageResult.data;
        imageList.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageLists = imageList;
      }
      //获取销售属性的列表
      let saleResult = await this.$API.spu.reqSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    //当新增图片也就是图片上传成功后回调
    //response：上传图片成功服务器返回的成功 , file：新增的那张图片, fileList：新增图片之后所有的图片信息
    uploadImage(response, file, fileList) {
      this.spuImageLists = fileList;
    },
    //添加销售属性
    addSaleAttr() {
      //当添加销售属性时，把收集到的attrIdAndAttrName结构出ID和name
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      //构造一个新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      //push到spuList的销售属性列表中去，将来要带给服务器
      this.spuList.spuSaleAttrList.push(newSaleAttr);
      //清空
      this.attrIdAndAttrName = "";
    },
    showInput(row) {
      //为每一个row添加响应式数据单独控制自己的input和button的切换和和收集属性值
      //$set(为那个元素加，什么属性，属性值)
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    //鼠标失去焦点时触发
    handleInputConfirm(row) {
      // console.log(row);
      //从row中结构出ID和输入值
      const { baseSaleAttrId, inputValue } = row;
      //判断：当输入为空时，如果失去焦点就会弹出信息提示
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }
      //对已有的属性值列表进行遍历，当输入值和已有的值相等时返回为true,有一个相等就返回false
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      // console.log(result);
      //返回为false的代表添加的属性已经存在，所以返回出去
      if (!result) return;
      let newAttr = { baseSaleAttrId, saleAttrValueName: inputValue };
      row.spuSaleAttrValueList.push(newAttr);
      row.inputVisible = false;
    },
    //新增或修改spu信息保存时
    async addOrUpdateSpu() {
      //先整理参数，参数都收集到了spuList中，但是图片信息收集到了spuImageLists，所以要整理一下参数
      this.spuList.spuImageList = this.spuImageLists.map((item) => {
        return {
          //数据库返回的图片信息里面有imgName，imgUrl，而我们直接添加的图片信息里面只有name和URL
          //所以我们需要通过map把我们自己添加的图片信息映射带有imgName，imgUrl
          imgName: item.name,
          //我们自己添加的图片成功后数据库返回的结果response里有数据库里面的图片URL，我们要带上
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spuList);
      if (result.code == 200) {
        this.$message({ type: "success", message: "保存成功" });
        //保存成功后要切换场景为0
        this.$emit("changeScene", {
          scene: 0,
          flag: this.spuList.id ? "修改" : "添加",
        });
      }
      Object.assign(this._data, this.$options.data());
    },
    //当父组件点击添加spu时，需要子组件发请求
    async addSpuData(category3Id) {
      this.spuList.category3Id = category3Id;
      //获取spu品牌的列表
      let tradeMarkResult = await this.$API.spu.reqTrademarkList();
      if (tradeMarkResult.code == 200) {
        this.trademarkList = tradeMarkResult.data;
      }
      //获取销售属性的列表
      let saleResult = await this.$API.spu.reqSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    //取消保存时
    cancle() {
      this.$emit("changeScene", { scene: 0, flag: "" });
      //清除数据
      //Object.assignES6新增的合并对象方法,第二个参数合并到第一个参数
      //this._data:组件身上的响应式数据
      //this.$options.data()：获取配置对象，配置对象的data函数执行时，返回的数据为空的
      Object.assign(this._data, this.$options.data());
    },
  },
  computed: {
    unSelectAttr() {
      let result = this.saleAttrList.filter((item) => {
        return this.spuList.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>