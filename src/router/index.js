import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 加载vue视图模板
// const _import = require('./_import_' + process.env.NODE_ENV)
const _import = require('./_import_development')

Vue.use(Router)

// const routes=[
//   {path:'*', redirect:'/index'}
// ];

// // 页面全部导入,懒加载
// importPages(require.context('../view',true,/\.vue$/,'lazy'))
// function importPages(r){
//   r.keys().forEach(key=>{
//   routes.push({path:(key.split('.'))[1],component:()=>r(key)})});
// }

// 获取路由的根路径
// 组件中使用 console.log(this.$router.options.base)

import LoginModule from '@/components/LoginModule.vue'

export default new Router({
  mode: 'history',
  base: "/coco",
  routes: [
    {
      path: '/',
      redirect: '/index',
      // name: 'HelloWorld',
      // component: HelloWorld
    },
    {
      path: '/tree',
      name: 'tree',
      components: {
        default: _import('tree.vue')
      }
    },
    {
      path: '/index',
      name: 'index',
      components: {
        default: _import('index.vue')
      }
    },
    {
      path: '/comicWords',
      name: 'comicWords',
      components: {
        default: _import('comicWords.vue')
      }
    },
    {
      path: '/dailyLog',
      name: 'dailyLog',
      components: {
        default: _import('dailyLog.vue')
      }
    },
    {
      path: '/blog',
      name: 'blog',
      components: {
        default: _import('blog.vue')
      }
    },
    {
      path: '/books',
      name: 'books',
      components: {
        default: _import('books.vue')
      }
    },
    {
      path: '/games',
      name: 'games',
      components: {
        default: _import('games.vue')
      }
    },
    {
      path: '/anniversary',
      name: 'anniversary',
      components: {
        default: _import('anniversary.vue')
      }
    },
    {
      path: '/eb',
      name: 'eb',
      components: {
        default: _import('blogEditor.vue')
      }
    },
    {
      path: '/eb/:id',
      name: 'eb',
      components: {
        default: _import('blogEditor.vue')
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: LoginModule
      }
    }

  ]
})
