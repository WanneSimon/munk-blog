import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LoginModule from '@/components/LoginModule.vue'
import UploadModule from '@/components/UploadModule.vue'

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
      path: '/index',
      name: 'index',
      components: {
        default: _import('me.vue')
      }
    },
    {
      path: '/tree',
      name: 'tree',
      components: {
        default: _import('tree.vue')
      }
    },
    {
      path: '/me',
      name: 'me',
      components: {
        default: _import('me.vue')
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
	  path: '/blog/:id',
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
      path: '/eb/:id',
      name: 'eb',
      components: {
        default: _import('editor/blogEditor.vue')
      }
    },
    {
      path: '/eb',
      name: 'eb_new',
      components: {
        default: _import('editor/blogEditor.vue')
      }
    },
    {
      path: '/md/:id',
      name: 'md_update',
      components: {
        // default: _import('editor/MdStackEditor.vue')
        default: _import('editor/MdShowDownEditor.vue')
      }
    },
    {
      path: '/md',
      name: 'md_new',
      components: {
        // default: _import('editor/MdStackEditor.vue')
        default: _import('editor/MdShowDownEditor.vue')
      }
    },
    {
      path: '/favi/:type',
      name: 'favorite',
      components: {
        // default: _import('editor/MdStackEditor.vue')
        default: _import('collection/collects.vue')
      }
    },
    // {
    //   path: '/music',
    //   name: 'music',
    //   components: {
    //     default: _import('music.vue')
    //   }
    // },
    {
      path: '/bookmark',
      name: 'bookmark',
      components: {
        default: _import('bookmark.vue')
      }
    },
    {
      path: '/music',
      name: 'music',
      components: {
        default: _import('music/music.vue')
      }
    },
    {
      path: '/live',
      name: 'live_',
      components: {
        default: _import('live/live.vue')
      }
    },
    {
      path: '/live/:url',
      name: 'live',
      components: {
        default: _import('live/live.vue')
      }
    },
    // 测试时使用
    // {
    //   path: '/login',
    //   name: 'login',
    //   components: {
    //     default: LoginModule
    //   }
    // },
    // {
    //   path: '/upload',
    //   name: 'upload',
    //   components: {
    //     default: UploadModule
    //   }
    // },
    {
      path: '/CV',
      name: 'CV',
      components: {
        default: _import('curriculumVitae.vue')
      }
    },
    {
      path: "/404",
      name: "notFound",
      component: _import('me.vue')
    },
    {
      path: "*", // 此处需特别注意置于最底部
      redirect: "/404",
    }

  ]
})
