<template>
  <div>
    <el-button type="primary" @click="initShopList">推荐一下</el-button>
    <div v-bind:key="item.id" v-for="item in shopList">
      <el-card class="box-card" style="margin-top: 10px">
        <div style="display: flex;">
          <img :src=item.iconUrl style="width: 130px;" class="shop_img">
          <div class="shop_content">
            <div style="">{{ item.name }}</div>
            <div style="font-size: 10px;color: rgba(145,145,145,0.99)">{{ item.address }}</div>
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

  </div>
</template>

<script>
import {recommendShop} from "@/utils/RequestUtil";
import store from "@/utils/store";

export default {
  name: "RecommendComponent",
  data() {
    return {
      shopList: []
    }
  },
  mounted() {
    this.initShopList()
  },
  methods: {
    async initShopList() {
      this.shopList = (await recommendShop(store.getUserId())).data
    },
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
</style>