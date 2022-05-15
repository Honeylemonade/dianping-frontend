<template>
  <el-tabs v-model="activeName" @click="checkOutTab()">
    <el-tab-pane label="首页" name="home">
      <Home></Home>
    </el-tab-pane>
    <el-tab-pane label="推荐" name="recommend">
      <Recommend></Recommend>
    </el-tab-pane>
    <el-tab-pane label="退出" name="out">
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import Home from "@/components/homepageitem/Home";
import Recommend from "@/components/homepageitem/Recommend";

export default {
  name: 'HomePage',
  components: {
    Home,
    Recommend
  },
  data() {
    return {
      activeName: "home"
    }
  }, methods: {
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