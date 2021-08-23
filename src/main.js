// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './element-variables.scss'



Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.use(Element)

// 引入 axios
import axios from 'axios'
Vue.prototype.$axios = axios

// 挂载自定义全局变量
import base from './cfg/base.js'
Vue.prototype.$base = base
import mbapi from './cfg/mbapi.js'
Vue.prototype.$mbapi = mbapi

// cookie
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)


// 引入 Vue-quill-editor
import VueQuillEditor from 'vue-quill-editor'
// import VueQuillEditor, { Quill } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入 Quill调整图片大小的组件(报错，解决不了)
// import * as Quill from 'quill'  //引入编辑器
// import ImageResize from 'quill-image-resize-module'
// Quill.register('modules/imageResize', ImageResize)npm
Vue.use(VueQuillEditor)

import Vuex from 'vuex'
import storeData from './cfg/store.js'
Vue.use(Vuex)

const store = new Vuex.Store(storeData)

// import VueHighlight from 'vue-highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'
// Vue.use(VueHighlight)
Vue.directive('highlight',function (el) {
  // 1. 多行代码块
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block)=>{
    // 这个方法会把代码块包裹成单独的一行
    hljs.highlightBlock(block)
  })

  // 2. 行内代码块
  let innerBlocks = el.querySelectorAll('p code')
  innerBlocks.forEach((block)=>{
      block.className += " inner-line-code"
  })
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: store
})
