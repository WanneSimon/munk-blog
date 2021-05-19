export default {
  state: {
    login: {
      isLogined: false, // 是否已登录， 默认false
      view: 'login', //展示登录视图的哪一个， login-登录，repwd-重置密码
      show: true, // 展示登录框
      //登录信息
      data: {
          info: {}, // 登录成功信息
          auth: [], // 认证信息
      },
    },

  },

  mutations: {
    logined: function(state, loginedVo){
      // state.login.info = loginedVo.data
      state.login.isLogined = true
    },
    auth: function(state, authVo){
      state.login.isLogined = true
      state.login.data.info = authVo.data.info
      state.login.data.auth = authVo.data.auth
    },
    logout: function(state){
      state.login.isLogined = false
      state.login.data.info = {}
      state.login.data.auth = []
      state.login.show = false
    },


  },

  action: {

  }
}
