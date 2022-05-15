<template>
  <div>
    <el-form :model="registerForm">
      <el-form-item label="手机号">
        <el-input v-model="registerForm.telephone"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="registerForm.password"/>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="registerForm.nickName"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="registerForm.gender"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="regist()">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {register} from "@/utils/RequestUtil";
import {ElMessage} from 'element-plus'

export default {
  name: "RegisterComponent",
  data() {
    return {
      registerForm: {
        telephone: "",
        password: "",
        nickName: "",
        gender: null
      }
    }
  },
  methods: {
    async regist() {
      try {
        await register(this.registerForm.telephone,
            this.registerForm.password,
            this.registerForm.nickName,
            this.registerForm.gender
        )
        ElMessage({message: '注册成功.', type: 'success'})
      } catch (e) {
        ElMessage({message: '注册失败.', type: 'error'})
      }
    }
  }
}
</script>

<style scoped>

</style>