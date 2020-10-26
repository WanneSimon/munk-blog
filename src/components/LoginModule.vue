<template>
<!--  <div
    v-loading="loading"
    :visible.sync = "viewVisible.show"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  > -->
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >

    <!-- <el-dialog :visible.sync="loginVisible" -->
    <el-dialog :visible.sync="viewVisible.login"
        :title="'登录'"  @beforeClose="beforLoginViewClose">
      <el-form :model="loginView" ref="ruleForm" :rules="rules.loginRules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginView.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginView.password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!-- <el-button @click="closeView()">取 消</el-button> -->
          <el-button type="primary" @click="login()">登 录</el-button>
            <!-- <el-button v-if="$base.login.isLogined" type="primary" @click="addNewQuotation()">修改密码</el-button> -->
        </div>
    </el-dialog>
    <!-- <el-dialog :visible.sync="repwdVisible" -->
    <el-dialog :visible.sync="viewVisible.repwd"
        :title="'修改密码'"  @beforeClose="beforRepwdViewClose">
      <el-form :model="repwdView" ref="ruleForm" :rules="rules.repwdRules">
          <el-form-item label="原密码" prop="password">
            <el-input v-model="repwdView.password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="repwdView.newPassword"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!-- <el-button @click="closeView()">取 消</el-button> -->
          <el-button type="primary" @click="newPassword()">修 改</el-button>
            <!-- <el-button v-if="$base.login.isLogined" type="primary" @click="addNewQuotation()">修改密码</el-button> -->
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import mbapi from '../cfg/mbapi.js'

  export default {
    name: 'LoginModule',
    props: {
      // loginType: { type: String, default: '' }, //登录框
      viewVisible: { type: Object, default() {
        return {
          // show: false, // 总开关
          login: false,
          repwd: false ,
        }
       }}, // 是否显示
    },
    data() {
      return {
        loading: false, // 加载状态
        // 登录输入信息
        loginView: {
          username: '',
          password: '',
        },
        repwdView: {
          password: '',
          newPassword: '',
        },

        rules: {
          // 登录时的验证
          loginRules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
            ],
          },
          repwdRules: {
            password: [
                { required: true, message: '请输入原密码', trigger: 'blur' },
            ],
            newPassword: [
                { required: true, message: '请输入新密码', trigger: 'blur' },
                { min: 6, message: '至少需要6个字符', trigger: 'blur' }
            ],
          }
        },

      }
    },
    computed: {

    },
    created: function(){
      console.log('created')
      console.log(this.viewVisible)
    },
    methods: {
      login: function() {
        if(this.loginView.username && this.loginView.password) {
          const vo = {
            username: this.loginView.username,
            password: this.loginView.password
          }

          this.loading = true
          mbapi.login(vo, (res)=>{
            console.log("登录")
            console.log(res)
            this.$base.data = res.data
            this.loading = false
          }, (res)=>{
            mbapi.error(res.info)
            this.loading = false
          })
        } else {
          mbapi.info("忘记账号哦了吗？仔细想想哦！")
        }
      },

      beforLoginViewClose: function (done) {
        done()
      },
      beforRepwdViewClose: function(done) {
        done()
      },

      // 重置密码
      newPassword: function() {

      },

      // 关闭视图
      closeView: function(){
          console.log("=== login ====")
          console.log(this.$base.login)
          this.$base.login.show = false
          console.log(this.$base.login)
          console.log("=== login ====")
      },

    }
  };
</script>

<style scoped>
  /* .editor>.ql-container{
    height: 20rem;
    overflow-y: hidden;
    min-height: 300px !important;
   } */

   .editor-bottom{
    min-height: 20px;
    border-top: 1px solid #ccc;
    padding-top: 8px;
   }
  .editor-container{
    padding: 10px;
    background-color: #fff;
  }
  /** 隐藏滚动条*/
  .ql-editor::-webkit-scrollbar {
    width: 0 !important; /* 谷歌 safari*/
  }
  .ql-editor{
    -ms-overflow-style: none; /*IE10+*/
    overflow: -moz-scrollbars-none; /* firefox */
   }

</style>
