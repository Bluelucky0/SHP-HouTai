<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="categoryId" :show='!isShowTable'></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 0 0 10px 0"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0 10px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="editAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 15px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                style="display: block"
                @click="toEdit(row, $index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`您确定要删除${row.valueName}?`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//引入lodash的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowTable: true,
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    categoryId({ categoryId, level }) {
      // console.log(categoryId, level);
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //当3ID有的时候就可以发请求，请求数据了
        this.getAttrList();
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqGetAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        //当添加新的属性值时，是没有ID的，所以ID为undefined就好
        //当编辑里面修改已有的属性值时，是已经存在ID的，所以修改的时候添加新的属性值需要把ID带上
        attrId: this.attrInfo.id,
        valueName: "",
        //为每一个属性值名称加一个flag来单独控制每一个属性值的显示与隐藏
        //如果把flag写在data里面，那flag就为控制所有的属性值名称的了，当属性值名称一多就会同时显示和隐藏
        flag: true,
      });
      //添加属性值名称时也是默认自动获取焦点的
      this.$nextTick(() => {
        //点击添加属性值时，永远最新添加的input框是在最后的，所以让最新添加的input自动获取焦点
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    addAttr() {
      this.isShowTable = false;
      //清空数据
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        //收集三级ID
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    editAttr(row) {
      // console.log(cloneDeep);
      this.isShowTable = false;
      //深拷贝---因为attrInfo中结构较为复杂，数组中套了一个对象，浅拷贝不能实现
      this.attrInfo = cloneDeep(row);
      //当编辑时是没有属性值名称的显示与隐藏的切换的，因为编辑的为服务器返回来的，是没有我们添加的flag属性的
      //在编辑时是通过深拷贝把属性值拷贝的，也没有flag属性，我们要自己添加
      //而直接写item.flag = false这个，可以添加flag，但不是响应式的，也就是视图不会改变
      //响应式添加属性：this.$set（元素，要添加的属性名称，添加的属性值）----》响应式属性，视图会发生变化
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    toLook(row) {
      //判断输入是否为空格
      if (row.valueName.trim() == "") {
        this.$message("请输入合法的属性值名称");
        return;
      }
      //判断输入的属性值名称是否已经存在
      //some对数组进行遍历
      let isRepet = this.attrInfo.attrValueList.some((item) => {
        //遍历的时候是不包括自己的，先排除自己之后然后与其他已经添加的属性值进行对比
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepet) {
        this.$message("输入的属性值名称已经存在");
        return;
      }
      row.flag = false;
    },
    toEdit(row, index) {
      row.flag = true;
      //获取元素，添加自动获取焦点
      //由于input和span是根据V-if来切换的，切换时需要进行页面的重排和重绘，这些是需要时间的
      //所以要获取切换后的input元素，需要借助nextTick事件，等页面渲染完之后获取元素
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    async saveAttr() {
      //由于我们之前添加了一个flag属性，所以当我们添加时，参数要删除我们加的flag属性
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          //当我们添加属性时，当属性值名称不为空时，才把参数带给服务器
          if (item.valueName != "") {
            //删除我们原来添加的flag
            delete item.flag;
            return true;
          }
        }
      );
      try {
        //整理好参数之后发送请求
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        //保存成功弹出信息窗
        this.$message({ type: "success", message: "保存成功" });
        //当我们保存之后需要回到主页面table页面
        this.isShowTable = true;
        //重新请求数据渲染页面
        this.getAttrList();
      } catch (error) {}
    },
  },
};
</script>

<style>
</style>