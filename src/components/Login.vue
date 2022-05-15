<template>
  <div class="main">
    <h1>欢迎登陆</h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="普通用户" name="user">
        <div>
          <el-form :model="userForm" label-width="120px">
            <el-form-item label="手机号">
              <el-input v-model="userForm.telephone"/>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="userForm.password"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="userLogin()">登陆</el-button>
              <el-button @click="registerFormDialogVisible = true">注册</el-button>
            </el-form-item>
          </el-form>
          <el-dialog v-model="registerFormDialogVisible" title="注册表单" width="30%" center>
            <Register></Register>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="管理员" name="admin">
        <div>
          <el-form :model="adminForm" label-width="120px">
            <el-form-item label="账号">
              <el-input v-model="adminForm.userName"/>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="adminForm.password"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="adminLogin()">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Register from "@/components/Register";
import {adminLogin, userLogin} from "@/utils/RequestUtil";
import {ElMessage} from 'element-plus'
import store from "@/utils/store";

export default {
  name: 'HelloWorld',
  components: {
    Register
  },
  data() {
    return {
      activeName: 'user',
      userForm: {
        telephone: "123",
        password: "123"
      },
      adminForm: {
        userName: "root",
        password: "123"
      },
      registerFormDialogVisible: false
    }
  },
  methods: {
    async userLogin() {
      const resp = await userLogin(this.userForm.telephone, this.userForm.password);
      if (resp.status === "SUCCESS") {
        ElMessage({message: '登录成功.', type: 'success'})
        store.setUserRole()
        await this.$router.push('/HomePage')
      } else {
        ElMessage({message: '登录失败.', type: 'error'})
      }
    },
    async adminLogin() {
      const resp = await adminLogin(this.adminForm.userName, this.adminForm.password);
      if (resp.status === "SUCCESS") {
        ElMessage({message: '登录成功.', type: 'success'})
        store.setAdminRole()
        await this.$router.push('/Dashboard')
      } else {
        ElMessage({message: '登录失败.', type: 'error'})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  text-align: center;
  width: 40%;
  margin: auto;
}
</style>
