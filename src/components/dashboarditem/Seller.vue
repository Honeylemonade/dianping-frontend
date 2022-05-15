<template>
  <div>
    <div>
      <el-button type="primary" @click="addFormDialogVisible = true">添加</el-button>
      <el-dialog v-model="addFormDialogVisible" title="添加商户" width="30%" center>
        <el-form :model="sellerForm" label-width="120px">
          <el-form-item label="商户名称">
            <el-input v-model="sellerForm.name"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addSeller()">添加</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <el-table :data="sellerList" style="width: 100%">
      <el-table-column prop="id" label="id"/>
      <el-table-column prop="name" label="商户名"/>
      <el-table-column label="评分">
        <template #default="scope">
          <div>{{ parseFloat(scope.row.remarkScore).toFixed(1) }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="disabledFlag" label="商户状态">
        <template #default="scope">
          <div v-if="scope.row.disabledFlag===1" type="text" size="small">禁用</div>
          <div v-if="scope.row.disabledFlag===0" type="text" size="small">启用</div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button v-if="scope.row.disabledFlag===1" @click="this.sellerUp(scope.row.id)" type="primary" size="small">
            启用
          </el-button>
          <el-button v-if="scope.row.disabledFlag===0" @click="this.sellerDown(scope.row.id)" type="danger"
                     size="small">
            禁用
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {addSeller, getSellerList, sellerUp, sellerDown} from "@/utils/RequestUtil";
import {ElMessage} from "element-plus";

export default {
  name: "SellersComponent",
  data() {
    return {
      sellerList: null,
      pageNum: 1,
      pageSize: 20,
      sellerForm: {
        name: ""
      },
      addFormDialogVisible: false
    }
  },
  mounted() {
    this.initSellerList();
  },
  methods: {
    async initSellerList() {
      this.sellerList = (await getSellerList(this.pageNum, this.pageSize)).data.list;
    },
    async addSeller() {
      const resp = await addSeller(this.sellerForm.name)
      if (resp.status === "SUCCESS") {
        ElMessage({message: '创建成功.', type: 'success'})
        await this.initSellerList()
      } else {
        ElMessage({message: '创建失败.', type: 'error'})
      }
    },
    async sellerUp(id) {
      await sellerUp(id)
      this.initSellerList()

    },
    async sellerDown(id) {
      await sellerDown(id)
      this.initSellerList()
    }

  }
}
</script>

<style scoped>

</style>