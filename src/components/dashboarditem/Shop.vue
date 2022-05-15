<template>
  <div>
    <div>
      <el-button type="primary" @click="addFormDialogVisible = true">添加</el-button>
      <el-dialog v-model="addFormDialogVisible" title="添加门店" width="30%" center>
        <el-form :model="shopForm" label-width="120px">
          <el-form-item label="门店名称">
            <el-input v-model="shopForm.name"/>
          </el-form-item>
          <el-form-item label="人均价格">
            <el-input v-model="shopForm.pricePerMan"/>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="shopForm.address" @blur="analysisAddress()"/>
          </el-form-item>
          <el-form-item label="纬度">
            <el-input v-model="shopForm.latitude"/>
          </el-form-item>
          <el-form-item label="经度">
            <el-input v-model="shopForm.longitude"/>
          </el-form-item>
          <el-form-item label="品类 ID">
            <el-input v-model="shopForm.categoryId"/>
          </el-form-item>
          <el-form-item label="标签(空格分隔)">
            <el-input v-model="shopForm.tags"/>
          </el-form-item>
          <el-form-item label="开始营业时间">
            <el-input v-model="shopForm.startTime"/>
          </el-form-item>
          <el-form-item label="结束营业时间">
            <el-input v-model="shopForm.endTime"/>
          </el-form-item>
          <el-form-item label="卖家 ID">
            <el-input v-model="shopForm.sellerId"/>
          </el-form-item>
          <el-form-item label="门店图标">
            <el-input v-model="shopForm.iconUrl"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addShop()">添加</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <el-table :data="shopList" style="width: 100%">
      <el-table-column prop="id" label="id"/>
      <el-table-column label="图标">
        <template #default="scope">
          <img :src="scope.row.iconUrl" class="shop_icon">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="门店名称"/>
      <el-table-column label="评分">
        <template #default="scope">
          <div>{{ parseFloat(scope.row.remarkScore).toFixed(1) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="pricePerMan" label="人均价格"/>
      <el-table-column prop="category.name" label="品类信息"/>
      <el-table-column prop="tags" label="标签"/>
      <el-table-column prop="startTime" label="开始营业时间"/>
      <el-table-column prop="endTime" label="结束营业时间"/>
      <el-table-column prop="address" label="地址"/>
      <el-table-column prop="seller.name" label="商户名称"/>


    </el-table>
  </div>
</template>

<script>
import {addShop, getShopList} from "@/utils/RequestUtil";
import {ElMessage} from "element-plus";

export default {
  name: "ShopComponent",
  data() {
    return {
      shopList: null,
      shopForm: {
        name: "",
        pricePerMan: null,
        latitude: null,
        longitude: null,
        categoryId: null,
        tags: "",
        startTime: "",
        endTime: "",
        address: "",
        sellerId: null,
        iconUrl: "",
      },
      addFormDialogVisible: false
    }
  },
  mounted() {
    this.initShopList();
  },
  methods: {
    async initShopList() {
      this.shopList = (await getShopList()).data
    },
    async addShop() {
      const resp = await addShop(this.shopForm.name,
          this.shopForm.pricePerMan,
          this.shopForm.latitude,
          this.shopForm.longitude,
          this.shopForm.categoryId,
          this.shopForm.tags,
          this.shopForm.startTime,
          this.shopForm.endTime,
          this.shopForm.address,
          this.shopForm.sellerId,
          this.shopForm.iconUrl
      )
      if (resp.status === "SUCCESS") {
        ElMessage({message: '创建成功.', type: 'success'})
        this.addFormDialogVisible = false
        await this.initShopList()
      } else {
        ElMessage({message: '创建失败.', type: 'error'})
      }
    },
    async analysisAddress() {
    }
  }
}
</script>

<style scoped>
.shop_icon {
  width: 80px;
}
</style>