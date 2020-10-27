import base from './base.js'
import axios from 'axios'
import { Message } from 'element-ui';


const mbapi = {
  base: base,

  // 获取滚动条当前的位置 (已弃用)
  getScrollTop: function () {
      var scrollTop = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
      } else if (document.body) {
        scrollTop = document.body.scrollTop
      }
      return scrollTop
    },
  // 获取当前可视范围的高度 (已弃用)
  getClientHeight: function () {
      var clientHeight = 0
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
      } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
      }
      return clientHeight
    },

  // 获取文档完整的高度 (已弃用)
  getScrollHeight: function () {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    },
  // 滚动事件触发下拉加载 (已弃用)
  isLasyLoad: function (resolve) {
      // console.log(this.getScrollHeight())
      // console.log(this.getClientHeight())
      // console.log(this.getScrollTop())
      return (this.getScrollHeight() - this.getClientHeight() - this.getScrollTop() <= 0)
    },

  // 提示信息
  info: function(msg){
    Message({
      type: 'info',
      message: msg
    });
  },

  // 错误信息
  error: function(msg){
    Message({
      type: 'error',
      message: msg
    });
  },

  // 封装基础请求，错误回调是根据子自定义的请求码来识别的
  base_post: function(url, data, callback, errorCallBack){
    const _context = this
    axios.post( url, data,
      { header: {'Content-Type':'application/json' }} ,
      )
      .then(function(response){
        let data = response.data

        // _context.info("mbapi: \n" + JSON.stringify(data))
        // console.log("mbapi: \n" + JSON.stringify(data))

        if(data.code === _context.base.SUCCESS){
          if(callback){
            callback(data)
          } else {
            _context.info(data.info)
          }
        } else {
          if(errorCallBack){
            errorCallBack()
          } else {
            _context.error(data.info)
          }
        }
      })
      .catch(function(error){
        _context.error(error)
      })
  },

  // 封装基础请求，错误回调是根据子自定义的请求码来识别的
  base_post_promise: function(url, data){
    const _context = this
    return new Promise((resolve, reject) => {
      axios.post( url, data, { header: {'Content-Type':'application/json' }} , )
        .then(function(response){
          let data = response.data

          // _context.info("mbapi: \n" + JSON.stringify(data))
          // console.log("mbapi: \n" + JSON.stringify(data))

          if(data.code === _context.base.SUCCESS){
            resolve(data)
          } else {
            if(reject){
              reject(data)
            } else {
              _context.error(data.info)
            }
          }
        })
        .catch(function(error){
          _context.error(error)
        })
    })
  },

  // 检查是否有某个权限
  hasPermission: function(){
    const args = arguments
    if( (!args && args!=0) || !base.login.isLogined ){
      return false
    }

    const authArr = base.login.data.auth
    console.log("mbapi-permission")
    console.log(base.login)
    for( var i in args) {
      if ( authArr.indexOf(args[i]) == -1 ){
        return false
      }
    }
    // 'blog_add', 'blog_update'
    // 'book_add', 'book_update'
    // 'game_add', 'game_update'
    // 'dailyLog_add', 'dailyLog_update'
    // 'CW_add', 'CW_update'


    // return false
    return true
  },

  // 语录
  addComicsWords: function(data, callback){
    // console.log('mbapi.js base')
    // console.log(base)
    // this.base_post(base.api_context + base.comicsWords_add, data, callback)
    this.base_post_promise(base.api_context + base.comicsWords_add, data)
      .then( callback )
  },
  searchComicsWords: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.comicsWords_search, data, callback, errorCallBack)
  },
  getComicsWords: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.comicsWords_get, data, callback, errorCallBack)
  },
  updateComicsWords: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.comicsWords_update, data, callback, errorCallBack)
  },

  // 日志
  addDailyLog: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.dailyLog_add, data, callback, errorCallBack)
  },
  searchDailyLog: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.dailyLog_search, data, callback, errorCallBack)
  },
  getDailyLog: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.dailyLog_get, data, callback, errorCallBack)
  },
  updateDailyLog: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.dailyLog_update, data, callback, errorCallBack)
  },

  // 书
  addBook: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.book_add, data, callback, errorCallBack)
  },
  searchBook: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.book_search, data, callback, errorCallBack)
  },
  getBook: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.book_get, data, callback, errorCallBack)
  },
  updateBook: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.book_update, data, callback, errorCallBack)
  },

  // 游戏
  addGame: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.game_add, data, callback, errorCallBack)
  },
  searchGame: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.game_search, data, callback, errorCallBack)
  },
  getGame: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.game_get, data, callback, errorCallBack)
  },
  updateGame: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.game_update, data, callback, errorCallBack)
  },

  // 博文
  addBlog: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.blog_add, data, callback, errorCallBack)
  },
  searchBlogs: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.blog_search, data, callback, errorCallBack)
  },
  getBlog: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.blog_get, data, callback, errorCallBack)
  },
  updateBlog: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.blog_update, data, callback, errorCallBack)
  },

  // 登录
  login: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.i_login, data, callback, errorCallBack)
  },
  // 退出
  logout: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.i_logout, data, callback, errorCallBack)
  },
  // 认证授权
  auth: function(data, callback, errorCallBack){
    this.base_post(base.api_context + base.i_auth, data, callback, errorCallBack)
  },

}

export default mbapi
