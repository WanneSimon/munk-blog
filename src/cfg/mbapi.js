import base from './base.js'
import axios from 'axios'

const mbapi = {

  // 提示信息
  info: function(msg){
    this.$message({
      type: 'info',
      message: msg
    });
  },

  // 错误信息
  error: function(msg){
    this.$message({
      type: 'error',
      message: msg
    });
  },

  // 封装基础请求，错误回调是根据子自定义的请求码来识别的
  base_post: function(url, data, callback, errorCallBack){
    axios.post( url, data,  
      { header: {'Content-Type':'application/json' }} ,
      )
      .then(function(response){
        let data = response.data
        if(data.code === SUCCESS_CODE){
          callback()
        } else {
          if(errorCallBack){
            errorCallBack()
          } else {
            this.error(data.error)
          }
        }
      })
      .catch(function(error){
        this.error(error)
      })
  },

  // 语录添加
  addCommicsWords: function(data, callback){
    // console.log('mbapi.js base')
    // console.log(base)
    this.base_post(base.api_context + base.comicsWords_add, data, callback)
  },

}

export default mbapi
