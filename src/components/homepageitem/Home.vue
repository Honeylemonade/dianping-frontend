<template>
  <div>
    <el-tabs tabPosition="left" type="border-card" v-model="activeId" class="demo-tabs" @tab-change="initShopList()">
      <el-tab-pane v-bind:key="item.id" v-for="item in categoryList" :name=item.id>
        <template #label>
          <img :src=item.iconUrl style="width: 17px;">
          <span>{{ item.name }}</span>
        </template>

        <el-input style="display: inline-block; width: 40%" v-model="searchKeyword" placeholder="请输入搜索关键字"/>
        <el-button style="display: inline-block;margin-left: 10px" type="primary" @click="search()">搜索</el-button>
        <div v-bind:key="item.id" v-for="item in shopList">
          <el-card class="box-card" style="margin-top: 10px">
            <div style="display: flex;">
              <img :src=item.iconUrl style="width: 130px;" class="shop_img">
              <div class="shop_content">
                <div style="">{{ item.name }}</div>
                <div style="font-size: 10px;color: rgba(145,145,145,0.99)">{{ item.address }}</div>
                <div style="font-size: 10px;color: rgba(145,145,145,0.99)">
                  距离:{{ parseFloat(item.distance).toFixed(1) }} km
                </div>
                <div style="font-size: 10px;color: rgba(145,145,145,0.99)">人均:￥{{ item.pricePerMan }}/人</div>
                <div style="font-size: 10px">
                  <el-rate :disabled=true v-model="item.remarkScore"/>
                  {{ item.remarkScore }}分
                </div>
                <div>
                  <el-tag type="warning">{{ item.tags }}</el-tag>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {getCategoryList, searchShop} from "@/utils/RequestUtil";
import store from "@/utils/store";

export default {
  name: "HomeComponent",
  data() {
    return {
      searchKeyword: null,
      activeId: 1,
      categoryList: null,
      shopList: null
    }
  },
  mounted() {
    this.initCategoryList();
    this.initShopList();
  },
  methods: {
    async initCategoryList() {
      this.categoryList = (await getCategoryList()).data
    },
    async initShopList() {
      this.shopList = (await searchShop(store.state.latitude, store.state.longitude, undefined, this.activeId)).data
    },
    async search() {
      if (this.searchKeyword === "") {
        this.searchKeyword = null
      }
      this.shopList = (await searchShop(store.state.latitude, store.state.longitude, this.searchKeyword, this.activeId)).data
    }
  }
}
</script>

<style scoped>
.shop_img {
  display: flex;
}

.shop_content {
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
}

.el-tabs__item is-left is-active {
  text-align: left;
}
</style>