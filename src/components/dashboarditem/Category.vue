<template>
  <div>
    <div>
      <el-button type="primary" @click="addFormDialogVisible = true">添加</el-button>
      <el-dialog v-model="addFormDialogVisible" title="添加品类" width="30%" center>
        <el-form :model="categoryForm" label-width="120px">
          <el-form-item label="品类名称">
            <el-input v-model="categoryForm.name"/>
          </el-form-item>
          <el-form-item label="品类图标地址">
            <el-input v-model="categoryForm.iconUrl"/>
          </el-form-item>
          <el-form-item label="品类权重">
            <el-input v-model="categoryForm.sort"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addCategory()">添加</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <el-table :data="categoryList" style="width: 100%">
      <el-table-column prop="id" label="id"/>
      <el-table-column prop="name" label="品类名称"/>
      <el-table-column label="图标">
        <template #default="scope">
          <img :src="scope.row.iconUrl" class="category_icon">
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="权重"/>
    </el-table>
  </div>
</template>

<script>
import {addCategory, getCategoryList} from "@/utils/RequestUtil";
import {ElMessage} from "element-plus";

export default {
  name: "CategoryComponent",
  data() {
    return {
      categoryList: null,
      categoryForm: {
        name: "",
        iconUrl: "",
        sort: null
      },
      addFormDialogVisible: false
    }
  },
  mounted() {
    this.initCategoryList();
  },
  methods: {
    async initCategoryList() {
      this.categoryList = (await getCategoryList()).data
    },
    async addCategory() {
      const resp = await addCategory(this.categoryForm.name,
          this.categoryForm.iconUrl,
          this.categoryForm.sort)
      if (resp.status === "SUCCESS") {
        ElMessage({message: '创建成功.', type: 'success'})
        this.addFormDialogVisible = false;
        await this.initCategoryList()
      } else {
        ElMessage({message: '创建失败.', type: 'error'})
      }
    }
  }
}
</script>

<style scoped>
.category_icon {
  width: 40px;
}
</style>