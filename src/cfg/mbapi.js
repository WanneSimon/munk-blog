import base from './base.js'
import axios from 'axios'
import { Message } from 'element-ui';


const mbapi = {
  base: base,

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
              reject()
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
  hasPermission: function( arg ){
    const _context = this
    const url = ''
    const data = {}

    // const response = await base_post_promise(url, data)
    // const res = response.data

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

}

export default mbapi
