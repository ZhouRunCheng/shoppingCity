<template>
  <div class="dia">
    <el-dialog title="收货地址"
               :visible.sync="dialogFormVisible"
               :modal="true"
               :title="'用户登录'"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item
            prop="userName"
            label="用户名"
        >
          <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="userPwd"
        >
          <el-input v-model="ruleForm.userPwd" autocomplete="off"  @keyup.enter="submitLogin('ruleForm')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeLogin">取 消</el-button>
        <el-button @click="resetForm('ruleForm')">重 置</el-button>
        <el-button type="primary" @click="submitLogin('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
          return {
            dialogFormVisible: false,
            ruleForm: {
              userName: '',
              userPwd: ''
            },
            formLabelWidth: '50px',
            rules: {
              userName: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
              ],
              userPwd: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 6, max: 20, message: '密码错误', trigger: 'blur' }
              ]
            }
          }
        },
        computed: {
          refreshIsLogin() {
            return this.$store.state.isLogin
          }
        },
        methods: {
          closeLogin() {
            this.dialogFormVisible = false;
            this.$store.commit('mutationsCloseLogin');
          },
          submitLogin(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                let params = {
                  userName: this.ruleForm.userName,
                  userPwd: this.ruleForm.userPwd
                };
                this.$axios.post("/users/login", params).then(res => {
                  if(res.data.status === '0'){
                    this.$store.commit('changeUserName', res.data.result.userName);
                    this.$store.commit('showUserNameInNav');
                    this.$store.commit('mutationsCloseLogin');
                    this.resetFields();
                    this.$message({
                      type: 'success',
                      message: '登录成功！欢迎您！ ' + res.data.result.userName
                    });
                  }else{
                    this.$message({
                      type: 'error',
                      message: '登录失败！请检查账号或者密码！'
                    });
                  }

                });
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetFields() {
            this.ruleForm.userName = "";
            this.ruleForm.userPwd = "";
          }
        },
        watch: {
          refreshIsLogin() {
            if(this.$store.state.isLogin)
              this.dialogFormVisible = true;
            else
              this.dialogFormVisible = false;
          }
        }
    }
</script>

<style scoped>
  .dia >>> .el-dialog__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    /*margin: 0 auto !important;*/
  }

  .dia >>> .el-dialog {
    width: 30%;
  }
</style>
