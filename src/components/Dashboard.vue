<template>
  <div>
    <el-tabs tab-position="left" v-model="activeName" @click="checkOutTab()">
      <el-tab-pane label="商户管理" name="seller">
        <div>
          <Seller></Seller>
        </div>
      </el-tab-pane>
      <el-tab-pane label="品类管理" name="category">
        <div>
          <Category></Category>
        </div>
      </el-tab-pane>
      <el-tab-pane label="门店管理" name="shaop">
        <div>
          <Shop></Shop>
        </div>
      </el-tab-pane>
      <el-tab-pane label="退出" name="out">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import store from "@/utils/store";
import {ElMessage} from 'element-plus'
import Seller from "@/components/dashboarditem/Seller";
import Category from "@/components/dashboarditem/Category";
import Shop from "@/components/dashboarditem/Shop";

export default {
  name: "DashboardComponent",
  components: {
    Seller,
    Category,
    Shop
  },
  data() {
    return {
      activeName: "seller"
    }
  },
  mounted() {
    if (!store.isAdmin()) {
      ElMessage({message: '未经授权.', type: 'error'})
      this.$router.push('/Login')
    }
  },
  methods:{
    checkOutTab() {
      if (this.activeName === "out") {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>

</style>